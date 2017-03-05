import Velocity from 'velocity-animate';

class Pages {

	constructor(){
		this.$container = document.querySelector("*[data-js='pages']");
		this.currentIndex = 0;
	}

	scrollTo(id){
		log(id);
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
		Velocity(document.querySelector("*[data-js='pages']"), {translateZ: 0, translateX: `${offset}%`}, {delay: 250, queue: false, duration: duration});

		this.$container.classList.add('show');
		this.currentIndex = index;
	}

	fadeOut(){
		this.$container.classList.remove('show');
	}
}

export default Pages;