var JoyStick = function(touchArea) {
	var touchArea = touchArea;
	var targetV = 1;
	var stickV = 1;

	var basePos = null;

	var isInTouchArea = function(pos) {
		var xVerify = touchArea.x < pos.x && pos.x < touchArea.x + touchArea.width;
		var yVerify = touchArea.x < pos.y && pos.y < touchArea.y + touchArea.height;
		return xVerify && yVerify;
	}

	this.setBasePos = function(pos) {
		if (isInTouchArea(pos)) {
			basePos = {x: pos.x, y: pos.y}
		}
		return basePos;
	}

	this.getDpos = function(pos) {
		var res = null;
		if (isInTouchArea(pos)) {
			var dx = pos.x - basePos.x;
			var dy = pos.y - basePos.y;
			var dl = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

			if (dl > 0) {
				res = {
					stick: {
						vX: stickV * dx / dl,
						vY: stickV * dy / dl
					}, 
					target: {
						vX: targetV * dx / dl,
						vY: targetV * dy / dl
					}
					
				}
			}
			
		}
		return res;
	}

	this.resetPos = function() {
		basePos = null;
	}

	this.setTargetV = function(v) {
		targetV = v;
	}

	this.setStickV = function(v) {
		stickV = v;
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

