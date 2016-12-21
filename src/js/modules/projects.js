import Velocity from 'velocity-animate';

class Projects {

	constructor(){
		this.$container = document.querySelector("*[data-js='projects']");
		this.currentIndex = 0;
	}

	scrollTo(id, position){
		let $el = this.$container.querySelector(`*[data-id=${id}]`);
		let index = [].slice.call($el.parentNode.children).indexOf($el);
		let offset = index * -100;
		let dif = Math.abs(index - this.currentIndex);
		let baseSpeed = 400;
		let duration = baseSpeed;

		for(var a = 2; a < dif; ++a){
			duration += (baseSpeed / a);
		}

		Velocity(this.$container, {translateZ: 0, translateX: `${offset}%`}, {delay: 250, duration: duration, queue: false});

		this.$container.classList.add('show');
		this.currentIndex = index;

		this.positionContent($el, position);
	}

	positionContent($el, position){
		// let $content = $el.querySelector(`.project__content`);
		// $content.style.left = `${position.left + position.width}px`;
		// $content.style.left = `${position.left  position.width}px`;
	}

	fadeOut(){
		this.$container.classList.remove('show');
	}
}

export default Projects;