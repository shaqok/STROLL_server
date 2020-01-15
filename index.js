const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

const signupRoute = require('./routes/signup');
const signinRoute = require('./routes/signin');
const trailsRoute = require('./routes/trails');

// middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: ['http://localhost:3000'],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   }),
// );
app.use(cors());
app.use(morgan('dev'));

// router
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/trails', trailsRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app Listening on ${PORT}`);
});
