const fs = require('fs');
const data = fs.readFileSync('./11-data.txt',
            {encoding:'utf8', flag:'r'});

var raw_monkey_data = data.split("\n\n");

var clean_monkey_data = {};
for (var i = 0; i < raw_monkey_data.length; i++) {
  var current_monkey = raw_monkey_data[i].split("\n");

  var starting_items = current_monkey[1].slice(17).split(', ');
  var operation = current_monkey[2].slice(19);
  var test = {
    divisible_by         : current_monkey[3].slice(21),
    destination_if_true  : current_monkey[4].slice(29),
    destination_if_false : current_monkey[5].slice(30),
  }

  clean_monkey_data[i] = {
    number_of_items_inspected : 0,
    starting_items,
    operation,
    test,
  };
}

var monkeys = Object.keys(clean_monkey_data);

var divisor = 1;
for (var m = 0; m < monkeys.length; m++) {
  divisor *= clean_monkey_data[m].test.divisible_by;
}

for (var j = 1; j <= 10000; j++) {
  for (var k = 0; k < monkeys.length; k++) {
    var current_monkey = clean_monkey_data[k];
    var num_of_starting_items = current_monkey.starting_items.length;

    for (var l = 0; l < num_of_starting_items; l++) {
      var item = current_monkey.starting_items.shift();

      var operation = current_monkey.operation.replace(/old/g, item);
      var worry_level = eval(operation);
      worry_level %= divisor;

      var destination_monkey;
      if (worry_level % Number(current_monkey.test.divisible_by) === 0) {
        destination_monkey = current_monkey.test.destination_if_true;
      } else {
        destination_monkey = current_monkey.test.destination_if_false;
      }

      clean_monkey_data[destination_monkey].starting_items.push(worry_level);
      current_monkey.number_of_items_inspected++;
    }
  }
}

var monkey_business = [];
for (var k = 0; k < monkeys.length; k++) {
  monkey_business.push(clean_monkey_data[k].number_of_items_inspected);
}
sorted_monkey_business = monkey_business.sort((a,b) => b - a);

console.log(clean_monkey_data);
console.log(sorted_monkey_business);
console.log(sorted_monkey_business[0] * sorted_monkey_business[1]);