const express = require('express')
const app = express();
const path = require('path');
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/search', (req,res) => {
    res.render('search');
});

app.get('/results', (req,res) => {

    let query = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=490d41b8084777cb4f22c78552bab175&query='+query, (error, response, body) => {
        if (error) {
            console.log(error);
        }

        let data = JSON.parse(body);

        res.render('movies', {data: data, searchQuery: query});
    });
 
});

app.listen(3000, () => {
    console.log('Server started at port 3000');
});