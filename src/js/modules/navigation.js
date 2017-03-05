import Events from 'events';

class Navigation {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='navigation']");

		let navItems = this.$container.getElementsByClassName('navigation__item');
		Array.from(navItems).forEach((item) => {
			let id = item.getAttribute('data-id');

			item.addEventListener('mouseenter', (e) => {
				this.eventEmitter.emit('mouseenter', {
					id: id
				});
			});
			
			item.addEventListener('mouseleave', (e) => {
				this.eventEmitter.emit('mouseleave', {
					id: id
				});
			});
		});
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}
}

export default Navigation;