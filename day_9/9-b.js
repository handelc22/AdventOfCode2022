const fs = require('fs');
const data = fs.readFileSync('./9-data.txt',
            {encoding:'utf8', flag:'r'});

var moves = data.split("\n");

/*
{
  <row_num> : [<col_nums>],
}
*/
var tail_position_log = {};

// [ row, column ]
var positions = {
  '0' : [0,0],
  '1' : [0,0],
  '2' : [0,0],
  '3' : [0,0],
  '4' : [0,0],
  '5' : [0,0],
  '6' : [0,0],
  '7' : [0,0],
  '8' : [0,0],
  '9' : [0,0],
};

for (var i = 0; i < moves.length; i++) {
  var move = moves[i];
  var direction = move.slice(0, 1);
  var number = Number(move.slice(2));
  for (var j = 0; j < number; j++) {
    if (direction === 'R') {
      positions[0][1]++;
    } else if (direction === 'L') {
      positions[0][1]--;
    } else if (direction === 'U') {
      positions[0][0]++;
    } else if (direction === 'D') {
      positions[0][0]--;
    }

    for (var k = 1; k < 10; k++) {
      if (!knots_touching(positions[k - 1], positions[k])) {
        move_knot(positions[k - 1], positions[k]);
      }
    }

    log_tail_position(positions[9]);
  }
}

function knots_touching(preceding_knot_position, current_knot_position) {
  var rows_close_enough = Math.abs(preceding_knot_position[0] - current_knot_position[0]) <= 1;
  var cols_close_enough = Math.abs(preceding_knot_position[1] - current_knot_position[1]) <= 1;
  return rows_close_enough && cols_close_enough;
}

function move_knot(preceding_knot_position, current_knot_position) {
  if (preceding_knot_position[0] !== current_knot_position[0]) {
    preceding_knot_position[0] > current_knot_position[0] ? current_knot_position[0]++ : current_knot_position[0]--;
  }
  if (preceding_knot_position[1] !== current_knot_position[1]) {
    preceding_knot_position[1] > current_knot_position[1] ? current_knot_position[1]++ : current_knot_position[1]--;
  }
}

function log_tail_position(tail_position) {
  var row = tail_position[0];
  var column = tail_position[1];
  if (!tail_position_log[row]) {
    tail_position_log[row] = [];
  }
  if (!tail_position_log[row].includes(column)) {
    tail_position_log[row].push(column);
  }
}

var number_of_unique_positions = 0;
var distinct_rows = Object.keys(tail_position_log);
for (var i = 0; i < distinct_rows.length; i++) {
  number_of_unique_positions += tail_position_log[distinct_rows[i]].length;
}

console.log(number_of_unique_positions);