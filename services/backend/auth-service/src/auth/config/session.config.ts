export default () => ({
    session: {
      secret: process.env.SESSION_SECRET,
      maxAge: parseInt(process.env.SESSION_MAX_AGE || '3600000', 10),
    },
  });