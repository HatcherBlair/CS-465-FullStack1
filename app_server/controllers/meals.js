const request = require("request");
const apiOptions = { server: "http://localhost:3000" };

/* Render Meals View */
function renderMealsList(req, res, responseBody) {
  let message = null;
  let pageTitle = "Meals";

  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No meals exist in the database!";
    }
  }

  res.render("meals", {
    title: pageTitle,
    mealInfo: responseBody,
    message,
  });
}

/* GET Meals List View */
function mealsList(req, res) {
  const path = "/api/meals";
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
  };

  console.info(`>> mealsController.mealsList calling ${requestOptions.url}`);

  request(requestOptions, (err, { statusCode }, body) => {
    if (err) console.error(err);

    renderMealsList(req, res, body);
  });
}

module.exports = { mealsList };
