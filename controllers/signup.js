/* eslint-disable object-shorthand */
const { users } = require('../models');
/**
 * 회원가입 요청을 받아 DB에 요청받은 정보를 저장한다.
 */
module.exports = async (req, res) => {
  // database에 들어온 바디를 넣어준다.
  const { email, password, username } = req.body;
  // 요청한 email이 이미 DB에 존재하는지 확인.
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
  // 이미 존재한다면 409
  if (checkEmail) {
    res.sendStatus(409);
  } else {
    // 존재하지 않는다면, username도 중복되는지 확인. 존재하면 409, 존재하지 않으면 DB에 추가.
    users
      .findOrCreate({
        where: {
          username: username,
        },
        defaults: {
          email: email,
          password: password,
        },
      })
      .spread((data, created) => {
        if (created) {
          res.sendStatus(201);
        } else {
          res.sendStatus(409);
        }
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  }
};
