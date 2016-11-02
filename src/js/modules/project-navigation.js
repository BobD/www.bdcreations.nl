import Events from 'events';
import Velocity from 'velocity-animate';

class ProjectNavigation {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='nav-projects']");

		if(!this.$container){
			return;
		}

		this.containerWidth = parseFloat(window.getComputedStyle(this.$container).width);
		this.scrollWidth = window.innerWidth;
		this.scrollGap =  this.scrollWidth - this.containerWidth;
		this.overContainer = false;
		this.currentScrollPos = 0;

		let navItems = this.$container.getElementsByClassName('navigation__item');
		Array.from(navItems).forEach((item) => {
			let projectId = item.getAttribute('data-id');

			item.addEventListener('mouseenter', (e) => {
				let oldScrollPos = this.currentScrollPos;
				let currentScrollPos = this.scrollToItem(item);
				let scrollDif =  currentScrollPos - oldScrollPos;
				let rect = item.getBoundingClientRect();
				let position = {left: rect.left, width: rect.width};
				position.left += scrollDif;

				this.eventEmitter.emit('mouseenter', {
					id: projectId,
					position: position
				});

				this.currentScrollPos = currentScrollPos;
			});
			
			item.addEventListener('mouseleave', (e) => {
				this.eventEmitter.emit('mouseleave', {
					id: projectId,
					position: item.getBoundingClientRect()
				});
			});
		});
	}

	scrollToItem(item){
		let itemWidth =  parseFloat(window.getComputedStyle(item).width) / 2;
		let scrollToPos = item.getBoundingClientRect().left;
		let scrollPerc = (scrollToPos / this.scrollWidth);	
		let scrollPos = scrollPerc * this.scrollGap;

		if(scrollPos - this.currentScrollPos < -itemWidth){
			scrollPos = this.currentScrollPos - itemWidth;
		}

		if(scrollPos - this.currentScrollPos > itemWidth){
			scrollPos = this.currentScrollPos + itemWidth;
		}

		Velocity(this.$container, {translateZ: 0, translateX: `${scrollPos}px`}, {queue: false, duration: 250});
		return scrollPos;
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}
}

export default ProjectNavigation;