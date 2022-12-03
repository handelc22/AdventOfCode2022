const fs = require('fs');
const data = fs.readFileSync('./3-data.txt',
            {encoding:'utf8', flag:'r'});

var rucksacks = data.split("\n");

var total_priority = 0;

for (var i = 0; i < rucksacks.length; i += 3) {
  var rucksack_1 = rucksacks[i];
  var rucksack_2 = rucksacks[i + 1];
  var rucksack_3 = rucksacks[i + 2];

  var overlap_letter;
  for (var j = 0; j < rucksack_1.length; j++) {
    if (rucksack_2.includes(rucksack_1[j]) && rucksack_3.includes(rucksack_1[j])) {
      overlap_letter = rucksack_1[j];
      break;
    }
  }

  var priority = 0;
  if (overlap_letter === overlap_letter.toUpperCase()) {
    overlap_letter = overlap_letter.toLowerCase();
    priority += 26;
  }
  priority += overlap_letter.charCodeAt(0) - 96;
  total_priority += priority;
}

console.log(total_priority);