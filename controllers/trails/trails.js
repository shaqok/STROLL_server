const { Trails } = require('../../models');
const { Users } = require('../../models');
const { Locations } = require('../../models');
const { Categories } = require('../../models');
const { Images } = require('../../models');

module.exports = {
  /**
   * 로그인하고 myPage를 처음 산책로들을 render 할 때 보내는 요청.
   * 필요한 데이터: token(decoded)으로 인증, userId(req.cookie(s).id 로 가져온다),
   * 1. 먼저 토큰의 유무를 확인한다. -> 없으면 401
   * 2. 토큰이 있다면 req.cookie(s) 를 통해 userId 를 받는다.
   * 3. 모든 locations 데이터, trailId 에 따른 username(작성자), title, tag (,rating) 를 응답으로 보낸다.
   * -주의: trail에 있는 userId는 작성자의 정보, token 과 같이 들어오는 id는 현재 접속한 유저!
   * ㄴ 형식:
   * {
   *   trailId: 1,
   *   location1: (x, y),
   *   location2: (x, y),
   *   location3: (x, y),
   *   location4: (x, y),
   *   location5: (x, y),
   *   username: 'user1',
   *   title: 'good trail',
   *   tag: 'night view',
   *   (rating: 5, 한 trail 의 정보창에 있는게 나을수도..)
   * }
   * 보낸 데이터들을 front 에서 현재 위치기준으로 반경 ~km 이내(location1을 기준)만 나타내도록 filter
   */
  get: (req, res) => {
    res.send('trail get success!');
  },
  /**
  * 새로운 산책로를 생성할 때 보내는 post 요청.
  * 필요한 데이터: token(decoded)으로 인증, userId(req.cookie(s).id 로 가져온다),
  *     location1-5, category.tag, Image.fileName&Address, title, review, adminDistrict
  * 1. 먼저 토큰의 유무를 확인한다. -> 없으면 401
  * 2. 토큰이 있다면 req.cookie(s) 를 통해 userId 를 받는다.
  * 3. 그 외 정보들을 먼저 DB에 create() 한다.
  * 4. DB에 create() 한 dataValues들에서 ID를 가져와서 trail 테이블의 Mul 로 추가하여 create()
  * 5. status 201
  */
  post: async (req, res) => {
    const { body } = req;
    console.log(body);
    // { title: 'good', review: 'so good', admin_district: 'seoul' }

    const findResult = await Users.findOne({
      where: {
        id: 1,
      },
    });

    // locations
    const locationCreate = await Locations.create({
      location1: '6',
      location2: '7',
      location3: '8',
      location4: '9',
      location5: '10',
    });
    // categories
    const categoryCreate = await Categories.create({
      tag: 'beach view',
    });
    // images
    const imageCreate = await Images.create({
      fileName: 'test Image2',
      fileAddress: 'test Address2',
    });

    console.log(locationCreate.dataValues.id);
    console.log(categoryCreate.dataValues.id);
    console.log(imageCreate.dataValues.id);

    const trailResult = await Trails.create({
      userId: findResult.dataValues.id,
      locationId: locationCreate.dataValues.id,
      categoryId: categoryCreate.dataValues.id,
      imageId: imageCreate.dataValues.id,
      title: body.title,
      review: body.review,
      adminDistrict: body.adminDistrict,
    });

    res.send(trailResult.dataValues);
  },
};

// user_id
// location_id
// category_id
// image_id
// title
// review
// admin_district
