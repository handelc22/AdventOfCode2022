const fs = require('fs');
const data = fs.readFileSync('./1-data.txt',
            {encoding:'utf8', flag:'r'});

var calories = data.split("\n");

var elves = {};
var elf_num = 1;
var calories_per_elf = [];
var subtotal_calories_per_elf = 0;

for (var i = 0; i < calories.length; i++) {
  var num = Number(calories[i]);
  calories_per_elf.push(num);
  subtotal_calories_per_elf += num;

  if (!calories[i+1]) {
    elves[subtotal_calories_per_elf] = {
      elf_num: elf_num,
      calories: calories_per_elf
    }
    calories_per_elf = [];
    subtotal_calories_per_elf = 0;
    i++;
  }
}

var total_calories_sorted = Object.keys(elves).sort((a, b) => b - a);
//console.log(elves);
console.log(Number(total_calories_sorted[0]) + Number(total_calories_sorted[1]) + Number(total_calories_sorted[2]));