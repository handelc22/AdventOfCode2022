const fs = require('fs');
const data = fs.readFileSync('./10-data.txt',
            {encoding:'utf8', flag:'r'});

var rows = data.split("\n");
var current_row_index = 0;
var part_of_addx_cycle = 1;

var X = 1;

var result = [];

for (var i = 0; i < 6; i++) {
  result[i] = [];
  for (var j = 0; j < 40; j++) {

    if (Math.abs(X - j) <= 1) {
      result[i].push('#');
    } else {
      result[i].push('.');
    }

    if (rows[current_row_index].slice(0,4) === 'addx') {
      if (part_of_addx_cycle === 1) {
        part_of_addx_cycle = 2;
      } else {
        part_of_addx_cycle = 1;
        X += Number(rows[current_row_index].slice(5));
        current_row_index++;
      }
    } else {
      current_row_index++;
    }
  }
}

var result_string = '';
for (var i = 0; i < 6; i++) {
  result_string += result[i].join('');
  result_string += "\n";
}

console.log(result_string);