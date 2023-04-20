// Load the 'index' controller
const index = require("../controllers/index.server.controller");
const cors = require("cors");

// Define the routes module' method
module.exports = function (app) {
  app.get("/", function (req, res) {
    // render the index.ejs page
    // res.render('index.ejs');
  });

  app.post("/runWithParam", cors(), index.trainAndPredict);
};
