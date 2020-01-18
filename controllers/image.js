const { images } = require('../models');

module.exports = async (req, res) => {
  // Images에 이미지 파일명과 경로 삽입
  const createImageResult = await images.create({
    fileName: req.file.filename,
    filePath: req.file.path,
  });

  res.status(200).json({ imageResult: createImageResult.dataValues });
};
