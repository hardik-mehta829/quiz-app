const fs = require('fs');
const dbconnection = require('./db');
const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));
const Quiz = require('./models/quizmodel');
// const deleteData = async () => {
//   try {
//     console.log('data deleted successfully');
//   } catch (error) {
//     console.log(error.message);
//   }
// };
dbconnection();
const importData = async () => {
  try {
    // await RestaurantModel.deleteMany();
    await Quiz.create(data);
    console.log('data loaded successfully');
    process.exit();
  } catch (error) {
    console.log(error.message);
  }
};

importData();
