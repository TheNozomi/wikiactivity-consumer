export default () => ({
  app: {
    name: 'WikiActivity Consumer',
    description:
      'This service handles activity events from ws-wikiactivity, stores them and routes them to different destinations.',
    port: parseInt(process.env.PORT, 10),
  },
});
