

var express = require('express');
var app = express();
var url;
app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({
    extended: false
}));



app.get('/cookie', function(req,res) {

    res.write('<html>');
    res.write('<form method="POST">');
    res.write('<input type="checkbox" name="cookies" value="yes"> I allow cookies<br>');
    res.write('<input type="checkbox" name="cookies" value="no"> I do not allow cookies<br>');
    res.write('<input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</html>');

});


app.post('/cookie', function (req,res) {
    if (req.body["cookies"]==='yes') {
        res.cookie('name', 'cook', {maxAge:60000});
        res.redirect(url);
    }
    if(req.body["cookies"]==='no') {
        res.send('Sorry, you can not use this site without accepting cookies');
    }

});


app.get('*', function(req, res, next) {
    if(req.cookies.name==='cook') {
        next();
    }
    else{
        url=req.url;
        res.redirect('/cookie');}
});


    //app.get('/hello/world', function (req,res) {
    //    console.log(url);
    //    res.send('<!doctype html><title>Hello World!</title><p>Hello World!</html>');
    //})

app.use(express.static('./projects'));












app.listen(8080);
