import Events from 'events';

class Information {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='information']");
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}

	open(){
		this.$container.classList.add('open');
	}

	close(){
		this.$container.classList.remove('open');
	}
}

export default Information;