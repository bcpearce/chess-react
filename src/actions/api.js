var axios = require('axios');
var api = axios.create({
  baseURL:process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_ROUTE
});

console.log(api);

module.exports =
{
  requestNewGame: () => {
    return api.get("/game/new");
  },

  makeMove: (game, move) => {
    return api.post("/game/move", {data:{serial:game, move:move}})
  }
}