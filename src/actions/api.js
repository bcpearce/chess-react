var axios = require('axios');
var api = axios.create({
  baseURL:process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_ROUTE
});

module.exports =
{
  requestNewGame: () => {
    return api.get("/game/new");
  },

  makeMove: (game, move) => {
    return api.post("/game/move", {serial:game, move:move})
  }
}