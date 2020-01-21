const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

const { comments, images } = require('../../models');

module.exports = (req, res) => {
  const token = req.cookies.user;
  jwt.verify(token, secretObj.secret, async (err, decoded) => {
    if (decoded) {
      const createImageResult = await images.create({
        fileName: req.file.filename,
        filePath: req.file.path,
      });

      const createCommentResult = await comments.create({
        userId: decoded.userId,
        trailId: Number(req.params.trailId),
        imageId: createImageResult.dataValues.id,
        comment: req.body.comment,
        rating: Number(req.body.rating),
      });
      res.status(200).json(createCommentResult.dataValues);
    } else {
      res.sendStatus(401);
    }
  });
};
