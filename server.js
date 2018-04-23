//import required module
var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');

var heroes=[];/* = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];*/
// Add headers
app.use(function (req, res, next) {
    //Allow to connect http://localhost:4200 to access
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //Allow these methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

    next();
});

//Get the data from the database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
});
//console.log(heroes[0]);
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM heroes", function (err, result, fields) {
        if (err) throw err;
        heroes = result;
        console.log(result);
    });
});
console.log(heroes[0]);
app.get('/api/heroes', function(req, res){
    res.send(heroes);
});

app.get('/api/heroes/:id', function(req, res){
    res.send(heroes.find(hero => hero.id === parseInt(req.params["id"])));
});

/*app.post('/add/:id/:name', function(req, res){
    res.send(req.params);
});*/

http.listen(3000, function(){
    console.log('listening on *:3000');
});