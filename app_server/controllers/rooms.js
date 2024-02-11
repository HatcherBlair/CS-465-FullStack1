const request = require("request");
const apiOptions = { server: "http://localhost:3000" };

/* Render Rooms View */
function renderRoomsList(req, res, responseBody) {
  let message = null;
  let pageTitle = "Rooms";

  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No rooms exist in the database!";
    }
  }

  res.render("rooms", {
    title: pageTitle,
    roomInfo: responseBody,
    message,
  });
}

/* GET Meals List View */
function roomsList(req, res) {
  const path = "/api/rooms";
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
  };

  console.info(`>> roomsController.roomsList calling ${requestOptions.url}`);

  request(requestOptions, (err, { statusCode }, body) => {
    if (err) console.error(err);

    renderRoomsList(req, res, body);
  });
}

module.exports = { roomsList };
