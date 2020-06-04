
exports.parseMove = function (board, player_turn_id) {
    var best = -10000
    var moves = []
    var allMoves = []


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] == 99) {
                allMoves.push([i, j])
            }
        }
    }

    allMoves.forEach(move => {
        score = miniMax(board, 0, false, player_turn_id, -100000, 100000, move)
        if (score > best) {
            best = score
            moves = []
        }
        if (score >= best) {
            moves.push(move)
        }
    });
    return [moves[0][0], moves[0][1]];
}

function alphabeta(board, alpha, beta, depth, possibleMoves) {
    var best = 0;

    if (isMax == true) {
        best = -999999
        possibleMoves.forEach(i => {
            board = nextMove(board, move, player_turn_id, isMax)
            val = miniMax(board, depth + 1, false, player_turn_id, alpha, beta, i)
            best = Math.max(best, val)
            alpha = Math.max(alpha, val)
            if (beta <= alpha) {
                return
            }
        });

        board[move[0]][move[1]] = 99
        return best
    }

    if (isMax == false) {

        best = 999999
        possibleMoves.forEach(movimiento => {
            board = nextMove(board, move, player_turn_id, isMax)
            val = miniMax(board, depth + 1, true, player_turn_id, alpha, beta, movimiento)
            best = Math.min(best, val)
            beta = Math.min(beta, val)
            if (beta <= alpha) {
                return;
            }
        });
        board[move[0]][move[1]] = 99
        return best
    }
}



function miniMax(board, depth, isMax, player_turn_id, alpha, beta, move) {
    if (depth == 0) {
        return evaluate(board, move, !isMax)
    }
    if (isMax == true) {
        player_turn_id = player_turn_id
    }
    if (isMax == false) {
        player_turn_id = (player_turn_id % 2) + 1
    }
    if (evaluate(board, move, !isMax) != 0) {
        return evaluate(board, move, !isMax)
    }

    var possibleMoves = movesLeft(board)

    return alphabeta(board, alpha, beta, depth, possibleMoves);
}

function evaluate(board, move, isMax) {

    var points = boxCounter(board, move)

    if (isMax == true) {
        return (points[1] - points[0])
    }

    if (isMax == false) {
        return (-(points[1] - points[0]))
    }
}

function boxCounter(board, move) {
    var collector = 0;
    var cont = 0;
    var points = 0;

    var collector2 = 0
    var cont2 = 0
    var points2 = 0

    for (var i = 0; i < board[0].length; i++) {
        if (((i + 1) % 6) != 0) {
            if (board[0][i] != 99 && board[0][i + 1] != 99 && board[1][cont + collector] != 99 && board[1][cont + collector + 1] != 99) {
                points = points + 1;
            }

            collector = collector + 6;

        } else {
            cont = cont + 1;
            collector = 0;
        }
    }

    board[move[0]][move[1]] = 0;

    for (var i = 0; i < board[0].length; i++) {
        if (((i + 1) % 6) != 0) {
            if (board[0][i] != 99 && board[0][i + 1] != 99 && board[1][cont2 + collector2] != 99 && board[1][cont2 + collector2 + 1] != 99) {
                points2 = points2 + 1
            }

            collector2 = collector2 + 6

        } else {
            cont2 = cont2 + 1
            collector2 = 0
        }
    }

    return [points, points2]
}

function movesLeft(board) {

    moves = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] == 99) {
                moves.push((i, j))
            }
        }
    }
    return moves;
}

function nextMove(board, move, player_turn_id, isMax) {
    var points = boxCounter(board, move);

    if (player_turn_id == 1) {
        if (points[0] - points[1] == 2) {
            board[move[0]][move[1]] = 2
        }
        if (points[1] - points[0] == 1) {
            board[move[0]][move[1]] = 1
        }
    }
    if (player_turn_id == 2) {
        if (points[1] - points[0] == 2) {
            board[move[0]][move[1]] = -2
        }
        if (points[1] - points[0] == 1) {
            board[move[0]][move[1]] = -1
        }
    }
    if (isMax == true) {
        return (board)
    }
    if (isMax == false) {
        return (board)
    }

}

exports.pickStrategy = function (N, ndice, nsix) {
    M = 0;
    for (var i = 0; i < N; i++) {
        alpha = 0;
        for (var ii = 0; ii < N; ii++) {
            r = Math.floor(Math.random() * 2) + 1;
            if (r == 1)
                alpha += 1
        }
        if (alpha >= nsix)
            M += 1
    }
    p = parseFloat(M) / N;
    return p
}

exports.pickHeuristic = function (N, ndice, nsix) {
    M = 0;
    for (var i = 0; i < N; i++) {
        score = 0;
        for (var ii = 0; ii < N; ii++) {
            r = Math.floor(Math.random() * 2) + 1;
            if (r == 1)
                score += 1
        }
        if (score >= nsix)
            M += 1
    }
    p = parseFloat(M) / N
    return p
}