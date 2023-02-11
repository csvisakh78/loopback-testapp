module.exports = function (Tyre) {
  Tyre.compatibleCars = async (tyreSize, cb) => {
    try {
      const Car = Tyre.app.models.car;
      const cars = await Car.find({ where: { tyreSize } });
      cb(null, cars);
    } catch (err) {
      cb(err);
    }
  };
  Tyre.remoteMethod("compatibleCars", {
    accepts: { arg: "tyreSize", type: "string", required: true },
    returns: { arg: "cars", type: "Array" },
    http: { path: "/:tyreSize/compatibleCars", verb: "get" },
  });
};
