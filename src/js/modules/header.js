import Events from 'events';

class Header {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='header']");

		const navItems = this.$container.querySelectorAll("*[data-js='navigation__item']");
		Array.from(navItems).forEach((item) => {
			let id = item.getAttribute('data-id');

			item.addEventListener('click', (e) => {
				this.eventEmitter.emit('show', {
					id: id
				});
			});
		});

		const $title = this.$container.querySelector("*[data-js='header__title']");
		$title.addEventListener('click', (e) => {
			this.eventEmitter.emit('hide', {});
		});
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}
}

export default Header;