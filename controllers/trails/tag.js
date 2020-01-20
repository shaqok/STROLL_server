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

/**
 * ex) http://localhost:3000/trails/:tag
 * myPage 접속 후 태그를 클릭할 때마다 보내는 요청.
 * 필요한 데이터: token(decoded -> userId, email 포함)으로 인증, req.params.tag
 * -주의: trail에 있는 userId는 작성자의 정보, token 과 같이 들어오는 id는 현재 접속한 유저!
 */
module.exports = (req, res) => {
  // 선택한 tag
  const { tag } = req.params;
  const token = req.cookies.user;
  // 토큰 인증 절차 -> 없으면 401
  jwt.verify(token, secretObj.secret, async (err, decoded) => {
    // 토큰이 존재한다면,
    if (decoded) {
      // req.params.tag 와 같은 tagId를 체크
      const checkTag = await categories.findOne({
        where: {
          tag: tag,
        },
        raw: true,
      }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
      // 존재하지 않는 tag라면 404
      if (!checkTag) {
        res.sendStatus(404);
      }
      // checkTag에서 확인한 id를 이용하여 해당 id를 가진 trails를 findAll()
      const checkTrailsByTag = await trails.findAll({
        where: {
          categoryId: checkTag.id,
        },
        include: [
          {
            model: users,
            required: true,
            attributes: ['username'],
          },
          {
            model: locations,
            required: true,
            attributes: ['location1', 'location2', 'location3', 'location4', 'location5'],
          },
        ],
        raw: true,
        nest: true,
      }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
      // locations 하나로 병합
      const combineTrailsLocation = [];
      for (let i = 0; i < checkTrailsByTag.length; i += 1) {
        combineTrailsLocation.push(checkTrailsByTag[i]);
        combineTrailsLocation[i].location = [
          checkTrailsByTag[i].location.location1,
          checkTrailsByTag[i].location.location2,
          checkTrailsByTag[i].location.location3,
          checkTrailsByTag[i].location.location4,
          checkTrailsByTag[i].location.location5,
        ];
      }
      // 해당 태그의 trail이 없다면 404
      if (!combineTrailsLocation) {
        res.sendState(404);
      }
      res.status(200).json(combineTrailsLocation);
    // token이 없다면 401
    } else {
      res.sendStatus(401);
    }
  });
};
