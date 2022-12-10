const fs = require('fs');
const data = fs.readFileSync('./8-data.txt',
            {encoding:'utf8', flag:'r'});

var rows = data.split("\n");

var highest_score = 0;

for (var i = 1; i < rows.length - 1; i++) {
  var row = rows[i];
  for (var j = 1; j < row.length - 1; j++) {
    var current_tree = row[j];

    var current_tree_score = 1;

    var trees_to_the_left = row.slice(0, j).split('').reverse();
    current_tree_score *= visibility(current_tree, trees_to_the_left);

    var trees_to_the_right = row.slice(j + 1).split('');
    current_tree_score *= visibility(current_tree, trees_to_the_right);

    var trees_above = [];
    for (var k = 0; k < i; k++) {
      trees_above.push(rows[k][j]);
    }
    trees_above.reverse();
    current_tree_score *= visibility(current_tree, trees_above);

    var trees_below = [];
    for (var k = i + 1; k < rows.length; k++) {
      trees_below.push(rows[k][j]);
    }
    current_tree_score *= visibility(current_tree, trees_below);

    if (current_tree_score > highest_score) {
      highest_score = current_tree_score;
    }
  }
}

function visibility(main_tree_height, trees_to_compare) {
  var current_tree_index = 0;
  var number_of_trees_to_see = 0;
  while (trees_to_compare[current_tree_index] && Number(trees_to_compare[current_tree_index]) < Number(main_tree_height)) {
    number_of_trees_to_see++;
    current_tree_index++;
  }
  if (trees_to_compare[current_tree_index]) {
    number_of_trees_to_see++;
  }
  return number_of_trees_to_see;
}

console.log(highest_score);