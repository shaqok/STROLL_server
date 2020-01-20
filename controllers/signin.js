/* eslint-disable object-shorthand */
// jsonwebtoken
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');
const { users } = require('../models');

/**
 * 이미 회원가입이 완료된 사람(email 확인)인지 DB에서 조회 -> 아니라면 401 리턴
 * 존재한다면 password 도 확인 -> 아니라면 401 리턴
 * 패스워드도 일치하면, 토큰을 생성 & 지급 -> 이 때 추후 userId 조회를 위해 token 과 userId 도 쿠키에 추가
 */
module.exports = async (req, res) => {
  const { email, password } = req.body;
  const hashedPwd = crypto
    .pbkdf2Sync(password, email, 100000, 64, 'sha512')
    .toString('hex');

  const checkEmail = await users
    .findOne({
      where: {
        email: email,
      },
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });

  if (checkEmail) {
    if (checkEmail.dataValues.password === hashedPwd) {
      console.log('1');
      const token = jwt.sign(
        {
          userId: checkEmail.dataValues.id,
          email: email, // 토큰의 내용(payload)
        },
        secretObj.secret, // 비밀 키
        {
          expiresIn: '300m', // 유효 시간은 30분
        },
      );
      res.cookie('user', token); // cookie에 token 추가
      res.status(200).json({ token: token });
    } else {
      console.log('2');
      res.sendStatus(401);
    }
  } else {
    console.log('3');
    res.sendStatus(401);
  }
};
