import Events from 'events';

class Router {

	static init(){
		window.requestAnimationFrame(() => {
			const {type = '', id} = this.getState();
			this.eventEmitter.emit(`/${type}`, {id: id});
		});
	}

	static on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}
}

Router.eventEmitter = new Events.EventEmitter();

if (history.pushState && ENV == 'development') {
	Object.assign(Router, {
		setState: (path, data) => {
			history.pushState({
			}, null, path);

			const {type, id} = Router.getState();
			Router.eventEmitter.emit(`/${type}`, {id: id});
		},
		getState:() => {
			const [type, id] = window.location.pathname.replace(/^\/?|\/$/g, '').split('/');
			return {type: type, id: id};
		}
	});
}else{
	Object.assign(Router, {
		setState: (path, data) => {
			location.hash = path;

			const {type, id} = Router.getState();
			Router.eventEmitter.emit(`/${type}`, {id: id});
		},
		getState:() => {
			const [type, id] = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
			return {type: type, id: id};
		}
	});
}

export default Router;