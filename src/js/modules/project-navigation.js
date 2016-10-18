import Events from 'events';

class ProjectNavigation {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='nav-projects']");

		if(!this.$container){
			return;
		}

		let navItems = this.$container.getElementsByClassName('navigation__item');
		Array.from(navItems).forEach((item) => {
			let projectId = item.getAttribute('data-id');

			item.addEventListener('mouseenter', (e) => {
				this.eventEmitter.emit('mouseenter', projectId);
			});
			
			item.addEventListener('mouseleave', (e) => {
				this.eventEmitter.emit('mouseleave', projectId);
			});
		});
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}
}

export default ProjectNavigation;