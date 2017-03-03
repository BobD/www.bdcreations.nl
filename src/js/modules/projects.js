import Events from 'events';
import Velocity from 'velocity-animate';
import Tools from 'utils/tools';

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



				this.closeItems();
								item.classList.add('active');
				this.minifyItems();

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

	minifyItems(){
		let items = this.$container.querySelectorAll("*[data-js='projects__item']:not(.active)");
		log(items);
		Array.from(items).forEach((item) => {
			item.classList.add('minify');
		});
	}

	closeItems(){
		let items = this.$container.querySelectorAll("*[data-js='projects__item']");
		Array.from(items).forEach((item) => {
			item.classList.remove('active');
			item.classList.remove('minify');
		});
	}

	close(){
		this.closeItems();
	}
}

export default Projects;