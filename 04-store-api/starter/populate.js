import dotenv from 'dotenv';
import { connectDB } from './db/connect.js';
import Product from './models/product.js';
import products from './products.json' with { type: 'json' };

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.create(products);

    console.log('Data imported successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error importing data', error);
    process.exit(1);
  }
};

start();
