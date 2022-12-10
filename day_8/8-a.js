const fs = require('fs');
const data = fs.readFileSync('./8-data.txt',
            {encoding:'utf8', flag:'r'});

var rows = data.split("\n");

var number_of_visible_trees = 0;

number_of_visible_trees += (rows[0].length) * 2;

for (var i = 1; i < rows.length - 1; i++) {
  var row = rows[i];
  // add two for the right and left
  number_of_visible_trees += 2;

  for (var j = 1; j < row.length - 1; j++) {
    var current_tree = row[j];

    var trees_to_the_left = row.slice(0, j).split('');
    if (is_tree_visible(current_tree, trees_to_the_left)) {
      number_of_visible_trees++;
      continue;
    }

    var trees_to_the_right = row.slice(j + 1).split('');
    if (is_tree_visible(current_tree, trees_to_the_right)) {
      number_of_visible_trees++;
      continue;
    }

    var trees_above = [];
    for (var k = 0; k < i; k++) {
      trees_above.push(rows[k][j]);
    }
    if (is_tree_visible(current_tree, trees_above)) {
      number_of_visible_trees++;
      continue;
    }

    var trees_below = [];
    for (var k = i + 1; k < rows.length; k++) {
      trees_below.push(rows[k][j]);
    }
    if (is_tree_visible(current_tree, trees_below)) {
      number_of_visible_trees++;
      continue;
    }
  }
}

function is_tree_visible(tree_height, trees_to_compare) {
  return trees_to_compare.every(tree => Number(tree) < Number(tree_height));
}

console.log(number_of_visible_trees);