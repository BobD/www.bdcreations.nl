// Much obliged to http://youmightnotneedjquery.com/

class Tools {

	constructor(){
	}

	static hasClass(el, className){
		if (el.classList){
		  	return el.classList.contains(className);
		}else{
		  	return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
		}
	}

	static toggleClass(el, className, force){
		if (el.classList) {
			if(force === undefined){
		  		el.classList.toggle(className);
			}else{
				// The force parameter for toggle() is not supported in Internet Explorer or Opera 12 and earlier.
				if(force){
					el.classList.add(className);
				}else{
					el.classList.remove(className);
				}
	
			}
		} else {
			let classes = el.className.split(' ');
			let existingIndex = classes.indexOf(className);

			if(force === undefined){
			  	if (existingIndex >= 0){
			    	classes.splice(existingIndex, 1);
			  	}else{
			    	classes.push(className);
				}
			}else{
				if(force){
					if (existingIndex == -1){
		    			classes.push(className);
					}
				}else{
					if (existingIndex >= 0){
			    		classes.splice(existingIndex, 1);
			  		}
				}
			}

			el.className = classes.join(' ');
		}
	}

}

export default Tools;