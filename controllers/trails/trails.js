/* eslint-disable no-console */
/* eslint-disable object-shorthand */
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');
const {
  trails,
  users,
  locations,
  categories,
} = require('../../models');

module.exports = {
  /**
   * 로그인하고 myPage를 처음 산책로들을 render 할 때 보내는 요청.
   * 필요한 데이터: token(decoded -> (userId, email 포함)으로 인증,
   * 1. 먼저 토큰의 유무를 확인한다. -> 없으면 401
   * 2. 토큰을 통해 userId 를 받는다.
   * 3. trailId 에 따른 모든 locations 데이터, username(작성자), title, tag (,rating) 를 응답으로 보낸다.
   * -주의: trail에 있는 userId는 작성자의 정보, token 과 같이 들어오는 id는 현재 접속한 유저!
   * ㄴ 형식:
   * [{
   *   trailId: 1,
   *   locationId: 1,
   *   userId: 1,
   *   categoryId: 1,
   *   title: 'good trail',
   *   tag: 'night view',
   *   username: 'user1',
   *   locationsById: [[1,1],[2,2],[3,3],[4,4],[5,5]] 아님 각 location key:value 들
   *   (rating: 5, 한 trail 의 정보창에 있는게 나을수도..)
   * },]
   * 보낸 데이터들을 front 에서 현재 위치기준으로 반경 ~km 이내(location1을 기준)만 나타내도록 filter
   */
  get: (req, res) => {
    const token = req.cookies.user;
    // 토큰 인증 절차 -> 없으면 201
    jwt.verify(token, secretObj.secret, async (err, decoded) => {
      if (decoded) {
        const allTrails = await trails.findAll({}).catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
        if (!allTrails) {
          res.sendStatus(404);
        }
        const trailsWithInfo = [];
        // 각 trail의 foreign key로 연결된 테이블들에서 username, location들, tag 를 가져와 배열에 요소로 추가한다.
        for (let i = 0; i < allTrails.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          const eachInfos = await trails.findAll({
            include: [
              {
                model: users, // 원하는 테이블에서
                attributes: ['username'], // 원하는 요소만 조인한다.
              },
              {
                model: locations,
                attributes: ['location1', 'location2', 'location3', 'location4', 'location5'],
              },
              {
                model: categories,
                attributes: ['tag'],
              },
            ],
            raw: true, // datavalues 만 가져오는 옵션
          }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
          });
          trailsWithInfo.push(eachInfos[i]);
        }
        if (!trailsWithInfo.length) {
          res.sendStatus(404);
        }
        res.send(trailsWithInfo);
      } else {
        res.sendStatus(401);
      }
    });

  },
  /**
   * 새로운 산책로를 생성할 때 보내는 post 요청.
   * 필요한 데이터: token(decoded -> (userId, email 포함)으로 인증,
   *     location1-5, category.tag, Image.fileName&Path, title, review, adminDistrict
   * 1. 먼저 토큰의 유무를 확인한다. -> 없으면 401
   * 2. 토큰을 통해 userId 를 받는다.
   * 3. 그 외 정보들을 먼저 DB에 create() 한다.
   * 4. DB에 create() 한 dataValues들에서 ID를 가져와서 trail 테이블의 Mul 로 추가하여 create()
   * 5. status 201
   */
  post: (req, res) => {
    const token = req.cookies.user;
    // verify token -> 없으면 send 401
    jwt.verify(token, secretObj.secret, async (err, decoded) => {
      if (decoded) {
        const {
          imageId, tag, title, review, adminDistrict,
        } = req.body;
        const newLocations = JSON.parse(req.body.newLocations);
        // locations
        const createLocation = await locations.create({
          location1: JSON.stringify(newLocations[0]),
          location2: JSON.stringify(newLocations[1]),
          location3: JSON.stringify(newLocations[2]),
          location4: JSON.stringify(newLocations[3]),
          location5: JSON.stringify(newLocations[4]),
        }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
        // categories
        const [createCategory, created] = await categories.findOrCreate({
          where: {
            tag: tag,
          },
        }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
        // trails
        const createTrail = await trails.create({
          userId: decoded.userId,
          locationId: createLocation.dataValues.id,
          categoryId: createCategory.dataValues.id || created.dataValues.id,
          imageId: imageId,
          title: title,
          review: review,
          adminDistrict: adminDistrict,
        }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
        // send trails
        res.json(createTrail.dataValues);
      } else {
        res.sendStatus(401);
      }
    });
  },
};
