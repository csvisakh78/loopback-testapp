module.exports = function (Brand) {
  Brand.validatesInclusionOf("brandType", { in: ["car", "tyre"] });
  Brand.beforeRemote("create", function (context, user, next) {
    context.args.data.brandCode = Date.now();
    next();
  });
};
