const productModel = require('./models/productModel');
const userModel = require('./models/userModel');
const connectDB = require('./config/database');
const productsFake = require('./data/products');

connectDB();

const importData = async () => {
  try {
    const userAdmin = await userModel.findOne({ email: 'giahao@gmail.com' });
    const sampleData = productsFake.map((product) => {
      return {
        ...product,
        user: userAdmin._id,
      };
    });
    await productModel.insertMany(sampleData);
    console.log('Data imported success!');
  } catch (error) {
    console.log(error);
  }
};

importData();
