/* eslint-disable no-console */
/* eslint-disable object-shorthand */
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');
const {
  trails,
  users,
  locations,
  categories,
  images,
} = require('../../models');

module.exports = {
  /**
   * 로그인하고 myPage를 처음 산책로들을 render 할 때 보내는 요청.
   * -주의: trail에 있는 userId는 작성자의 정보, token 과 같이 들어오는 id는 현재 접속한 유저!
   */
  get: (req, res) => {
    const token = req.cookies.user;
    // 토큰 인증 절차 -> 없으면 401
    jwt.verify(token, secretObj.secret, async (err, decoded) => {
      // 토큰이 존재한다면,
      if (decoded) {
        // 테이블에서 쿼리한 값들을 모아 응답으로 보낼 배열.
        const trailsWithInfo = [];
        // 각 trail의 foreign key로 연결된 테이블들에서 username, location들, tag 를 가져와 배열에 요소로 추가한다.
        // eslint-disable-next-line no-await-in-loop
        const eachInfos = await trails
          .findAll({
            include: [
              {
                model: users, // 원하는 테이블에서
                required: true,
                attributes: ['username'], // 원하는 요소만 select.
              },
              {
                model: locations,
                required: true,
                attributes: [
                  'location1',
                  'location2',
                  'location3',
                  'location4',
                  'location5',
                ],
              },
              {
                model: categories,
                required: true,
                attributes: ['tag'],
              },
            ],
            raw: true, // datavalues 만 가져오는 옵션
            nest: true, // 객체 형태로 구성
          })
          .catch((error) => {
            console.log(error);
            res.sendStatus(500);
          });
        // 각 가져온 값들에서 location들을 병합.
        for (let i = 0; i < eachInfos.length; i += 1) {
          trailsWithInfo.push(eachInfos[i]);
          trailsWithInfo[i].location = [
            eachInfos[i].location.location1,
            eachInfos[i].location.location2,
            eachInfos[i].location.location3,
            eachInfos[i].location.location4,
            eachInfos[i].location.location5,
          ];
        }
        if (!trailsWithInfo.length) {
          res.sendStatus(404);
        } else {
          res.status(200).json({ trails: trailsWithInfo });
        }
      } else {
        res.sendStatus(401);
      }
    });
  },
  /**
   * 새로운 산책로를 생성할 때 보내는 post 요청.
   * 필요한 데이터: token(decoded -> (userId, email 포함)으로 인증,
   *     location1-5, category.tag, Image.fileName&Path, title, review, adminDistrict(null)
   */
  post: (req, res) => {
    const token = req.cookies.user;
    // verify token -> 없으면 401
    jwt.verify(token, secretObj.secret, async (err, decoded) => {
      // 토큰이 존재한다면,
      if (decoded) {
        const {
          tag, title, review, adminDistrict, newLocations,
        } = req.body;
        const convertedLocations = JSON.parse(newLocations);
        // 이미지 파일을 추가했는지 확인
        let createImageResult;
        if (req.file !== undefined) {
          createImageResult = await images.create({
            fileName: req.file.filename,
            filePath: req.file.path,
          });
        }
        // locations 테이블에 좌표들 추가.
        const createLocation = await locations
          .create({
            location1: JSON.stringify(convertedLocations[0]),
            location2: JSON.stringify(convertedLocations[1]),
            location3: JSON.stringify(convertedLocations[2]),
            location4: JSON.stringify(convertedLocations[3]),
            location5: JSON.stringify(convertedLocations[4]),
          })
          .catch((error) => {
            console.log(error);
            res.sendStatus(500);
          });
        // categories 테이블에 tag를 찾거나 없으면 추가.
        const [createCategory, created] = await categories
          .findOrCreate({
            where: {
              tag: tag,
            },
          })
          .catch((error) => {
            console.log(error);
            res.sendStatus(500);
          });
        // trails에 위 테이블들에서 추가한 값들의 id를 Foreign Key로 가져와 추가.
        const createTrail = await trails
          .create({
            userId: decoded.userId,
            locationId: createLocation.dataValues.id,
            categoryId: createCategory.dataValues.id || created.dataValues.id,
            imageId: createImageResult !== undefined ? createImageResult.dataValues.id : null,
            title: title,
            review: review,
            adminDistrict: adminDistrict,
          })
          .catch((error) => {
            console.log(error);
            res.sendStatus(500);
          });
        // send trails
        res.status(200).json({ trails: createTrail.dataValues });
      } else {
        res.sendStatus(401);
      }
    });
  },
};
