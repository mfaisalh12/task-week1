const express = require('express'); //framework to manage routing, request, adn responses
const morgan = require('morgan'); // third-party middleware
const mongoose = require('mongoose'); // ODM library for mongodb (database)
const blogRoutes = require('./routes/blogRoutes'); //connect to blogRoutes


const app = express(); //express app

//connect to mongodb
const dbURI = 'mongodb+srv://admin:admin123@nodetuts.gvxo5.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000)) // listen for requests
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
// Is code which runs between getting a request and sending a response
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// about routes
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// redirect to /about
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

// blogs routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})