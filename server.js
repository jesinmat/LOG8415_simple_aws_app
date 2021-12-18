var http = require('http');
const { exec } = require("child_process");

exec("git log --pretty=format:'%h - %s' --abbrev-commit | head -n 1", (error, stdout, stderr) => {
  getInstance(stdout.trim());
});

function getInstance(commit) {
  exec("ec2metadata --instance-id", (error, stdout, stderr) => {
    run(commit, stdout.trim());
  });
}


function run(commit, instance) {
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`Instance ID: ${instance}\nCurrently running commit ${commit}`);
    res.end();
  }).listen(80);
}
