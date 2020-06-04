// connect.js
// Implementación del protocolo.
const myModule = require('./intelligence');
var socket;

var io = require('socket.io-client')

start();

function start() {
    socket = io.connect('http://localhost:9000', { reconnect: true });

    socket.on('connect', function () {
        console.log("Conectado.");
        socket.emit("signin", { game: "dotsAndBoxes", user_name: "josePabloRodriguez", tournament_id: 8, user_role: "player" });
    });

    socket.on('ok_signin', function (data) {

        console.log("Signin succesful. Waiting for ready....");
    });

    socket.on('error_signin', function (data) {
        console.log("Connection Error.");
    });

    socket.on('ready', function (data) {
        var board = data["board"];
        var playerTurnId = [];
        var moveParsed = myModule.parseMove(board, playerTurnId)
        socket.emit(
            'play',
            {
                tournament_id: 8,
                player_turn_id: data.player_turn_id,
                game_id: data.game_id,
                movement: moveParsed,
            }
        )
    });

    socket.on("finish", function (data) {
        socket.emit('player_ready', { tournament_id: 8, player_turn_id: data.player_turn_id, game_id: data.game_id })
    });

};