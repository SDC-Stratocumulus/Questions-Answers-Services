const client = require('../redis/index');

module.exports = function () {
  return (req, res, next) => {
    // Implement the middleware function based on the options object
    if (req.method === 'GET') {
      //console.log(req.method);
      const productId = req.query.product_id;
      console.log(productId);
      client.get(productId, (error, data) => {
        if (error) {
          console.log(error);
        }
        if (data !== null) {
          console.log('Using Redis cache');
          res.send(JSON.parse(data));
        } else {
          console.log('No data in redis cache');
          next();
        }
      });
      //next();
    } else {
      next();
    }
    //console.log(req.method === 'GET');
  };
};
