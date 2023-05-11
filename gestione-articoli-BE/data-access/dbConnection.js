require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

client.connect();

// ############### LOGIN #################
//    |      |      |       |
//    |      |      |       |
const getUser = (condition) => new Promise((resolve, reject) => {
    client.query(`select * from userlogin where username='${condition}'`, (err, res) => {
        if (err) {
            reject(err);
            throw console.error(' *** ERROR *** :' + JSON.stringify(err));
        } else {
            console.log('GETTING DATA');
            //console.log(' $$$$$$    GETTING $$$$$$ (' + JSON.stringify(res) + ') OF THE DATA :');
            resolve(res.rows[0]);
        }
        client.end;
    })
});
// #####################################################

const saveArticolo = (values) => new Promise((resolve, reject) => {
    client.query(`INSERT INTO articoli (descrizione,quantita,prezzo,categoria,data_inserimento) VALUES($1, $2, $3, $4, $5) RETURNING *`, values, (err, res) => {
        if (err) {

            reject(err);
            throw console.error('ERROR :' + JSON.stringify(err));
            // console.error('ERROR :');
            // throw err;
        } else {

            console.log('SAVING THE DATA : ');
            resolve(res.rows[0]);
        }
        client.end;
    })
});

const getArticoli = () => new Promise((resolve, reject) => {
    client.query(`SELECT * FROM articoli`, (err, res) => {
        if (err) {

            reject(err);
            throw console.error('ERROR :' + JSON.stringify(err));
        } else {

            //console.log('RETRIEVING THE DATA :' + JSON.stringify(res));
            console.log('RETRIEVING DATA');
            resolve(res.rows);
        }
        client.end;
    })
});

module.exports = {
    getUser,
    saveArticolo,
    getArticoli
}