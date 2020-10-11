var mssql = require("mssql");
var csv = require("csvtojson");
const config = require('./config');

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
    
    const trns = new mssql.Transaction();
    trns.begin(err => {

        // Invoking csv returns a promise
        const converter=csv()
            .fromFile('./Data.csv')
            .then((json)=>{
                json.forEach((row)=>{
                    console.log(row.firstname);
                    const insertstmt = new mssql.Request(trns);

                    insertstmt.query("insert into myusers (firstname, lastname) values ('"+ row.firstname+ "', '" + row.lastname + "' ) ", (err, result) => {
        
        
                        trns.commit(err => {
                            // ... error checks
                 
                            console.log("Transaction committed.")
                        })
                    });
                        
                    
                });

        
            });
    
    });


});