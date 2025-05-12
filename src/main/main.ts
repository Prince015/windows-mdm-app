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

const DB_PATH = path.join('./data/usage.db');

ipcMain.handle('get-usage-data', async (event, { mode }) => {
  const db = new sqlite3.Database(DB_PATH);

  const now = new Date();
  const todayStr = now.toDateString();

  let startDate = new Date(now);
  let endDate = new Date(now);
  let prevStartDate: Date;
  let prevEndDate: Date;

  const isWeek = mode === 'This Week';

  if (isWeek) {
    startDate.setDate(now.getDate() - now.getDay());
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    prevStartDate = new Date(startDate);
    prevStartDate.setDate(startDate.getDate() - 7);
    prevEndDate = new Date(prevStartDate);
    prevEndDate.setDate(prevStartDate.getDate() + 6);
  } else if (mode === 'Today') {
    prevStartDate = new Date(now);
    prevStartDate.setDate(prevStartDate.getDate() - 1);
    prevEndDate = new Date(prevStartDate);
  } else {
    throw new Error('Invalid mode. Use "This Week" or "Today"');
  }

  const currentFrom = startDate.toISOString();
  const currentTo = endDate.toISOString();
  const prevFrom = prevStartDate.toISOString();
  const prevTo = prevEndDate.toISOString();

  function fetchUsage(from: string, to: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT timestamp, app_name, duration FROM app_usage WHERE timestamp BETWEEN ? AND ?`,
        [from, to],
        (err, rows: any[]) => (err ? reject(err) : resolve(rows))
      );
    });
  }

  try {
    const [currentRows, previousRows] = await Promise.all([
      fetchUsage(currentFrom, currentTo),
      fetchUsage(prevFrom, prevTo)
    ]);

    const dayWiseUsage: Record<string, number> = {};
    const todayAppUsage: Record<string, number> = {};

    for (const row of currentRows) {
      const date = new Date(row.timestamp);
      const dateKey = date.toDateString();
      dayWiseUsage[dateKey] = (dayWiseUsage[dateKey] || 0) + row.duration;

      if (mode === 'Today' && dateKey === todayStr) {
        todayAppUsage[row.app_name] = (todayAppUsage[row.app_name] || 0) + row.duration;
      } else if (mode === 'This Week') {
        todayAppUsage[row.app_name] = (todayAppUsage[row.app_name] || 0) + row.duration;
      }
    }

    const days: string[] = [];
    const data: number[] = [];
    let totalUsage = 0;
    let dayCount = 0;

    const loopDate = new Date(startDate);
    while (loopDate <= endDate) {
      const dateKey = loopDate.toDateString();
      const usage = dayWiseUsage[dateKey] || 0;

      if (loopDate <= now) {
        totalUsage += usage;
        dayCount++;
      }

      const dayName = loopDate.toLocaleDateString('en-US', { weekday: 'short' });
      days.push(dayName);
      data.push(usage);

      loopDate.setDate(loopDate.getDate() + 1);
    }

    const dailyAvgUsage = dayCount > 0 ? Number((totalUsage / dayCount).toFixed(2)) : 0;

    const highlight = Object.entries(todayAppUsage)
      .map(([app, duration]) => ({ app, duration }))
      .sort((a, b) => b.duration - a.duration);

    const prevDayWiseUsage: Record<string, number> = {};
    for (const row of previousRows) {
      const date = new Date(row.timestamp);
      const dateKey = date.toDateString();
      prevDayWiseUsage[dateKey] = (prevDayWiseUsage[dateKey] || 0) + row.duration;
    }

    const prevData: number[] = [];
    const loopPrev = new Date(prevStartDate);
    while (loopPrev <= prevEndDate) {
      const dateKey = loopPrev.toDateString();
      prevData.push(prevDayWiseUsage[dateKey] || 0);
      loopPrev.setDate(loopPrev.getDate() + 1);
    }

    const previousDailyAvg =
      prevData.length > 0
        ? Number((prevData.reduce((a, b) => a + b, 0) / prevData.length).toFixed(2))
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
