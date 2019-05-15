export default class NextAnimationFrameFactory {

  constructor() {}

  static getRequest() {

    this.callback = null;
    this.timeout = null;

  	var originalWebkitMethod;
  	var wrapper = null;
  	var callback = null;
  	var geckoVersion = 0;
  	var userAgent = navigator.userAgent;
  	var index = 0;
  	var self = this;

  	// Workaround for Chrome 10 bug where Chrome
  	// does not pass the time to the animation function

  	if(window.webkitRequestAnimationFrame){
  		// Define the wrapper

  		wrapper = function(time){
  			if(time === undefined){
  				time = +new Date();
  			}
  			self.callback(time);
  		};

  		// Make the switch

  		originalWebkitMethod = window.webkitRequestAnimationFrame;

  		window.webkitRequestAnimationFrame = function(callback, element){
  			self.callback = callback;

  			// Browser calls wrapper; wrapper calls callback

  			originalWebkitMethod(wrapper, element);
  		}
  	} // End Chrome 10 workaround

  	// Workaround for Gecko 2.0, which has a bug in mozRequestAnimationFrame() that restricts animations to 30-40 fps.

  	if(window.mozRequestAnimationFrame){
  		// Check the Gecko verson. Gecko is used by browsers other than Firefox. Gecko 2.0 corresponds to Firefox 4.0.

  		index = userAgent.indexOf('rv:');

  		if(userAgent.indexOf('Gecko') != -1){
  			geckoVersion = userAgent.substr(index + 3, 3);

  			if(geckoVersion === '2.0'){
  				// Forces the return statement to fall through to the setTimeout() function.

  				window.mozRequestAnimationFrame = undefined;
  			}
  		}
  	} // End Gecko 2.0 workaround

  	return (window.requestAnimationFrame ||
  		window.webkitRequestAnimationFrame ||
  		window.mozRequestAnimationFrame ||
  		window.oRequestAnimationFrame ||
  		window.msRequestAnimationFrame ||

  		function(callback, element) {
  			var start;
  			var finish;

  			setTimeout(function(){
  				start = +new Date();
  				callback(start);
  				finish = +new Date();

  				self.timeout = 1000 / 60 - (finish - start);
  			}, self.timeout);
  		}
    );
  }
};
