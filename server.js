let socket = new WebSocket("ws://localhost:3000/socket");

socket.onopen = function(e){
const {spawn} = require('node:child_process');

const command = spawn('ping', ["google.com"]);

command.stdout.on('data', output => {
				console.log(output.toString())
});
};

while(true){};
