export default () => ({
  logger: {
    newrelic: process.env.NEW_RELIC_ENABLED === 'false' ? false : true,
  },
});
