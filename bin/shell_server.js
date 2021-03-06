var cp = require('child_process');

//piece server sub process
var server_process;

module.exports = function(app) {

	app.cmd('server start', 'run piece server at port 3000', function(req, res, next){

		server_process = cp.fork(__dirname + '/cp_server.js');

		res.prompt();
	});

	app.cmd('server stop', 'stop the piece server', function(req, res, next){
		if (server_process) {
			module.exports.quit();
		} else {
			res.red('piece server is not running.').ln();
		}

		res.prompt();
	});

	app.cmd('server status', 'check the status of piece server', function(req, res, next){
		if (server_process) {
			res.cyan('piece server is running').ln();
		} else {
			res.red('piece server is not running.').ln();
		}

		res.prompt();
	});
}

module.exports.quit = function(){
	if(server_process) {
		server_process.kill('SIGHUP');
		server_process = null;
		console.log('stop piece server...');
	}
}