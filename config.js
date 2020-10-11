// config.js
const config = {
    app:
    {
        users: "myusers",
    },

    db: {
      host: '192.168.0.168',
      port: 1433,
      user: 'sa',
      database: 'test-sean-dw',
      password: 'mypassword',
      driver: 'tedious',
    }
   };
   
   module.exports = config;