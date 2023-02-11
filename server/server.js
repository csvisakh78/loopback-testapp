const loopback = require("loopback");
const boot = require("loopback-boot");
const path = require("path");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = (module.exports = loopback());

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(loopback.token());
app.use(
  loopback.token({
    model: app.models.accessToken,
  })
);
app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit("started");
    var baseUrl = app.get("url").replace(/\/$/, "");
    console.log("Web server listening at: %s", baseUrl);
    console.log("Browse your swagger docs at %s%s", baseUrl, `/api-docs`);
  });
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
