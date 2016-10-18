import Velocity from 'velocity-animate';

class Projects {

	constructor(){
		this.$container = document.querySelector("*[data-js='projects']");


	}

	scrollTo(projectID){
		let $el = this.$container.querySelector(`*[data-id=${projectID}]`);
		let index = [].slice.call($el.parentNode.children).indexOf($el);
		let offset = index * -100;
		Velocity(this.$container, {translateZ: 0, translateX: `${offset}%`}, {queue: false});

		this.$container.classList.add('show');
	}

	fadeOut(){
		this.$container.classList.remove('show');
	}
}

export default Projects;