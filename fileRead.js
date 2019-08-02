const fs = require('fs');

// const fs = require('fs')
const path = require("path");
var pt = path.format({
    dir: '/home/ssg0269/Documents',
    base: 'sample.json'
  });
const file = fs.readFileSync(pt, 'utf8');
const json = JSON.parse(file);
console.log(json);
// fs.readFile('/home/ssg0269/Document/', (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data)
// })

// let rawdata = fs.readFileSync('/home/ssg0269/Document/sample.json');
// let student = JSON.parse(rawdata);
// console.log(student);