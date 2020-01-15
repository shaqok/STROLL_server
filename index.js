const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

const userRoute = require('./routes/main');
const trailRoute = require('./routes/trail');

// middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);
app.use(morgan('dev'));

// router
app.use('/main', userRoute);
app.use('/trail', trailRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app Listening on ${PORT}`);
});
