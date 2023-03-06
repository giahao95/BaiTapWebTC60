const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const dbCongif = 'mongodb://127.0.0.1/fullstack-web';
    const connect = await mongoose.connect(dbCongif);
    console.log(`Mongodb connected: ${connect.connection.host}`);
  } catch (error) {
    console.log('Error connect to mongodb');
  }
};

module.exports = connectDatabase;
