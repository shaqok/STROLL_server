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

      const resData = {
        trail: null,
        comments: [],
      };

      const findRef = await trails.findOne({
        where: {
          id: trailId,
        },
        raw: true,
      });

      // * findRef의 데이터를 이용하여 각각의 모델을 inner join 하기
      const joinResult = await trails.findAll({
        include: [
          {
            model: locations,
            required: true,
            attributes: ['location1', 'location2', 'location3', 'location4', 'location5'],
            where: {
              id: findRef.locationId,
            },
          },
          {
            model: users,
            required: true,
            where: {
              id: findRef.userId,
            },
          },
          {
            model: categories,
            required: true,
            where: {
              id: findRef.categoryId,
            },
          },
          // ! image가 null 경우 고려하여 left outer join으로 실시
          {
            model: images,
            required: false,
            where: {
              id: findRef.imageId,
            },
          },
        ],
        nest: true,
        raw: true,
      });

      const combineTrailsLocation = [];
      for (let i = 0; i < joinResult.length; i += 1) {
        // console.log(eachInfos[i]['user.username']);
        combineTrailsLocation.push(joinResult[i]);
        combineTrailsLocation[i].location = [
          joinResult[i].location.location1,
          joinResult[i].location.location2,
          joinResult[i].location.location3,
          joinResult[i].location.location4,
          joinResult[i].location.location5,
        ];
      }

      resData.trail = combineTrailsLocation[0];

      // ! comments는 관계에 의해 별도로 실행 => 하나의 triail에 여러 comment가 각기 다른 key/value를 가지기 때문
      // * comments 모델에서 req.params.trailid를 이용하여 trailId가 같은 데이터 전부 가져오기
      const findCommentsRef = await comments.findAll({
        where: {
          trailId: trailId,
        },
        raw: true,
      });

      // * req.params.trailId와 같은 모든 comments를 반복문을 이용하여 각각의 코멘트의 외래키와 조인한 다음, 하나로 묶기
      // ! comments를 하나로 묶기 위한 배열 생성

      for (let i = 0; i < findCommentsRef.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const findEachComments = await comments.findOne({
          // ! 반복문으로 join할 때, include의 where 조건이 같은 데이터가 복수 존재하면,
          // ! 항상 앞의 데이터가 결과로 나오기 때문에 설정함
          where: {
            comment: findCommentsRef[i].comment,
            rating: findCommentsRef[i].rating,
            createdAt: findCommentsRef[i].createdAt,
          },
          // * join하려는 모델과 조건을 지정
          include: [
            {
              model: trails,
              required: true,
              where: {
                id: findCommentsRef[i].trailId,
              },
            },
            {
              model: users,
              required: true,
              where: {
                id: findCommentsRef[i].userId,
              },
            },
            {
              model: images,
              required: false,
              where: {
                id: findCommentsRef[i].imageId,
              },
            },
          ],
          nest: true,
          raw: true,
        });
        resData.comments[i] = findEachComments;
      }

      // * json형식으로 클라이언트에 응답!
      res.status(200).json(resData);
    } else {
      // * Token이 비정상인 경우
      res.sendStatus(401);
    }
  });
};
