const fs = require('fs');
const data = fs.readFileSync('./10-data.txt',
            {encoding:'utf8', flag:'r'});

var rows = data.split("\n");

var signal_strengths = {};
var key_cycles = [20, 60, 100, 140, 180, 220];

var number_of_cycles = 1;

var X = 1;

for (var i = 0; i < rows.length; i++) {
  var row = rows[i];
  if (row.slice(0,4) === 'noop') {
    number_of_cycles++;
  } else {
    number_of_cycles++;
    if (key_cycles.includes(number_of_cycles)) {
      signal_strengths[number_of_cycles] = X;
    }
    number_of_cycles++;
    var value_add = Number(row.slice(5));
    X += value_add;
  }

  if (key_cycles.includes(number_of_cycles)) {
    signal_strengths[number_of_cycles] = X;
  }
}

var total_signal_strength = 0;
for (var j = 0; j < key_cycles.length; j++) {
  total_signal_strength += key_cycles[j] * signal_strengths[key_cycles[j]];
}

console.log(total_signal_strength);