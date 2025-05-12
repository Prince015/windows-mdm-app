/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import ElectronStore from 'electron-store';
import sqlite3 from 'sqlite3';
import * as os from "os";

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
const electronStore = new ElectronStore();
let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug').default();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = electronStore?.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  electronStore?.set(key, val);
});

ipcMain.on('electron-store-delete', async (event, key) => {
  electronStore?.delete(key);
  event.returnValue = true;
});

ipcMain.on('electron-store-clear', async () => {
  electronStore?.clear(); // Clear all keys in the store
});

const desktopPath = path.join(os.homedir(), "Desktop")
const DB_PATH = path.join(desktopPath, "MDM_SERVICE_DATA", 'usage.db');
ipcMain.handle('get-usage-data', async (event, { mode }) => {
  const db = new sqlite3.Database(DB_PATH);
  const now = new Date();

  const getDateKey = (date: Date) =>
    date.toUTCString().split(' ').slice(0, 4).join(' ');

  const getDateRange = (base: Date, daysBack: number = 0) => {
    const date = new Date(base);
    date.setUTCDate(date.getUTCDate() - daysBack);
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth();
    const d = date.getUTCDate();
    return [
      new Date(Date.UTC(y, m, d, 0, 1, 0)),
      new Date(Date.UTC(y, m, d, 23, 59, 59, 999))
    ];
  };

  let startDate: Date, endDate: Date, prevStartDate: Date, prevEndDate: Date;

  if (mode === 'Today') {
    [startDate, endDate] = getDateRange(now);
    [prevStartDate, prevEndDate] = getDateRange(now, 1);
  } else if (mode === 'This Week') {
    const start = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - now.getUTCDay(),
      0, 1, 0
    ));
    const end = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - now.getUTCDay() + 6,
      23, 59, 59, 999
    ));
    startDate = start;
    endDate = end;
    prevStartDate = new Date(start);
    prevStartDate.setUTCDate(start.getUTCDate() - 7);
    prevEndDate = new Date(end);
    prevEndDate.setUTCDate(end.getUTCDate() - 7);
  } else {
    throw new Error('Invalid mode. Use "This Week" or "Today"');
  }

  const fetchUsage = (from: string, to: string): Promise<any[]> =>
    new Promise((resolve, reject) => {
      db.all(
        `SELECT timestamp, app_name, duration FROM app_usage WHERE timestamp BETWEEN ? AND ?`,
        [from, to],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });

  try {
    const [currentRows, previousRows] = await Promise.all([
      fetchUsage(startDate.toISOString(), endDate.toISOString()),
      fetchUsage(prevStartDate.toISOString(), prevEndDate.toISOString())
    ]);

    const dayWiseUsage: Record<string, number> = {};
    const appUsage: Record<string, number> = {};

    currentRows.forEach(({ timestamp, app_name, duration }) => {
      const dateKey = getDateKey(new Date(timestamp));
      dayWiseUsage[dateKey] = (dayWiseUsage[dateKey] || 0) + duration;
      if (mode === 'This Week' || dateKey === getDateKey(now)) {
        appUsage[app_name] = (appUsage[app_name] || 0) + duration;
      }
    });

    const days: string[] = [];
    const data: number[] = [];
    let totalUsage = 0;
    let dayCount = 0;

    for (let d = new Date(startDate); d <= endDate; d.setUTCDate(d.getUTCDate() + 1)) {
      const dateKey = getDateKey(d);
      const usage = dayWiseUsage[dateKey] || 0;
      if (d <= now) {
        totalUsage += usage;
        dayCount++;
      }
      days.push(d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }));
      data.push(usage);
    }

    const dailyAvgUsage = dayCount ? +(totalUsage / dayCount).toFixed(2) : 0;

    const highlight = Object.entries(appUsage)
      .map(([app, duration]) => ({ app, duration }))
      .sort((a, b) => b.duration - a.duration);

    const prevDayWiseUsage: Record<string, number> = {};
    previousRows.forEach(({ timestamp, duration }) => {
      const dateKey = getDateKey(new Date(timestamp));
      prevDayWiseUsage[dateKey] = (prevDayWiseUsage[dateKey] || 0) + duration;
    });

    const prevData: number[] = [];
    for (let d = new Date(prevStartDate); d <= prevEndDate; d.setUTCDate(d.getUTCDate() + 1)) {
      const dateKey = getDateKey(d);
      prevData.push(prevDayWiseUsage[dateKey] || 0);
    }

    const previousDailyAvg = prevData.length
      ? +(prevData.reduce((a, b) => a + b, 0) / prevData.length).toFixed(2)
      : 0;

    return {
      days,
      data,
      highlight,
      dailyAvgUsage,
      previousDailyAvg
    };
  } catch (error: any) {
    throw new Error('Failed to fetch usage data: ' + error.message);
  }
});




app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
