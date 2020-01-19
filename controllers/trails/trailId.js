const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

const {
  trails,
  users,
  locations,
  categories,
  images,
  comments,
} = require('../../models');

module.exports = (req, res) => {
  const token = req.cookies.user;

  // * token이 정상적인지 확인
  jwt.verify(token, secretObj.secret, async (err, decoded) => {
    if (decoded) {
      const { trailId } = req.params;
      const resData = {};

      const findRef = await trails.findOne({
        where: {
          id: trailId,
        },
      });

      // * findRef의 데이터를 이용하여 각각의 모델을 inner join 하기
      const joinResult = await trails.findAll({
        include: [
          {
            model: locations,
            where: {
              id: findRef.locationId,
            },
          },
          {
            model: users,
            // ! 원하는 column 선택 가능
            // attributes: ['username', 'email'],
            where: {
              id: findRef.userId,
            },
          },
          {
            model: categories,
            where: {
              id: findRef.categoryId,
            },
          },
          {
            model: images,
            where: {
              id: findRef.imageId,
            },
          },
        ],
        raw: true,
      });

      resData.trail = joinResult[0];

      // ! comments는 관계에 의해 별도로 실행 => 하나의 triail에 여러 comment가 각기 다른 key/value를 가지기 때문
      // * comments 모델에서 req.params.trailid를 이용하여 trailId가 같은 데이터 전부 가져오기
      const findCommentsRef = await comments.findAll({
        where: {
          trailId: trailId,
        },
      });

      // * req.params.trailId와 같은 모든 comments를 반복문을 이용하여 각각의 코멘트의 외래키와 조인한 다음, 하나로 묶기
      // ! comments를 하나로 묶기 위한 배열 생성

      for (let i = 0; i < findCommentsRef.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const findEachComments = await comments.findAll({
          // * join하려는 모델과 조건을 지정
          include: [
            {
              model: trails,
              where: {
                id: findCommentsRef[i].dataValues.trailId,
              },
            },
            {
              model: users,
              where: {
                id: findCommentsRef[i].dataValues.userId,
              },
            },
            {
              model: images,
              where: {
                id: findCommentsRef[i].dataValues.imageId,
              },
            },
          ],
          raw: true,
        });
        resData[`comment${i}`] = findEachComments[0];
      }

      console.log(resData);
      // * json형식으로 클라이언트에 응답!
      res.json(resData);
    } else {
      // * Token이 비정상인 경우
      res.sendStatus(401);
    }
  });
};
