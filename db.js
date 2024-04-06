const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const dbconnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://newuser:pH2pzX8G74i2V1P4@cluster0.jysaopw.mongodb.net/Quiz?retryWrites=true&w=majority'
    );
    console.log('connected successfully');
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = dbconnection;
