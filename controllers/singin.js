const { Users } = require('../models/users');

/**
 * 이미 회원가입이 완료된 사람(email 확인)인지 DB에서 조회 -> 아니라면 401 리턴
 * 존재한다면 password 도 확인 -> 아니라면 401 리턴
 * 패스워드도 일치하면, 토큰을 생성 & 지급 -> 이 때 추후 userId 조회를 위해 token 과 userId 도 쿠키에 추가
 */
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
