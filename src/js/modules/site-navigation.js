import Events from 'events';

class SiteNavigation {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='nav-site']");

		let navItems = this.$container.getElementsByClassName('navigation__item');
		Array.from(navItems).forEach((item) => {
			let mode = item.getAttribute('data-mode');

			item.addEventListener('mouseenter', (e) => {
				this.eventEmitter.emit('mouseenter', {
					mode: mode
				});
			});
			
			item.addEventListener('mouseleave', (e) => {
				this.eventEmitter.emit('mouseleave', {
					mode: mode
				});
			});
		});
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}
}

export default SiteNavigation;