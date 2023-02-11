const { v4: uuidv4 } = require("uuid");

module.exports = function (Car) {
  Car.observe("before save", async (ctx) => {
    ctx.instance.carCode = uuidv4();
    return;
  });

  Car.compatibleTyres = async (carCode, cb) => {
    try {
      const Tyre = Car.app.models.tyre;
      const car = await Car.findOne({ where: { carCode: carCode } });
      const tyres = await Tyre.find({ where: { tyreSize: car.tyreSize } });
      cb(null, tyres);
    } catch (err) {
      cb(err);
    }
  };
  Car.remoteMethod("compatibleTyres", {
    accepts: { arg: "carCode", type: "string", required: true },
    returns: { arg: "tyres", type: "Array" },
    http: { path: "/:carCode/compatibleTyres", verb: "get" },
  });
};
