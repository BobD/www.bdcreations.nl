import Events from 'events';

class Router {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();

		if (history.pushState && ENV == 'development') {
		 	this.setState = this.setHistory;
		 	this.getState = this.getHistory;
		}else{
		 	this.setState = this.setHash;
		 	this.getState = this.getHash;
		}

		setTimeout(() => this.handleState(), 100);
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}

	setHash(path, data){
		location.hash = path;
		this.handleState();
	}

	setHistory(path, data){
		history.pushState({
		}, null, path);
		this.handleState();
	}

	getHash(){
		// Destructure an array to an object anyone?
		const [type, id] = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
		return {type: type, id: id};
	}

	getHistory(){
		// Destructure an array to an object anyone?
		const [type, id] = window.location.pathname.replace(/^\/?|\/$/g, '').split('/');
		return {type: type, id: id};
	}

	handleState(){
		const {type, id} = this.getState();

		if(type !== undefined){
			this.eventEmitter.emit(`/${type}`, {id: id});
		}else{
			this.eventEmitter.emit('/');
		}

	}
}

export default Router;