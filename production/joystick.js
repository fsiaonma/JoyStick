var Config = {
	StickV: 1,
	TargetV: 1
};

var JoyStick = function(touchArea) {
	var touchArea = touchArea;
	var targetV = Config.TargetV;
	var stickV = Config.StickV;

	var basePos = null;
	var doTouchStart = null;
	var doTouchMove = null;
	var doTouchEnd = null;

	var isInTouchArea = function(pos) {
		var xVerify = touchArea.x < pos.x && pos.x < touchArea.x + touchArea.width;
		var yVerify = touchArea.x < pos.y && pos.y < touchArea.y + touchArea.height;
		return xVerify && yVerify;
	}

	this.setBasePos = function(pos) {
		if (isInTouchArea(pos)) {
			basePos = {x: pos.x, y: pos.y}
			doTouchStart && doTouchStart();
		}
	}

	this.getDpos = function(pos) {
		if (isInTouchArea(pos)) {
			var dx = pos.x - basePos.x;
			var dy = pos.y - basePos.y;
			var dl = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

			doTouchMove && doTouchMove();

			return {
				stickV: {
					x: stickV * dx / dl,
					y: stickV * dy / dl
				}, 
				targetV: {
					x: targetV * dx / dl,
					y: targetV * dy / dl
				}
				
			}
		}
	}

	this.resetPos = function() {
		doTouchEnd && doTouchEnd();
		basePos = null;
		doTouchStart = null;
		doTouchMove = null;
		doTouchEnd = null;
	}

	this.bindTouchStart = function(func) {
		doTouchStart = func;
	}

	this.bindTouchMove = function(func) {
		doTouchMove = func;
	}

	this.bindTouchEnd = function(func) {
		doTouchEnd = func;
	}
};

(function() {
	var joystick = null;
	JoyStick.getInstance = function(touchArea) {
		if (null == joystick) {
			joystick = new JoyStick(touchArea);
		}
		return joystick;
	}
})();

