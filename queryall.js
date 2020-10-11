var mssql = require("mssql");
var csv = require("csvtojson");


const config = {
    user: config.db.user,
    password: config.db.password,
    server: config.db.host,
    database: config.db.database,
    port: config.db.port,
    debug: true,
    driver: config.db.driver,
};

mssql.connect(config, err => {
    if (err) 
        console.log(err);
    
    const request = new mssql.Request();
    request.stream = true;
    request.query('select * from  myusers');

    request.on('recordset', columns => {
        console.log(columns);
    });

    request.on('row', row => {
        console.log(row);
    });

    request.on('error', err  => {
        console.log(err);
    });

    request.on('done', result => {
        console.log(result);
    });
});
