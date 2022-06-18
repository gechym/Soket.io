import mongoose from 'mongoose';

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.PASSWORD);
const DATABASE_LOCAL = process.env.DATABASE_LOCAL;
mongoose
  .connect(DATABASE_LOCAL, {
    // v6 not suppot affter config so we use v5.5.2
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successful !');
  })
  .catch((err) => {
    console.log(err);
  });
