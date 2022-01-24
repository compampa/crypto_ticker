const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const FileStore = require('session-file-store')(session);
const { idAndName } = require('./middlewares/middleware');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
  store: new FileStore(),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  name: 'myAuth',
}));
app.use(logger('dev'));
app.use(idAndName);

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
