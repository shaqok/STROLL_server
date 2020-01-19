const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

const { images } = require('../../models');

module.exports = (req, res) => {
  const token = req.cookies.user;
  jwt.verify(token, secretObj.secret, async (err, decoded) => {
    if (decoded) {
      const createImageResult = await images.create({
        fileName: req.file.filename,
        filePath: req.file.path,
      });
      res.status(200).json(createImageResult.dataValues);
    } else {
      res.sendStatus(401);
    }
  });
};
