const express = require('express');
const app = express();

require('dotenv').config();
// adding routes
const tasksRouter = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');

// adding db connection method
const connectDB = require('./db/connect');

// middlewares
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasksRouter);
app.use(notFound);
app.use(errorHandler);

const start = async (resolve, reject) => {
  // only start the server when successfully connected to DB
  try {
    await connectDB(process.env.MONGO_URI);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
