const { Users } = require('../models');

/**
 * 회원가입 요청을 받아 DB에 요청받은 정보를 저장한다.
 */
module.exports = async (req, res) => {
  // database에 들어온 바디를 넣어준다.
  const { body } = req;
  console.log('singup body is ', body);

  const userCreate = await Users.create({
    email: body.email,
    password: body.password,
    username: body.username,
  });
  console.log('userCreate ', userCreate);
  res.sendStatus(200);
};
