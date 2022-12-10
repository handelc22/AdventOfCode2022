const fs = require('fs');
const data = fs.readFileSync('./6-data.txt',
            {encoding:'utf8', flag:'r'});

for (var i = 0; i < data.length; i++) {
  var letters = data.slice(i, i + 14).split("");
  if (letters.every((e,i,a) => a.lastIndexOf(e) === i)) {
    console.log(i + 14);
    break;
  }
}