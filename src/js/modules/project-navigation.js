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

		let navItems = this.$container.getElementsByClassName('navigation__item');
		Array.from(navItems).forEach((item) => {
			let projectId = item.getAttribute('data-id');

			item.addEventListener('mouseenter', (e) => {
				this.eventEmitter.emit('mouseenter', projectId);

				if(this.overContainer){
					this.scrollToItem(e.target);
				}
			});
			
			item.addEventListener('mouseleave', (e) => {
				this.eventEmitter.emit('mouseleave', projectId);
			});
		});


		this.$container.addEventListener('mouseenter', (e) => {
			setTimeout(() => { 
				this.overContainer = true;
			}, 100);
		});

		this.$container.addEventListener('mouseleave', (e) => {
			this.overContainer = false;
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
		this.currentScrollPos = scrollPos;
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}
}

export default ProjectNavigation;