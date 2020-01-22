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
  // 요청하는 email, password
  const { email, password } = req.body;
  // 해싱되어 저장된 비밀번호와 대조하기 위해 요청의 password 또한 해싱.
  const hashedPwd = crypto
    .pbkdf2Sync(password, email, 100000, 64, 'sha512')
    .toString('hex');
  // DB에 이메일이 이미 존재하는지 확인
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
  // 존재하지 않으면 401.
  if (checkEmail) {
    // 존재한다면 해싱된 비밀번호를 대조.
    if (checkEmail.dataValues.password === hashedPwd) {
      // 일치한다면 토큰 생성 후 쿠키에 추가.
      const token = jwt.sign(
        {
          userId: checkEmail.dataValues.id,
          email: email, // 토큰의 내용(payload)
        },
        secretObj.secret, // 비밀 키
        {
          expiresIn: '30m', // 유효 시간은 30분
        },
      );
      res.cookie('user', token); // cookie에 token 추가
      res.status(200).json({ token: token });
    } else {
      // 비밀번호가 일치하지 않으면 401
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};
