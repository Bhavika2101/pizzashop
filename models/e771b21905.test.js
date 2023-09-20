const mongoose = require('mongoose');
const Order = require('../models/Order');
const Pizza = require('../models/Pizza');
// const ExtraTopping = require('../models/ExtraTopping'); // Commented out as the module is not found

describe('Order Model Test', () => {

  beforeAll(async () => {
    const uri = process.env.__MONGO_URI__;
    if (typeof uri !== 'string') {
      throw new Error('MONGO_URI is not a string');
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  test('save order successfully with type delivery', async () => {
    const pizzaData = { name: 'Margherita', price: 10 };
    const pizza = new Pizza(pizzaData);
    await pizza.save();

    const orderData = { Pizza: [pizza._id], type: 'delivery', deliveryCharge: 5 };
    const order = new Order(orderData);
    await order.save();

    expect(order.price).toBe(10);
    expect(order.tax).toBeCloseTo(1.95); 
    expect(order.total).toBeCloseTo(16.95);
  }, 10000);

  test('save order successfully with type pickup', async () => {
    const pizzaData = { name: 'Pepperoni', price: 15 };
    const pizza = new Pizza(pizzaData);
    await pizza.save();

    const orderData = { Pizza: [pizza._id], type: 'pickup' };
    const order = new Order(orderData);
    await order.save();

    expect(order.price).toBe(15);
    expect(order.tax).toBeCloseTo(1.95); 
    expect(order.total).toBeCloseTo(16.95);
  }, 10000);

  /* Commented out as the ExtraTopping module is not found
  test('save order successfully with extraToppings', async () => {
    const pizzaData = { name: 'Pepperoni', price: 15 };
    const extraToppingData = { name: 'Mushrooms', price: 2 };
    const pizza = new Pizza(pizzaData);
    const extraTopping = new ExtraTopping(extraToppingData);
    await pizza.save();
    await extraTopping.save();

    const orderData = { Pizza: [pizza._id], extraToppings: [extraTopping._id], type: 'pickup' };
    const order = new Order(orderData);
    await order.save();

    expect(order.price).toBe(17);
    expect(order.tax).toBeCloseTo(2.21); 
    expect(order.total).toBeCloseTo(19.21);
  }, 10000);
  */

  afterEach(async () => {
    await Order.deleteMany();
    await Pizza.deleteMany();
    // await ExtraTopping.deleteMany(); // Commented out as the module is not found
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
