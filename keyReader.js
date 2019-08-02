var fs = require('fs');
var jsonDiff = require('json-diff');
function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');;
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      index = remaining.indexOf('\n');
      func(line);
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(line) {
   var arr = line.split(' ');
   var mbFK = arr[0];
   var mbxFK = arr[1];
   var mbResp = JSON.parse(fs.readFileSync(mbFK + ".json", 'utf8'));
   var mbxResp = JSON.parse(fs.readFileSync(mbxFK + ".json", 'utf8'));
   let buffer = new Buffer(mbFK + '-' + mbxFK + '\r\n' + jsonDiff.diffString(mbResp, mbxResp)+'\r\n');
//    fs.open('diff1.txt', 'w', function(err, fd) {
//     if (err) {
//         throw 'could not open file: ' + err;
//     }

//     // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
//     fs.write(fd, buffer, 0, buffer.length, null, function(err) {
//         if (err) throw 'error writing file: ' + err;
//         fs.close(fd, function() {
//             console.log('wrote the file successfully');
//         });
//     });
// });
   
   fs.appendFile('diff.txt', buffer, (err) => {
    if (err){
      console.log("Error for" + mbFK + '-' + mbxFK);
      throw err;
    } 
    console.log('The difference has been saved for ' + mbFK + '-' + mbxFK);
  });
}

var input = fs.createReadStream('lines.txt');
readLines(input, func);