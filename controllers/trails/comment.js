const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

const { comments } = require('../../models');

module.exports = (req, res) => {
  const token = req.cookies.user;
  jwt.verify(token, secretObj.secret, async (err, decoded) => {
    console.log('body is ', req.body);
    // body is  { trailId: 1, imageId: 1, comment: '여기 진짜 좋네요!', rating: 5 }

    console.log('params is ', req.params);
    // params is  { tag: 'river', trailId: '1' }

    console.log('decoded is ', decoded);
    // decoded is  { userId: 1, email: '1@test.com', iat: 1579407546, exp: 1579409346 }

    if (decoded) {
      const createCommentResult = await comments.create({
        userId: decoded.userId,
        trailId: req.body.trailId,
        imageId: req.body.imageId,
        comment: req.body.comment,
        rating: req.body.rating,
      });
      res.status(200).json(createCommentResult.dataValues);
    } else {
      res.sendStatus(401);
    }
  });
};
