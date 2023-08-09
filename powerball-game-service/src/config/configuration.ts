export default () => ({
    app_verion: '0.0.1',
    app_port: process.env.APP_PORT || '5997',
    duration: process.env.COUNTDOWN_DURATION || 60,
    timezone: process.env.TIMEZONE || "Asia/Seoul",
  });