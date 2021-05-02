
var exec = require('child_process').exec;

var cmd = exec("npm --trace-deprecation run start:server", function(err, stdout, stderr) {
  if (err) {
    console.log(err);
  }
  console.log(stdout);
});

cmd.on('exit', function (code) {
    console.log(code);
});

