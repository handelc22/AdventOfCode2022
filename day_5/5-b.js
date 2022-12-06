const fs = require('fs');
const data = fs.readFileSync('./5-data.txt',
            {encoding:'utf8', flag:'r'});

var rows = data.split("\n");

var crates = [];
var top_crates = '';

for (var i = 0; i < rows.length; i++) {
  var row = rows[i];
  var index_of_next_bracket = row.indexOf('[');

  while (index_of_next_bracket !== -1) {
    var letter = row[index_of_next_bracket + 1];
    var column = (index_of_next_bracket / 4);
    if (!Array.isArray(crates[column])) {
      crates[column] = [];
    }
    crates[column].unshift(letter);
    index_of_next_bracket = row.indexOf('[', index_of_next_bracket + 1);
  }

  if (row.slice(0,4) === 'move') {
    var instructions = row.split(" ");
    var number_to_move = instructions[1];
    var column_to_move_from = instructions[3];
    var column_to_move_to = instructions[5];
    var crates_to_move = crates[column_to_move_from - 1].splice(
      (crates[column_to_move_from - 1].length) - number_to_move
    );
    crates[column_to_move_to - 1] = crates[column_to_move_to - 1].concat(crates_to_move);
  }
}

for (var k = 0; k < crates.length; k++) {
  top_crates += crates[k][crates[k].length - 1];
}

console.log(top_crates);