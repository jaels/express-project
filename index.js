

var express = require('express');
var app = express();

app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({
    extended: false
}));

app.get('/express-project', function(req, res, next) {
    console.log(req.url);
    res.redirect('/cookie');
    next();
});


//app.get('/',function(req,res,next) {
//    res.redirect('/cookie');
//    next();
//})



app.get('/cookie', function(req,res,next) {

    res.write('<html>');
    res.write('<form method="POST">');
    res.write('<input type="checkbox" name="cookies" value="yes"> I allow cookies<br>');
    res.write('<input type="checkbox" name="cookies" value="no"> I do not allow cookies<br>');
    res.write('<input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</html>');

    next();
});

app.post('/cookie', function (req,res) {
    if (req.body["cookies"]==='yes') {
        res.cookie('name', 'cook', {maxAge:60000})
        res.redirect('/hello/world');
    }
    if(req.body["cookies"]==='no') {
        res.send('Sorry, you can not use this site without accepting cookies')
    }

})




app.get('/hello/world', function (req,res) {
    res.send('<!doctype html><title>Hello World!</title><p>Hello World!</html>');
})

app.use('/express-project',function (req,res,next) {
    express.static('projects');
    next();
})








app.listen(8080);
