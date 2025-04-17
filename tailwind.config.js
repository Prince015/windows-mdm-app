module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        "dashboard-background": 'var(--color-dashboard-background)',
        text: 'var(--color-text)',
        border: 'var(--color-input-border)',
        disabled: 'var(--color-disabled)',
        "usb-card": 'var(--color-usb-card)',
        "video-call-card": 'var(--color-video-call-card)',
        "video-call-card-hover": 'var(--color-video-call-card-hover)',
        "usb-card-hover": 'var(--color-usb-card-hover)',
        "stroke-dark": 'var(--color-stroke-dark)',
        "stroke-light": 'var(--color-stroke-light)',
        "body-text": 'var(--color-body-tex)',
        success: 'var(--color-success)',
        pending: 'var(--color-pending)',
        failure: 'var(--color-failure)',
        "success-light": 'var(--color-success-light)',
        "pending-light": 'var(--color-pending-light)',
        "failure-light": 'var(--color-failure-light)',
      },
      animation: {
        line: 'lineGrow 1s linear infinite alternate',
      },
      backgroundImage: {
        'login-bg': "url('/assets/images/login-bg.png')",
      },
      keyframes: {
        lineGrow: {
          to: {
            backgroundSize: '100% 100%',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
