import Velocity from 'velocity-animate';
import _ from 'lodash';

class Pages {

	constructor(){
		this.$container = document.querySelector("*[data-js='pages']");
		this.$contentContainer = document.querySelector("*[data-js='content']");
		this.scrollToComplete = _.debounce(this.showText.bind(this), 500);
		this.currentIndex = 0;
	}

	scrollTo(id){
		let $el = this.$container.querySelector(`*[data-id=${id}]`);
		let index = [].slice.call($el.parentNode.children).indexOf($el);
		let offset = index * -100;
		let dif = Math.abs(index - this.currentIndex);
		let baseSpeed = 500;
		let duration = baseSpeed;

		for(var a = 2; a < dif; ++a){
			duration += (baseSpeed / a);
		}

		this.$container.classList.add('show');
		this.currentIndex = index;
		this.scrollToComplete.cancel()
		this.clearText();

		Velocity(this.$container, {translateZ: 0, translateX: `${offset}%`}, {
			delay: 250, 
			duration: duration, 
			queue: false,
			complete: this.scrollToComplete
		});
	}

	clearText(){
		this.$contentContainer.innerHTML = '';
	}

	showText(){
		this.clearText();

		const $activePage = this.$container.children[this.currentIndex];
		const $content = $activePage.querySelector("*[data-js='page__content']");

		if($content){
			const $contentClone = $content.cloneNode(true);
			Array.from($contentClone.children).forEach(($item) => {
				this.$contentContainer.appendChild($item);
			});
		}
	}

	close(){
		this.clearText();
	}

}

export default Pages;