require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AnimationSequence":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AnimationSequence = (function(superClass) {
  extend(AnimationSequence, superClass);

  function AnimationSequence(options) {
    var animation, k, ref, ref1;
    if (options == null) {
      options = {};
    }
    this.stop = bind(this.stop, this);
    this.start = bind(this.start, this);
    this._next = bind(this._next, this);
    this._isEndOfSequence = bind(this._isEndOfSequence, this);
    this._update = bind(this._update, this);
    this.add = bind(this.add, this);
    this._animationsArray = [];
    this._currentAnimation = null;
    ref = options.animations;
    for (k in ref) {
      animation = ref[k];
      this.add(animation);
    }
    this.repeat = (ref1 = options.repeat) != null ? ref1 : false;
  }

  AnimationSequence.prototype.add = function(animation) {
    animation.stop();
    animation.index = this._animationsArray.length;
    animation.on(Events.AnimationEnd, (function(_this) {
      return function() {
        return _this._update();
      };
    })(this));
    this._animationsArray.push(animation);
    if (this._animationsArray.length === 1) {
      return this._currentAnimation = this._animationsArray[0];
    }
  };

  AnimationSequence.prototype._update = function() {
    if (this._isEndOfSequence() && this.repeat === false) {
      this.emit(Events.AnimationEnd);
    } else {
      this._next().start();
    }
    return this._currentAnimation = this._next();
  };

  AnimationSequence.prototype._isEndOfSequence = function(animation) {
    if (animation == null) {
      animation = this._currentAnimation;
    }
    return animation.index === this._animationsArray.length - 1;
  };

  AnimationSequence.prototype._next = function() {
    var ref;
    return (ref = this._animationsArray[this._currentAnimation.index + 1]) != null ? ref : this._animationsArray[0];
  };

  AnimationSequence.prototype.start = function() {
    if (this._currentAnimation != null) {
      this._currentAnimation.start();
      return this.emit(Events.AnimationStart);
    }
  };

  AnimationSequence.prototype.stop = function() {
    this._currentAnimation.stop();
    return this.emit(Events.AnimationStop);
  };

  return AnimationSequence;

})(Framer.EventEmitter);



},{}],"AnimationSet":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AnimationSet = (function(superClass) {
  extend(AnimationSet, superClass);

  function AnimationSet(options) {
    var animation, k, ref, ref1;
    if (options == null) {
      options = {};
    }
    this.stop = bind(this.stop, this);
    this.start = bind(this.start, this);
    this.isAnimating = bind(this.isAnimating, this);
    this._update = bind(this._update, this);
    this.add = bind(this.add, this);
    this._animationsArray = [];
    ref = options.animations;
    for (k in ref) {
      animation = ref[k];
      this.add(animation);
    }
    this.repeat = (ref1 = options.repeat) != null ? ref1 : false;
  }

  AnimationSet.prototype.add = function(animation) {
    animation.stop();
    animation.isAnimating = false;
    animation.on(Events.AnimationEnd, (function(_this) {
      return function() {
        animation.isAnimating = false;
        return _this._update();
      };
    })(this));
    return this._animationsArray.push(animation);
  };

  AnimationSet.prototype._update = function() {
    if (!this.isAnimating()) {
      if (this.repeat) {
        return this.start();
      } else {
        return this.emit(Events.AnimationEnd);
      }
    }
  };

  AnimationSet.prototype.isAnimating = function() {
    return _.any(this._animationsArray, "isAnimating", true);
  };

  AnimationSet.prototype.start = function() {
    var animation, i, len, ref;
    ref = this._animationsArray;
    for (i = 0, len = ref.length; i < len; i++) {
      animation = ref[i];
      animation.start();
      animation.isAnimating = true;
    }
    return this.emit(Events.AnimationStart);
  };

  AnimationSet.prototype.stop = function() {
    var animation, i, len, ref;
    ref = this._animationsArray;
    for (i = 0, len = ref.length; i < len; i++) {
      animation = ref[i];
      animation.stop();
      animation.isAnimating = false;
    }
    return this.emit(Events.AnimationStop);
  };

  return AnimationSet;

})(Framer.EventEmitter);



},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaXNhYWN3L3NyYy9mcmFtZXItYW5pbWF0aW9uLWNvbGxlY3Rpb25zL0FuaW1hdGlvbkNoYWluLmZyYW1lci9tb2R1bGVzL0FuaW1hdGlvblNlcXVlbmNlLmNvZmZlZSIsIi9Vc2Vycy9pc2FhY3cvc3JjL2ZyYW1lci1hbmltYXRpb24tY29sbGVjdGlvbnMvQW5pbWF0aW9uQ2hhaW4uZnJhbWVyL21vZHVsZXMvQW5pbWF0aW9uU2V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ09BLElBQUE7OzZCQUFBOztBQUFBLE9BQWEsQ0FBQztBQUViLHVDQUFBLENBQUE7O0FBQWEsRUFBQSwyQkFBQyxPQUFELEdBQUE7QUFDWixRQUFBLHVCQUFBOztNQURhLFVBQVU7S0FDdkI7QUFBQSxxQ0FBQSxDQUFBO0FBQUEsdUNBQUEsQ0FBQTtBQUFBLHVDQUFBLENBQUE7QUFBQSw2REFBQSxDQUFBO0FBQUEsMkNBQUEsQ0FBQTtBQUFBLG1DQUFBLENBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixFQUFwQixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsaUJBQUQsR0FBcUIsSUFEckIsQ0FBQTtBQUVBO0FBQUEsU0FBQSxRQUFBO3lCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsR0FBRCxDQUFLLFNBQUwsQ0FBQSxDQUFBO0FBQUEsS0FGQTtBQUFBLElBR0EsSUFBQyxDQUFBLE1BQUQsNENBQTJCLEtBSDNCLENBRFk7RUFBQSxDQUFiOztBQUFBLDhCQU1BLEdBQUEsR0FBSyxTQUFDLFNBQUQsR0FBQTtBQUdKLElBQUEsU0FBUyxDQUFDLElBQVYsQ0FBQSxDQUFBLENBQUE7QUFBQSxJQUdBLFNBQVMsQ0FBQyxLQUFWLEdBQWtCLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxNQUhwQyxDQUFBO0FBQUEsSUFLQSxTQUFT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QUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxTQUFTLENBQUMsV0FBVixHQUF3QixLQUR4QixDQUREO0FBQUEsS0FBQTtXQUdBLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLGFBQWIsRUFKSztFQUFBLENBckNOLENBQUE7O3NCQUFBOztHQUZrQyxNQUFNLENBQUMsYUFBMUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIEFuaW1hdGlvbiBTZXF1ZW5jZVxuIyBNYW5hZ2VzIGEgc2VxdWVuY2Ugb2YgQW5pbWF0aW9uc1xuIyBcbiMgYnkgSXNhYWMgV2VpbmhhdXNlblxuIyBodHRwOi8vaXNhYWN3LmNvbVxuXG5cbmNsYXNzIGV4cG9ydHMuQW5pbWF0aW9uU2VxdWVuY2UgZXh0ZW5kcyBGcmFtZXIuRXZlbnRFbWl0dGVyXG5cdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX2FuaW1hdGlvbnNBcnJheSA9IFtdXG5cdFx0QF9jdXJyZW50QW5pbWF0aW9uID0gbnVsbFxuXHRcdEBhZGQoYW5pbWF0aW9uKSBmb3IgaywgYW5pbWF0aW9uIG9mIG9wdGlvbnMuYW5pbWF0aW9uc1xuXHRcdEByZXBlYXQgPSBvcHRpb25zLnJlcGVhdCA/IGZhbHNlXG5cdFx0XHRcblx0YWRkOiAoYW5pbWF0aW9uKSA9PlxuXHRcdFxuXHRcdCMgRW5zdXJlIHRoZSBhbmltYXRpb24gaXMgc3RvcHBlZCAobmVlZGVkIGZvciB3aGVuIHBhc3NlZCB2aWEgdGhlIGxheWVyLmFuaW1hdGUgbWV0aG9kKVxuXHRcdGFuaW1hdGlvbi5zdG9wKClcblx0XHRcblx0XHQjIEhhdmUgdGhlIGFuaW1hdGlvbiB0cmFjayBpdCdzIG93biBwb3NpdGlvbiBpbiB0aGUgY2hhaW5cblx0XHRhbmltYXRpb24uaW5kZXggPSBAX2FuaW1hdGlvbnNBcnJheS5sZW5ndGhcblx0XHRcblx0XHRhbmltYXRpb24ub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdEBfdXBkYXRlKClcblx0XHRcdFxuXHRcdEBfYW5pbWF0aW9uc0FycmF5LnB1c2ggYW5pbWF0aW9uXG5cdFx0XG5cdFx0IyBTZXQgX2N1cnJlbnRBbmltYXRpb24gaWYgdGhpcyBpcyB0aGUgZmlyc3QgYW5pbWF0aW9uIGFkZGVkXG5cdFx0aWYgQF9hbmltYXRpb25zQXJyYXkubGVuZ3RoIGlzIDFcblx0XHRcdEBfY3VycmVudEFuaW1hdGlvbiA9IEBfYW5pbWF0aW9uc0FycmF5WzBdXG5cdFx0XG5cdFx0XG5cdF91cGRhdGU6ID0+XG5cdFx0XG5cdFx0IyBFbmQgb2Ygc2VxdWVuY2U/IERvIG5vdCByZXN0YXJ0P1xuXHRcdGlmIEBfaXNFbmRPZlNlcXVlbmNlKCkgYW5kIEByZXBlYXQgaXMgZmFsc2Vcblx0XHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25FbmRcblx0XHRcdFxuXHRcdCMgTmV2ZXJtaW5kLCBtb3ZlIGFsb25nLi4uXG5cdFx0ZWxzZVxuXHRcdFx0IyBTdGFydCBuZXh0IGFuaW1hdGlvbiAob3IgcmVzdGFydCBzZXF1ZW5jZSlcblx0XHRcdEBfbmV4dCgpLnN0YXJ0KClcblx0XHRcdFxuXHRcdCMgKFJlKVNldCBjdXJyZW50IEFuaW1hdGlvblxuXHRcdEBfY3VycmVudEFuaW1hdGlvbiA9IEBfbmV4dCgpXG5cblxuXHRfaXNFbmRPZlNlcXVlbmNlOiAoYW5pbWF0aW9uID0gQF9jdXJyZW50QW5pbWF0aW9uKSA9PlxuXHRcdGFuaW1hdGlvbi5pbmRleCBpcyBAX2FuaW1hdGlvbnNBcnJheS5sZW5ndGggLSAxXG5cdFx0XG5cdF9uZXh0OiA9PlxuXHRcdEBfYW5pbWF0aW9uc0FycmF5W0BfY3VycmVudEFuaW1hdGlvbi5pbmRleCArIDFdID8gQF9hbmltYXRpb25zQXJyYXlbMF1cblx0XG5cdHN0YXJ0OiA9PlxuXHRcdGlmIEBfY3VycmVudEFuaW1hdGlvbj9cblx0XHRcdEBfY3VycmVudEFuaW1hdGlvbi5zdGFydCgpXG5cdFx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RhcnRcblx0XHRcblx0c3RvcDogPT5cblx0XHRAX2N1cnJlbnRBbmltYXRpb24uc3RvcCgpXG5cdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvblN0b3BcblxuXG5cbiIsIiMgQW5pbWF0aW9uIFNldFxuIyBNYW5hZ2VzIGEgc2V0IG9mIEFuaW1hdGlvbnNcbiMgXG4jIGJ5IElzYWFjIFdlaW5oYXVzZW5cbiMgaHR0cDovL2lzYWFjdy5jb21cblxuXG5jbGFzcyBleHBvcnRzLkFuaW1hdGlvblNldCBleHRlbmRzIEZyYW1lci5FdmVudEVtaXR0ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfYW5pbWF0aW9uc0FycmF5ID0gW11cblx0XHRAYWRkKGFuaW1hdGlvbikgZm9yIGssIGFuaW1hdGlvbiBvZiBvcHRpb25zLmFuaW1hdGlvbnNcblx0XHRAcmVwZWF0ID0gb3B0aW9ucy5yZXBlYXQgPyBmYWxzZVxuXHRcdFx0XG5cdGFkZDogKGFuaW1hdGlvbikgPT5cblx0XHRcblx0XHQjIEVuc3VyZSB0aGUgYW5pbWF0aW9uIGlzIHN0b3BwZWQgKG5lZWRlZCB3aGVuIHBhc3NlZCB2aWEgdGhlIGxheWVyLmFuaW1hdGUgbWV0aG9kKVxuXHRcdGFuaW1hdGlvbi5zdG9wKClcblx0XHRcblx0XHQjIEhhdmUgdGhlIGFuaW1hdGlvbiB0cmFjayBpdHMgYW5pbWF0aW5nIHN0YXRlXG5cdFx0YW5pbWF0aW9uLmlzQW5pbWF0aW5nID0gZmFsc2Vcblx0XHRcblx0XHRhbmltYXRpb24ub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdGFuaW1hdGlvbi5pc0FuaW1hdGluZyA9IGZhbHNlXG5cdFx0XHRAX3VwZGF0ZSgpXG5cdFx0XHRcblx0XHRAX2FuaW1hdGlvbnNBcnJheS5wdXNoIGFuaW1hdGlvblxuXHRcblx0XG5cdF91cGRhdGU6ICgpID0+XG5cdFx0IyBIYXZlIGFsbCBhbmltYXRpb25zIHN0b3BwZWQ/XG5cdFx0aWYgbm90IEBpc0FuaW1hdGluZygpXG5cdFx0XHRpZiBAcmVwZWF0XG5cdFx0XHRcdEBzdGFydCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25FbmRcblx0XHRcblx0aXNBbmltYXRpbmc6ID0+XG5cdFx0Xy5hbnkoQF9hbmltYXRpb25zQXJyYXksIFwiaXNBbmltYXRpbmdcIiwgdHJ1ZSlcblx0XG5cdHN0YXJ0OiA9PlxuXHRcdGZvciBhbmltYXRpb24gaW4gQF9hbmltYXRpb25zQXJyYXlcblx0XHRcdGFuaW1hdGlvbi5zdGFydCgpXG5cdFx0XHRhbmltYXRpb24uaXNBbmltYXRpbmcgPSB0cnVlXG5cdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvblN0YXJ0XG5cdFx0XG5cdHN0b3A6ID0+XG5cdFx0Zm9yIGFuaW1hdGlvbiBpbiBAX2FuaW1hdGlvbnNBcnJheVxuXHRcdFx0YW5pbWF0aW9uLnN0b3AoKVxuXHRcdFx0YW5pbWF0aW9uLmlzQW5pbWF0aW5nID0gZmFsc2Vcblx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RvcCJdfQ==
