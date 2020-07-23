const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes')
//express app

const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://maxolee23:yomamatron1@blogz.yijsw.mongodb.net/blogzilla?retryWrites=true&w=majority'
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) =>  app.listen(3000))
    .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs');

//midleware and static files
app.use(express.static('public'))
app.use(express.urlencoded());
app.use(morgan('dev'))

//routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

//blog routes
app.use(blogRoutes)


app.use((req, res) => {
    res.status(404).render('404', { title: '404 Page not found'}) 
})