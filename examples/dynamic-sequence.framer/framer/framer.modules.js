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
    this.front = bind(this.front, this);
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

  AnimationSequence.prototype.add = function(animation, index) {
    var i, j, len, ref, results;
    animation.stop();
    animation.on(Events.AnimationEnd, (function(_this) {
      return function() {
        return _this._update();
      };
    })(this));
    if (!((index != null) && index <= this._animationsArray.length)) {
      index = this._animationsArray.length;
    }
    this._animationsArray.splice(index, 0, animation);
    ref = this._animationsArray;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      animation = ref[i];
      results.push(animation.index = i);
    }
    return results;
  };

  AnimationSequence.prototype.front = function(animation) {
    return this.add(animation, 0);
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
    if (this._animationsArray.length > 0) {
      if (this._currentAnimation == null) {
        this._currentAnimation = this._animationsArray[0];
      }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaXNhYWN3L3NyYy9mcmFtZXItYW5pbWF0aW9uLWNvbGxlY3Rpb25zL2V4YW1wbGVzL2R5bmFtaWMtc2VxdWVuY2UuZnJhbWVyL21vZHVsZXMvQW5pbWF0aW9uU2VxdWVuY2UuY29mZmVlIiwiL1VzZXJzL2lzYWFjdy9zcmMvZnJhbWVyLWFuaW1hdGlvbi1jb2xsZWN0aW9ucy9leGFtcGxlcy9keW5hbWljLXNlcXVlbmNlLmZyYW1lci9tb2R1bGVzL0FuaW1hdGlvblNldC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNPQSxJQUFBOzs2QkFBQTs7QUFBQSxPQUFhLENBQUM7QUFFYix1Q0FBQSxDQUFBOztBQUFhLEVBQUEsMkJBQUMsT0FBRCxHQUFBO0FBQ1osUUFBQSx1QkFBQTs7TUFEYSxVQUFVO0tBQ3ZCO0FBQUEscUNBQUEsQ0FBQTtBQUFBLHVDQUFBLENBQUE7QUFBQSx1Q0FBQSxDQUFBO0FBQUEsNkRBQUEsQ0FBQTtBQUFBLDJDQUFBLENBQUE7QUFBQSx1Q0FBQSxDQUFBO0FBQUEsbUNBQUEsQ0FBQTtBQUFBLElBQUEsSUFBQyxDQUFBLGdCQUFELEdBQW9CLEVBQXBCLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxpQkFBRCxHQUFxQixJQURyQixDQUFBO0FBRUE7QUFBQSxTQUFBLFFBQUE7eUJBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxHQUFELENBQUssU0FBTCxDQUFBLENBQUE7QUFBQSxLQUZBO0FBQUEsSUFHQSxJQUFDLENBQUEsTUFBRCw0Q0FBMkIsS0FIM0IsQ0FEWTtFQUFBLENBQWI7O0FBQUEsOEJBTUEsR0FBQSxHQUFLLFNBQUMsU0FBRCxFQUFZLEtBQVosR0FBQTtBQUdKLFFBQUEsdUJBQUE7QUFBQSxJQUFBLFNBQVMsQ0FBQyxJQUFWLENBQUEsQ0FBQSxDQUFBO0FBQUEsSUFHQSxTQUFT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RUFEWTtFQUFBLENBNUJiLENBQUE7O0FBQUEseUJBK0JBLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDTixRQUFBLHNCQUFBO0FBQUE7QUFBQSxTQUFBLHFDQUFBO3lCQUFBO0FBQ0MsTUFBQSxTQUFTLENBQUMsS0FBVixDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsU0FBUyxDQUFDLFdBQVYsR0FBd0IsSUFEeEIsQ0FERDtBQUFBLEtBQUE7V0FHQSxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxjQUFiLEVBSk07RUFBQSxDQS9CUCxDQUFBOztBQUFBLHlCQXFDQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0wsUUFBQSxzQkFBQTtBQUFBO0FBQUEsU0FBQSxxQ0FBQTt5QkFBQTtBQUNDLE1BQUEsU0FBUyxDQUFDLElBQVYsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLFNBQVMsQ0FBQyxXQUFWLEdBQXdCLEtBRHhCLENBREQ7QUFBQSxLQUFBO1dBR0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsYUFBYixFQUpLO0VBQUEsQ0FyQ04sQ0FBQTs7c0JBQUE7O0dBRmtDLE1BQU0sQ0FBQyxhQUExQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgQW5pbWF0aW9uIFNlcXVlbmNlXG4jIE1hbmFnZXMgYSBzZXF1ZW5jZSBvZiBBbmltYXRpb25zXG4jIFxuIyBieSBJc2FhYyBXZWluaGF1c2VuXG4jIGh0dHA6Ly9pc2FhY3cuY29tXG5cblxuY2xhc3MgZXhwb3J0cy5BbmltYXRpb25TZXF1ZW5jZSBleHRlbmRzIEZyYW1lci5FdmVudEVtaXR0ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfYW5pbWF0aW9uc0FycmF5ID0gW11cblx0XHRAX2N1cnJlbnRBbmltYXRpb24gPSBudWxsXG5cdFx0QGFkZChhbmltYXRpb24pIGZvciBrLCBhbmltYXRpb24gb2Ygb3B0aW9ucy5hbmltYXRpb25zXG5cdFx0QHJlcGVhdCA9IG9wdGlvbnMucmVwZWF0ID8gZmFsc2Vcblx0XG5cdGFkZDogKGFuaW1hdGlvbiwgaW5kZXgpID0+XG5cblx0XHQjIEVuc3VyZSB0aGUgYW5pbWF0aW9uIGlzIHN0b3BwZWQgKG5lZWRlZCBmb3Igd2hlbiBwYXNzZWQgdmlhIHRoZSBsYXllci5hbmltYXRlIG1ldGhvZClcblx0XHRhbmltYXRpb24uc3RvcCgpXG5cdFx0XG5cdFx0IyBTZXQgYW5pbWF0aW9uIGNhbGxiYWNrXG5cdFx0YW5pbWF0aW9uLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRAX3VwZGF0ZSgpXG5cdFx0XG5cdFx0IyBObyB2YWxpZCBpbmRleCB3YXMgcGFzc2VkP1xuXHRcdHVubGVzcyBpbmRleD8gYW5kIGluZGV4IDw9IEBfYW5pbWF0aW9uc0FycmF5Lmxlbmd0aFxuXHRcdFx0aW5kZXggPSBAX2FuaW1hdGlvbnNBcnJheS5sZW5ndGhcblx0XHRcblx0XHQjIEluc2VydCBhbmltYXRpb24gaW50byBpdHMgcG9zaXRpb25cblx0XHRAX2FuaW1hdGlvbnNBcnJheS5zcGxpY2UgaW5kZXgsIDAsIGFuaW1hdGlvblxuXHRcdFxuXHRcdCMgVXBkYXRlIEluZGljZXMgKGFuaW1hdGlvbnMgbmVlZCB0byB0cmFjayB0aGVpciBvd24gcG9zaXRpb24pXG5cdFx0YW5pbWF0aW9uLmluZGV4ID0gaSBmb3IgYW5pbWF0aW9uLCBpIGluIEBfYW5pbWF0aW9uc0FycmF5XG5cdFx0XG5cdFxuXHRmcm9udDogKGFuaW1hdGlvbikgPT5cblx0XHRAYWRkIGFuaW1hdGlvbiwgMFxuXHRcdCMgQF91bnNoaWZ0IGFuaW1hdGlvblxuXHRcdFxuXHRfdXBkYXRlOiA9PlxuXHRcdFxuXHRcdCMgRW5kIG9mIHNlcXVlbmNlPyBEbyBub3QgcmVzdGFydD9cblx0XHRpZiBAX2lzRW5kT2ZTZXF1ZW5jZSgpIGFuZCBAcmVwZWF0IGlzIGZhbHNlXG5cdFx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uRW5kXG5cdFx0XHRcblx0XHQjIE5ldmVybWluZCwgbW92ZSBhbG9uZy4uLlxuXHRcdGVsc2Vcblx0XHRcdCMgU3RhcnQgbmV4dCBhbmltYXRpb24gKG9yIHJlc3RhcnQgc2VxdWVuY2UpXG5cdFx0XHRAX25leHQoKS5zdGFydCgpXG5cdFx0XHRcblx0XHQjIChSZSlTZXQgY3VycmVudCBBbmltYXRpb25cblx0XHRAX2N1cnJlbnRBbmltYXRpb24gPSBAX25leHQoKVxuXG5cblx0X2lzRW5kT2ZTZXF1ZW5jZTogKGFuaW1hdGlvbiA9IEBfY3VycmVudEFuaW1hdGlvbikgPT5cblx0XHRhbmltYXRpb24uaW5kZXggaXMgQF9hbmltYXRpb25zQXJyYXkubGVuZ3RoIC0gMVxuXHRcdFxuXHRfbmV4dDogPT5cblx0XHRAX2FuaW1hdGlvbnNBcnJheVtAX2N1cnJlbnRBbmltYXRpb24uaW5kZXggKyAxXSA/IEBfYW5pbWF0aW9uc0FycmF5WzBdXG5cdFxuXHRzdGFydDogPT5cblx0XHRpZiBAX2FuaW1hdGlvbnNBcnJheS5sZW5ndGggPiAwXG5cdFx0XHQjIFNldCBfY3VycmVudEFuaW1hdGlvbiBpZiBub3Qgc2V0XG5cdFx0XHR1bmxlc3MgQF9jdXJyZW50QW5pbWF0aW9uP1xuXHRcdFx0XHRAX2N1cnJlbnRBbmltYXRpb24gPSBAX2FuaW1hdGlvbnNBcnJheVswXVxuXHRcdFx0QF9jdXJyZW50QW5pbWF0aW9uLnN0YXJ0KClcblx0XHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25TdGFydFxuXHRcdFxuXHRzdG9wOiA9PlxuXHRcdEBfY3VycmVudEFuaW1hdGlvbi5zdG9wKClcblx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RvcFxuXG5cblxuIiwiIyBBbmltYXRpb24gU2V0XG4jIE1hbmFnZXMgYSBzZXQgb2YgQW5pbWF0aW9uc1xuIyBcbiMgYnkgSXNhYWMgV2VpbmhhdXNlblxuIyBodHRwOi8vaXNhYWN3LmNvbVxuXG5cbmNsYXNzIGV4cG9ydHMuQW5pbWF0aW9uU2V0IGV4dGVuZHMgRnJhbWVyLkV2ZW50RW1pdHRlclxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9hbmltYXRpb25zQXJyYXkgPSBbXVxuXHRcdEBhZGQoYW5pbWF0aW9uKSBmb3IgaywgYW5pbWF0aW9uIG9mIG9wdGlvbnMuYW5pbWF0aW9uc1xuXHRcdEByZXBlYXQgPSBvcHRpb25zLnJlcGVhdCA/IGZhbHNlXG5cdFx0XHRcblx0YWRkOiAoYW5pbWF0aW9uKSA9PlxuXHRcdFxuXHRcdCMgRW5zdXJlIHRoZSBhbmltYXRpb24gaXMgc3RvcHBlZCAobmVlZGVkIHdoZW4gcGFzc2VkIHZpYSB0aGUgbGF5ZXIuYW5pbWF0ZSBtZXRob2QpXG5cdFx0YW5pbWF0aW9uLnN0b3AoKVxuXHRcdFxuXHRcdCMgSGF2ZSB0aGUgYW5pbWF0aW9uIHRyYWNrIGl0cyBhbmltYXRpbmcgc3RhdGVcblx0XHRhbmltYXRpb24uaXNBbmltYXRpbmcgPSBmYWxzZVxuXHRcdFxuXHRcdGFuaW1hdGlvbi5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0YW5pbWF0aW9uLmlzQW5pbWF0aW5nID0gZmFsc2Vcblx0XHRcdEBfdXBkYXRlKClcblx0XHRcdFxuXHRcdEBfYW5pbWF0aW9uc0FycmF5LnB1c2ggYW5pbWF0aW9uXG5cdFxuXHRcblx0X3VwZGF0ZTogKCkgPT5cblx0XHQjIEhhdmUgYWxsIGFuaW1hdGlvbnMgc3RvcHBlZD9cblx0XHRpZiBub3QgQGlzQW5pbWF0aW5nKClcblx0XHRcdGlmIEByZXBlYXRcblx0XHRcdFx0QHN0YXJ0KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvbkVuZFxuXHRcdFxuXHRpc0FuaW1hdGluZzogPT5cblx0XHRfLmFueShAX2FuaW1hdGlvbnNBcnJheSwgXCJpc0FuaW1hdGluZ1wiLCB0cnVlKVxuXHRcblx0c3RhcnQ6ID0+XG5cdFx0Zm9yIGFuaW1hdGlvbiBpbiBAX2FuaW1hdGlvbnNBcnJheVxuXHRcdFx0YW5pbWF0aW9uLnN0YXJ0KClcblx0XHRcdGFuaW1hdGlvbi5pc0FuaW1hdGluZyA9IHRydWVcblx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RhcnRcblx0XHRcblx0c3RvcDogPT5cblx0XHRmb3IgYW5pbWF0aW9uIGluIEBfYW5pbWF0aW9uc0FycmF5XG5cdFx0XHRhbmltYXRpb24uc3RvcCgpXG5cdFx0XHRhbmltYXRpb24uaXNBbmltYXRpbmcgPSBmYWxzZVxuXHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25TdG9wIl19
