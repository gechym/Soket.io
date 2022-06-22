require('dotenv').config({ path: './config.env' });
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';

import handleError from './controller/HandleError';
import AppError from './util/AppError';
import productRouter from './routes/productRouter';
import commentRouter from './routes/commentRouter';

const app = express();

//config
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '10kb' }));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

// Bảo mật app
app.use(hpp()); // chặn 2 lần query parama giống nhau vd :  /api/v1/users?sort=price&sort=duration

// MIDDLEWARE
app.use(mongoSanitize()); // chặn những mã try vấn đến db từ text của người dùng

app.use(morgan('dev'));

app.use(xss()); // chặng người dùng chằn những mã html vs <script/> ...

//1 set security header
app.use(helmet());

//2 limiter request something ip
const limiter = rateLimit({
  // midleware giới hạn các lần gửi req quá nhiều từ một ip nào đó
  max: 100000,
  windowMs: 60 * 60 * 1000, // 60 minutes,
  message: 'Too many requests from this ip , please try again in a hour!',
});

app.use(express.static(path.join(__dirname, '../client/build'))); // khai các file¿

app.use('/api/', limiter);

app.use('/api/v1/products', productRouter);

app.use('/api/v1/comments', commentRouter);

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// app.use('*', (req, res, next) => {
//   return next(new AppError('404', 404));
// });

app.use(handleError());

const httpServer = createServer(app);

export default httpServer;
