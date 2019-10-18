const fs = require('fs');

console.log("test");

fs.writeFile('test.txt', "test", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
