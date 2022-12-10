const fs = require('fs');
const data = fs.readFileSync('./7-data.txt',
            {encoding:'utf8', flag:'r'});

var rows = data.split("\n");

var directories = {};

var current_path = [];

for (var i = 0; i < rows.length; i++) {
  var row = rows[i];

  if (row.slice(0, 4) === '$ cd') {
    var direction = row.slice(5);
    if (direction === '..') {
      current_path.pop();
    } else {
      if (direction === '/') {
        current_path = ['/'];
      } else {
        current_path.push(direction);
      }
      var current_directory_path = current_path.join('-');
      if (!directories[current_directory_path]) {
        directories[current_directory_path] = 0;
      }
    }
  } else if (row.slice(0, 4) === '$ ls') {
    var output_row_num = 1;
    var output_row = rows[i + output_row_num];
    while (output_row && output_row.slice(0, 1) !== '$') {
      if (output_row.slice(0, 3) !== 'dir') {
        var size = Number(output_row.split(' ')[0]);
        for (var j = 1; j <= current_path.length; j++) {
          var current_directory_path = current_path.slice(0, j).join('-');
          directories[current_directory_path] += size;
        }
      }
      output_row_num++;
      output_row = rows[i + output_row_num];
    }
    i += output_row_num - 1;
  }
}

var total_space_used = directories['/'];
var total_space_left = 70000000 - total_space_used;
var total_space_needed = 30000000 - total_space_left;
var size_of_directory_to_delete;

var directory_list = Object.keys(directories);
for (var k = 0; k < directory_list.length; k++) {
  var size = directories[directory_list[k]];
  if (!size_of_directory_to_delete || (size >= total_space_needed && size < size_of_directory_to_delete)) {
    size_of_directory_to_delete = size;
  }
}

console.log(size_of_directory_to_delete);