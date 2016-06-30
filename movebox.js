/*
 * Movebox with jQuery - 2010-06-18
 * version: 1.1
 * 
 * Copyright (c) 2009 Luiz Paulo
 * Site: http://lppjunior.com
 * 
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */

var movebox = {
	size: 43,
	level: 0,
	moveHistory: [],
	moves: 0, pushes: 0, timer: false, timeOut: 0, startDate: 0,
	dateFormat: /.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/,
	end: false,
	finished: [],
	
	styles: {
		"_": "",
		"#": "limit",
		"-": "back",
		"@": "back box",
		"+": "back target",
		"x": "back target box",
		"&": "back man"
	},
	
	init: function() {
		
		jQuery(document).keydown(movebox.keyDown);
		jQuery(".reload").click(movebox.reload);
		jQuery(".prev_level").click(movebox.prevLevel);
		jQuery(".nex_level").click(movebox.nextLevel);
		jQuery(".undo").click(movebox.undo);
		jQuery(".controls").click(function () {
			jQuery(".nav.controlsDiv").toggle();
		});
		
		jQuery(".left").click(movebox.moveLeft);
		jQuery(".right").click(movebox.moveRight);
		jQuery(".top").click(movebox.moveUp);
		jQuery(".down").click(movebox.moveDown);
		
		movebox.finished.push(movebox.level);
		movebox.reload();
		
		try { jQuery(document).focus(); } catch(e) { /* Do nothing */ }
	},
	
	clearVars: function() {
	
		movebox.started = movebox.end = false;
		movebox.moveHistory = [];
		movebox.moves = movebox.pushes = 0;
		
		movebox.timer = false;
		clearTimeout(movebox.timeOut);
		
		jQuery("#moveValue").html(movebox.moves);
		jQuery("#pushValue").html(movebox.pushes);
		jQuery("#timer").html("00:00:00");
	},
	
	start: function () {
		movebox.startDate = new Date() - new Date(1970, 1, 1, 0, 0, 0, 0);
		movebox.timer = true;
		movebox.dateTimer();
	},
	
	keyDown: function (e) {
		if(movebox.end) { return; }
		
		switch (e.charCode || e.keyCode) {
			case 87: case 38: //w:up
				movebox.moveUp();
				break;
			case 65: case 37: //a:left
				movebox.moveLeft();
				break;
			case 83: case 40: //s:down
				movebox.moveDown();
				break;
			case 68: case 39: //d:right
				movebox.moveRight();
				break;
			case 90: //ctrl+z
				if(e.ctrlKey) movebox.undo();
				break;
			default:
				break;
		}
	},
	
	reload: function () {
		movebox.loadLevel(movebox.level);
	},
	
	prevLevel: function () {
		if(movebox.level > 0)
			movebox.loadLevel(--movebox.level);
	},
	
	nextLevel: function () {
		if(jQuery.inArray(movebox.level + 1, movebox.finished) == -1) {
			alert("The next level is blocked!");
			return;
		}
		
		if(movebox.level < movebox.arena.length -1)
			movebox.loadLevel(++movebox.level);
	},
	
	loadLevel: function (level) {
		movebox.clearVars();
		jQuery("#levelValue").html((level + 1) + "/" + movebox.arena.length);
		
		var arena = movebox.arena[level];
		var table = jQuery("<table/>")
						.attr("id", "moveBoxTable")
						.addClass("size_" + movebox.size)
						.css("width", arena[0].length * movebox.size);
		
		for(var i = 0; i < arena.length; i++) {
			var tr = jQuery("<tr>");
			for(var ii = 0; ii < arena[i].length; ii++) {
				if(arena[i][ii] == "&") movebox.man = [ii, i];
				tr.append(jQuery("<td>").addClass(movebox.styles[arena[i][ii]]));
			}
			table.append(tr);
		}
		jQuery("#movebox").html(table);
	},
	
	moveUp: function() {
		movebox.move([0, -1], "up");
	},
	
	moveDown: function() {
		movebox.move([0, 1], "down");
	},
	
	moveLeft: function() {
		movebox.move([-1, 0], "left");
	},
	
	moveRight: function() {
		movebox.move([1, 0], "right");
	},
	
	//REVER
	undo: function () {
		var length = movebox.moveHistory.length - 1;
		var moveHistory = movebox.moveHistory[length];
		if(moveHistory == undefined) return;
		
		var to = [moveHistory.to[0] * -1, moveHistory.to[1] * -1];
		movebox.move(to, "man", null, true, moveHistory.isMoveBox);
		movebox.moveHistory = movebox.moveHistory.slice(0, length);
	},
	
	move: function (to, target, pos, undo, undoMoveBox) {
		if(!movebox.timer) movebox.start();
		
		movebox.moveExec(to, target, pos, undo, undoMoveBox);
		
		movebox.finish();
	},
	
	//REVER
	moveExec: function (to, target, pos, undo, undoMoveBox) {
		var pos    = (pos != undefined) ? pos : movebox.man;
		var next   = (undo && target == "box") ? to : [pos[0] + to[0],pos[1] + to[1]];
		var target = (target != undefined) ? target : "man";
		
		var posObj = jQuery("#movebox tr:eq(" + pos[1] + ") td:eq(" + pos[0] + ")");
		var toObj  = jQuery("#movebox tr:eq(" + next[1]  + ") td:eq(" + next[0]  + ")");
		
		if(movebox.isLimit(toObj, target)) return false;
		
		var isMoveBox = false;
		
		if(undo && undoMoveBox) {
			movebox.moveExec(pos, "box", [pos[0] - to[0], pos[1] - to[1]], true);
		} else if(toObj.hasClass("box")) {
			if(!movebox.moveExec(to, "box", next)) return false;
			isMoveBox = true;
		}
		
		posObj
			.removeClass(target).removeClass("man")
			.removeClass("up").removeClass("down")
			.removeClass("left").removeClass("right");
		toObj.addClass(target);
		
		if(target != "box") {
			toObj.addClass("man");
			movebox.man = next;
			jQuery("#moveValue").html(undo ? --movebox.moves : ++movebox.moves);
			
			if(undo == undefined) {
				movebox.moveHistory.push({to:to, isMoveBox: isMoveBox});
			}
		} else {
			jQuery("#pushValue").html(undo ? --movebox.pushes : ++movebox.pushes);
		}
		
		return true;
	},
	
	dateTimer: function () {
		if(movebox.end || !movebox.timer) { return; }
		
		var now  = new Date((new Date()) - movebox.startDate.valueOf());
		jQuery("#timer").html(now.toString().replace(movebox.dateFormat, '$1'));
		
		movebox.timeOut = setTimeout(movebox.dateTimer, 1000);
	},
	
	isLimit: function (next, target) {
		if(!next.hasClass('back')) return true;
		if("box" == target && next.hasClass('box')) return true;
		
		return false;
	},
	
	finish: function () {
		if(jQuery("#movebox .target").size() == jQuery("#movebox .box.target").size()) {
			movebox.end = true;
			movebox.finished.push(movebox.level + 1);
			movebox.nextLevel();
		}
	}
}
jQuery(document.body).ready(function () {
	movebox.init();
});