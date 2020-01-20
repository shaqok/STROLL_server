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
 * 1. 먼저 토큰의 유무를 확인한다. -> 없으면 401
 * 2. 토큰을 통해 userId 를 받는다.
 * 3. req.params.tag === tag에 일치하는 trail의
 *  locations 데이터, username(작성자), title, (tag) (,rating) 를 응답으로 보낸다.
 * -주의: trail에 있는 userId는 작성자의 정보, token 과 같이 들어오는 id는 현재 접속한 유저!
 * ㄴ 형식:
 * [{
 *   trailId: 1,
 *   location1: (x, y),
 *   location2: (x, y),
 *   location3: (x, y),
 *   location4: (x, y),
 *   location5: (x, y),
 *   username: 'user1',
 *   title: 'good trail',
 *   (tag: 'night view',) - 생략가능? 추후논의 - 선택한 리스트 제목
 *   (rating: 5, 한 trail 의 정보창에 있는게 나을수도..)
 * },]
 * 보낸 데이터들을 front 에서 현재 위치기준으로 반경 ~km 이내(location1을 기준)만 나타내도록 filter
 */
module.exports = (req, res) => {
  const { tag } = req.params;
  const token = req.cookies.user;
  // 토큰 인증 절차
  jwt.verify(token, secretObj.secret, async (err, decoded) => {
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
