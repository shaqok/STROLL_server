/* eslint-disable object-shorthand */
const { Users } = require('../models');

/**
 * 회원가입 요청을 받아 DB에 요청받은 정보를 저장한다.
 */
module.exports = async (req, res) => {
  // database에 들어온 바디를 넣어준다.
  const { email, password, username } = req.body;
  // console.log('singup body is ', body);

  Users.findOne({
    where: {
      email: email,
    },
  }).then((data) => {
    if (data) {
      res.status(409).send('Account already exits');
    } else {
      Users.create({
        email: email,
        password: password,
        username: username,
      }).then((result) => {
        console.log(result.dataValues);
        res.status(201).send('Account has been successfully created');
      });
    }
  }).catch(error => {
    console.log(error);
    res.sendStatus(500);
  });
};
