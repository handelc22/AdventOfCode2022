const fs = require('fs');
const data = fs.readFileSync('./4-data.txt',
            {encoding:'utf8', flag:'r'});

var pairs = data.split("\n");

var num_of_total_overlaps = 0;

for (var i = 0; i < pairs.length; i++) {
  var assignments = pairs[i].split(',');
  var first_elf_assignment = assignments[0].split('-').map( x => Number(x));
  var second_elf_assignment = assignments[1].split('-').map( x => Number(x));

  var overlap =
    (second_elf_assignment[0] >= first_elf_assignment [0]
      && second_elf_assignment[0] <= first_elf_assignment [1])
    ||
    (first_elf_assignment[0] >= second_elf_assignment [0]
      && first_elf_assignment[0] <= second_elf_assignment [1]);

  if (overlap) {
    num_of_total_overlaps++;
  }
}

console.log(num_of_total_overlaps);