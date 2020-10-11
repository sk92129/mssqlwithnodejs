var mssql = require("mssql");
var csv = require("csvtojson");

const dbconfig = {
    user: config.db.user,
    password: config.db.password,
    server: config.db.host,
    database: config.db.database,
    port: config.db.port,
    debug: true,
    driver: config.db.driver,
};

mssql.connect(dbconfig, err => {
    if (err) 
        console.log(err);
    
    const table = new mssql.Table('myusers');
    table.create = false;

    // Invoking csv returns a promise
    const converter=csv()
        .fromFile('./Data.csv')
        .then((json)=>{
            json.forEach((row)=>{
                console.log(row.firstname);
                table.rows.add(row.firstname, row.lastname);
                    
                
            });
            

    
        });
    const request = new mssql.Request();
    request.bulk(table, (err, result) => {
        if (err){
            console.log(err);
        }
        console.log(result);
    });


});