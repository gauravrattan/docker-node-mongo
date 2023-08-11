const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
   `mongodb://${process.env.username}:${process.env.password}@${process.env.host}:27017/users`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const Item = require('./models/Item');
//const items =[{Name:"Gaurav"}]
app.get('/', (req, res) => {
 Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
    //res.render('index', {items} )
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

 app.get('/tmp', (req, res) => {
    res.send("welcome")
   });

const port = 3000;

app.listen(port, () => console.log('Server running...'));
