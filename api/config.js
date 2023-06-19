const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Ecommerce');
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
  });