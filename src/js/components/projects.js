import Events from 'events';
import Velocity from 'velocity-animate';
import Tools from 'utils/tools';
import Router from 'utils/router';

class Projects {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='projects']");
		this.$list =  this.$container.querySelector("*[data-js='projects__list']");

		if(!this.$container){
			return;
		}

		let navItems = this.$container.querySelectorAll("*[data-js='projects__item']");
		Array.from(navItems).forEach((item) => {
			item.addEventListener('mouseenter', (e) => {
				this.openItem(item);
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
		const itemIsClosed = !item.classList.contains('active');

		if(itemIsClosed){
			const event = document.createEvent('HTMLEvents');
			event.initEvent('click', true, false);
			item.dispatchEvent(event);
		}

		return itemIsClosed;
	}

	openItem(item){
		const items = this.$container.querySelectorAll("*[data-js='projects__item']");
		const projectId = item.getAttribute('data-id');

		Array.from(items).forEach((el) => {
			el.classList.remove('active');
		});

		item.classList.add('active');

		Router.setState(`/projects/${projectId}`);
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