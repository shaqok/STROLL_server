const { Trails } = require('../../models');
const { Users } = require('../../models');
const { Locations } = require('../../models');
const { Categories } = require('../../models');
const { Images } = require('../../models');

module.exports = {
  get: (req, res) => {
    res.send('trail get success!');
  },
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

    // Promise.all([findResult, locationCreate, categoryCreate, imageCreate]).then(
    //   (result) => {
    //     Trails.create({
    //       user_id: result[0].dataValues.id,
    //       location_id: result[1].dataValues.id,
    //       category_id: result[2].dataValues.id,
    //       image_id: result[3].dataValues.id,
    //       title: body.title,
    //       review: body.review,
    //       admin_district: body.admin_district,
    //     }).then((data) => console.log('data ???????????????? ', data));
    //   },
    // );

    const trailResult = await Trails.create({
      userId: 1,
      locationId: 1,
      categoryId: 1,
      imageId: 1,
      title: body.title,
      review: body.review,
      adminDistrict: body.adminDistrict,
    });

    res.end();
    // res.send(trailResult.dataValues);
  },
};

// user_id
// location_id
// category_id
// image_id
// title
// review
// admin_district
