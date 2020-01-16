const { Users } = require('../models/users');

module.exports = async (req, res) => {
  const { body } = req;

  console.log('signin body is ', body);

  const result = await Users.findOne({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  
  res.send(result.dataValues);

  // console.log(result);
};
