import Events from 'events';
import Velocity from 'velocity-animate';
import Tools from 'utils/tools';

class Projects {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='projects']");
		this.$list =  this.$container.querySelector("*[data-js='projects__list']");

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

				this.openItem(item);
				this.eventEmitter.emit('show', {
					id: projectId,
					position: position
				});
			});
			
			item.addEventListener('mouseleave', (e) => {
				this.eventEmitter.emit('hide', {
					id: projectId,
					position: item.getBoundingClientRect()
				});
			});

			item.addEventListener('click', (e) => {
				this.openItem(item);
			});
		});
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}

	trigger(id){
		const item = this.$container.querySelector(`*[data-id='${id}']`);
		const event = document.createEvent('HTMLEvents');
		event.initEvent('click', true, false);
		item.dispatchEvent(event);
	}

	openItem(item){
		let items = this.$container.querySelectorAll("*[data-js='projects__item']");

		Array.from(items).forEach((el) => {
			el.classList.remove('active');
		});

		item.classList.add('active');
	}

	open(){
		this.$list.classList.add('open');
	}

	close(){
		this.$list.classList.remove('open');
		let items = this.$container.querySelectorAll("*[data-js='projects__item']");
		Array.from(items).forEach((item) => {
			item.classList.remove('active');
			item.classList.remove('open');
		});
	}
}

export default Projects;