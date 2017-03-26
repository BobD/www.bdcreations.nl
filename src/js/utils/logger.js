class Logger {

	constructor(){
		window.log = Logger.log;
	}

	static log(){
		if(ENV == 'development'){
			console.log.apply(this, arguments);
		}
	}
}

export default Logger;