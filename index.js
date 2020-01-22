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
app.use(
  cors({
    origin: ['http://stroll1.s3-website.ap-northeast-2.amazonaws.com'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);
// app.use(cors());
app.use(morgan('dev'));

// 정적파일 다루기 위한 설정
app.use(express.static('uploads'));

// router
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/trails', trailsRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app Listening on ${PORT}`);
});
