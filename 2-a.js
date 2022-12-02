const fs = require('fs');
const data = fs.readFileSync('./2-data.txt',
            {encoding:'utf8', flag:'r'});

var rounds = data.split("\n");

var key = {
  'X' : {
    points_for_move : 1,
    opponent_matchup : {
      'A' : 3,
      'B' : 0,
      'C' : 6,
    }
  },
  'Y' : {
    points_for_move : 2,
    opponent_matchup : {
      'A' : 6,
      'B' : 3,
      'C' : 0,
    }
  },
  'Z' : {
    points_for_move : 3,
    opponent_matchup : {
      'A' : 0,
      'B' : 6,
      'C' : 3,
    }
  },
};

var points = 0;
for (var i = 0; i < rounds.length; i++) {
  var opponent_move = rounds[i][0];
  var my_move = rounds[i][2];
  points += key[my_move].points_for_move;
  points += key[my_move].opponent_matchup[opponent_move];
}
console.log(points);