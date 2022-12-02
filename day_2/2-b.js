const fs = require('fs');
const data = fs.readFileSync('./2-data.txt',
            {encoding:'utf8', flag:'r'});

var rounds = data.split("\n");

var points_for_move = {
  rock : 1,
  paper : 2,
  scissors : 3,
}
var key = {
  X : {
    points_for_result : 0,
    opponent_matchup: {
      A : 'scissors',
      B : 'rock',
      C : 'paper',
    }
  },
  Y : {
    points_for_result : 3,
    opponent_matchup : {
      A : 'rock',
      B : 'paper',
      C : 'scissors',
    }
  },
  Z : {
    points_for_result : 6,
    opponent_matchup : {
      A : 'paper',
      B : 'scissors',
      C : 'rock',
    }
  },
};

var points = 0;
for (var i = 0; i < rounds.length; i++) {
  var opponent_move = rounds[i][0];
  var result = rounds[i][2];
  points += key[result].points_for_result;
  points += points_for_move[key[result].opponent_matchup[opponent_move]];
}
console.log(points);