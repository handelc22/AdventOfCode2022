const fs = require('fs');
const data = fs.readFileSync('./9-data.txt',
            {encoding:'utf8', flag:'r'});

var moves = data.split("\n");

/*
{
  <row_num> : [<col_nums>],
}
*/
var positions = {};

// [ row, column ]
var head_position = [0,0];
var tail_position = [0,0];

for (var i = 0; i < moves.length; i++) {
  var move = moves[i];
  var direction = move.slice(0, 1);
  var number = Number(move.slice(2));
  for (var j = 0; j < number; j++) {
    if (direction === 'R') {
      head_position[1]++;
    } else if (direction === 'L') {
      head_position[1]--;
    } else if (direction === 'U') {
      head_position[0]++;
    } else if (direction === 'D') {
      head_position[0]--;
    }

    if (!head_and_tail_touching(head_position, tail_position)) {
      move_tail(head_position, tail_position);
    }

    log_tail_position(tail_position);
  }
}

function head_and_tail_touching(head_position, tail_position) {
  var rows_close_enough = Math.abs(head_position[0] - tail_position[0]) <= 1;
  var cols_close_enough = Math.abs(head_position[1] - tail_position[1]) <= 1;
  return rows_close_enough && cols_close_enough;
}

function move_tail(head_position, tail_position) {
  if (head_position[0] !== tail_position[0]) {
    head_position[0] > tail_position[0] ? tail_position[0]++ : tail_position[0]--;
  }
  if (head_position[1] !== tail_position[1]) {
    head_position[1] > tail_position[1] ? tail_position[1]++ : tail_position[1]--;
  }
}

function log_tail_position(tail_position) {
  var row = tail_position[0];
  var column = tail_position[1];
  if (!positions[row]) {
    positions[row] = [];
  }
  if (!positions[row].includes(column)) {
    positions[row].push(column);
  }
}

var number_of_unique_positions = 0;
var distinct_rows = Object.keys(positions);
for (var k = 0; k < distinct_rows.length; k++) {
  number_of_unique_positions += positions[distinct_rows[k]].length;
}

console.log(number_of_unique_positions);