import Events from 'events';
import Velocity from 'velocity-animate';

class Projects {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='projects']");

		if(!this.$container){
			return;
		}

		this.containerWidth = parseFloat(window.getComputedStyle(this.$container).width);
		this.scrollWidth = window.innerWidth;
		this.scrollGap =  this.scrollWidth - this.containerWidth;
		this.overContainer = false;
		this.currentScrollPos = 0;

		let navItems = this.$container.querySelectorAll("*[data-js='projects__item']");
		Array.from(navItems).forEach((item) => {
			let projectId = item.getAttribute('data-id');

			item.addEventListener('mouseenter', (e) => {
				let rect = item.getBoundingClientRect();
				let position = {left: rect.left, width: rect.width};

				this.eventEmitter.emit('mouseenter', {
					id: projectId,
					position: position
				});
			});
			
			item.addEventListener('mouseleave', (e) => {
				this.eventEmitter.emit('mouseleave', {
					id: projectId,
					position: item.getBoundingClientRect()
				});
			});
		});
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}
}

export default Projects;