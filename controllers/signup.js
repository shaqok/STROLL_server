/* eslint-disable object-shorthand */
const { users } = require('../models');
/**
 * 회원가입 요청을 받아 DB에 요청받은 정보를 저장한다.
 */
module.exports = async (req, res) => {
  // database에 들어온 바디를 넣어준다.
  const { email, password, username } = req.body;

  const checkEmail = await users
    .findOne({
      where: {
        email: email,
      },
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });

  if (checkEmail) {
    res.status(409).send('Account already exists');
  } else {
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
          res.status(201).send('Account has been successfully created');
        } else {
          res.status(409).send('Username already exists');
        }
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
};
