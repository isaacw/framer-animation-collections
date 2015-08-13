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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvd2VpbmhhdXMvc3JjL2ZyYW1lci1hbmltYXRpb24tY29sbGVjdGlvbnMvZXhhbXBsZXMvZHluYW1pYy1zZXF1ZW5jZS5mcmFtZXIvbW9kdWxlcy9BbmltYXRpb25TZXF1ZW5jZS5jb2ZmZWUiLCIvVXNlcnMvd2VpbmhhdXMvc3JjL2ZyYW1lci1hbmltYXRpb24tY29sbGVjdGlvbnMvZXhhbXBsZXMvZHluYW1pYy1zZXF1ZW5jZS5mcmFtZXIvbW9kdWxlcy9BbmltYXRpb25TZXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDT0EsSUFBQTs7NkJBQUE7O0FBQUEsT0FBYSxDQUFDO0FBRWIsdUNBQUEsQ0FBQTs7QUFBYSxFQUFBLDJCQUFDLE9BQUQsR0FBQTtBQUNaLFFBQUEsdUJBQUE7O01BRGEsVUFBVTtLQUN2QjtBQUFBLHFDQUFBLENBQUE7QUFBQSx1Q0FBQSxDQUFBO0FBQUEsdUNBQUEsQ0FBQTtBQUFBLDZEQUFBLENBQUE7QUFBQSwyQ0FBQSxDQUFBO0FBQUEsdUNBQUEsQ0FBQTtBQUFBLG1DQUFBLENBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixFQUFwQixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsaUJBQUQsR0FBcUIsSUFEckIsQ0FBQTtBQUVBO0FBQUEsU0FBQSxRQUFBO3lCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsR0FBRCxDQUFLLFNBQUwsQ0FBQSxDQUFBO0FBQUEsS0FGQTtBQUFBLElBR0EsSUFBQyxDQUFBLE1BQUQsNENBQTJCLEtBSDNCLENBRFk7RUFBQSxDQUFiOztBQUFBLDhCQU1BLEdBQUEsR0FBSyxTQUFDLFNBQUQsRUFBWSxLQUFaLEdBQUE7QUFHSixRQUFBLHVCQUFBO0FBQUEsSUFBQSxTQUFTLENBQUMsSUFBVixDQUFBLENBQUEsQ0FBQTtBQUFBLElBR0Es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QXhDLEVBRFk7RUFBQSxDQTVCYixDQUFBOztBQUFBLHlCQStCQSxLQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ04sUUFBQSxzQkFBQTtBQUFBO0FBQUEsU0FBQSxxQ0FBQTt5QkFBQTtBQUNDLE1BQUEsU0FBUyxDQUFDLEtBQVYsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLFNBQVMsQ0FBQyxXQUFWLEdBQXdCLElBRHhCLENBREQ7QUFBQSxLQUFBO1dBR0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsY0FBYixFQUpNO0VBQUEsQ0EvQlAsQ0FBQTs7QUFBQSx5QkFxQ0EsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNMLFFBQUEsc0JBQUE7QUFBQTtBQUFBLFNBQUEscUNBQUE7eUJBQUE7QUFDQyxNQUFBLFNBQVMsQ0FBQyxJQUFWLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxTQUFTLENBQUMsV0FBVixHQUF3QixLQUR4QixDQUREO0FBQUEsS0FBQTtXQUdBLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLGFBQWIsRUFKSztFQUFBLENBckNOLENBQUE7O3NCQUFBOztHQUZrQyxNQUFNLENBQUMsYUFBMUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIEFuaW1hdGlvbiBTZXF1ZW5jZVxuIyBNYW5hZ2VzIGEgc2VxdWVuY2Ugb2YgQW5pbWF0aW9uc1xuIyBcbiMgYnkgSXNhYWMgV2VpbmhhdXNlblxuIyBodHRwOi8vaXNhYWN3LmNvbVxuXG5cbmNsYXNzIGV4cG9ydHMuQW5pbWF0aW9uU2VxdWVuY2UgZXh0ZW5kcyBGcmFtZXIuRXZlbnRFbWl0dGVyXG5cdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX2FuaW1hdGlvbnNBcnJheSA9IFtdXG5cdFx0QF9jdXJyZW50QW5pbWF0aW9uID0gbnVsbFxuXHRcdEBhZGQoYW5pbWF0aW9uKSBmb3IgaywgYW5pbWF0aW9uIG9mIG9wdGlvbnMuYW5pbWF0aW9uc1xuXHRcdEByZXBlYXQgPSBvcHRpb25zLnJlcGVhdCA/IGZhbHNlXG5cdFxuXHRhZGQ6IChhbmltYXRpb24sIGluZGV4KSA9PlxuXG5cdFx0IyBFbnN1cmUgdGhlIGFuaW1hdGlvbiBpcyBzdG9wcGVkIChuZWVkZWQgZm9yIHdoZW4gcGFzc2VkIHZpYSB0aGUgbGF5ZXIuYW5pbWF0ZSBtZXRob2QpXG5cdFx0YW5pbWF0aW9uLnN0b3AoKVxuXHRcdFxuXHRcdCMgU2V0IGFuaW1hdGlvbiBjYWxsYmFja1xuXHRcdGFuaW1hdGlvbi5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0QF91cGRhdGUoKVxuXHRcdFxuXHRcdCMgTm8gdmFsaWQgaW5kZXggd2FzIHBhc3NlZD9cblx0XHR1bmxlc3MgaW5kZXg/IGFuZCBpbmRleCA8PSBAX2FuaW1hdGlvbnNBcnJheS5sZW5ndGhcblx0XHRcdGluZGV4ID0gQF9hbmltYXRpb25zQXJyYXkubGVuZ3RoXG5cdFx0XG5cdFx0IyBJbnNlcnQgYW5pbWF0aW9uIGludG8gaXRzIHBvc2l0aW9uXG5cdFx0QF9hbmltYXRpb25zQXJyYXkuc3BsaWNlIGluZGV4LCAwLCBhbmltYXRpb25cblx0XHRcblx0XHQjIFVwZGF0ZSBJbmRpY2VzIChhbmltYXRpb25zIG5lZWQgdG8gdHJhY2sgdGhlaXIgb3duIHBvc2l0aW9uKVxuXHRcdGFuaW1hdGlvbi5pbmRleCA9IGkgZm9yIGFuaW1hdGlvbiwgaSBpbiBAX2FuaW1hdGlvbnNBcnJheVxuXHRcdFxuXHRcblx0ZnJvbnQ6IChhbmltYXRpb24pID0+XG5cdFx0QGFkZCBhbmltYXRpb24sIDBcblx0XHQjIEBfdW5zaGlmdCBhbmltYXRpb25cblx0XHRcblx0X3VwZGF0ZTogPT5cblx0XHRcblx0XHQjIEVuZCBvZiBzZXF1ZW5jZT8gRG8gbm90IHJlc3RhcnQ/XG5cdFx0aWYgQF9pc0VuZE9mU2VxdWVuY2UoKSBhbmQgQHJlcGVhdCBpcyBmYWxzZVxuXHRcdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvbkVuZFxuXHRcdFx0XG5cdFx0IyBOZXZlcm1pbmQsIG1vdmUgYWxvbmcuLi5cblx0XHRlbHNlXG5cdFx0XHQjIFN0YXJ0IG5leHQgYW5pbWF0aW9uIChvciByZXN0YXJ0IHNlcXVlbmNlKVxuXHRcdFx0QF9uZXh0KCkuc3RhcnQoKVxuXHRcdFx0XG5cdFx0IyAoUmUpU2V0IGN1cnJlbnQgQW5pbWF0aW9uXG5cdFx0QF9jdXJyZW50QW5pbWF0aW9uID0gQF9uZXh0KClcblxuXG5cdF9pc0VuZE9mU2VxdWVuY2U6IChhbmltYXRpb24gPSBAX2N1cnJlbnRBbmltYXRpb24pID0+XG5cdFx0YW5pbWF0aW9uLmluZGV4IGlzIEBfYW5pbWF0aW9uc0FycmF5Lmxlbmd0aCAtIDFcblx0XHRcblx0X25leHQ6ID0+XG5cdFx0QF9hbmltYXRpb25zQXJyYXlbQF9jdXJyZW50QW5pbWF0aW9uLmluZGV4ICsgMV0gPyBAX2FuaW1hdGlvbnNBcnJheVswXVxuXHRcblx0c3RhcnQ6ID0+XG5cdFx0aWYgQF9hbmltYXRpb25zQXJyYXkubGVuZ3RoID4gMFxuXHRcdFx0IyBTZXQgX2N1cnJlbnRBbmltYXRpb24gaWYgbm90IHNldFxuXHRcdFx0dW5sZXNzIEBfY3VycmVudEFuaW1hdGlvbj9cblx0XHRcdFx0QF9jdXJyZW50QW5pbWF0aW9uID0gQF9hbmltYXRpb25zQXJyYXlbMF1cblx0XHRcdEBfY3VycmVudEFuaW1hdGlvbi5zdGFydCgpXG5cdFx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RhcnRcblx0XHRcblx0c3RvcDogPT5cblx0XHRAX2N1cnJlbnRBbmltYXRpb24uc3RvcCgpXG5cdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvblN0b3BcblxuXG5cbiIsIiMgQW5pbWF0aW9uIFNldFxuIyBNYW5hZ2VzIGEgc2V0IG9mIEFuaW1hdGlvbnNcbiMgXG4jIGJ5IElzYWFjIFdlaW5oYXVzZW5cbiMgaHR0cDovL2lzYWFjdy5jb21cblxuXG5jbGFzcyBleHBvcnRzLkFuaW1hdGlvblNldCBleHRlbmRzIEZyYW1lci5FdmVudEVtaXR0ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfYW5pbWF0aW9uc0FycmF5ID0gW11cblx0XHRAYWRkKGFuaW1hdGlvbikgZm9yIGssIGFuaW1hdGlvbiBvZiBvcHRpb25zLmFuaW1hdGlvbnNcblx0XHRAcmVwZWF0ID0gb3B0aW9ucy5yZXBlYXQgPyBmYWxzZVxuXHRcdFx0XG5cdGFkZDogKGFuaW1hdGlvbikgPT5cblx0XHRcblx0XHQjIEVuc3VyZSB0aGUgYW5pbWF0aW9uIGlzIHN0b3BwZWQgKG5lZWRlZCB3aGVuIHBhc3NlZCB2aWEgdGhlIGxheWVyLmFuaW1hdGUgbWV0aG9kKVxuXHRcdGFuaW1hdGlvbi5zdG9wKClcblx0XHRcblx0XHQjIEhhdmUgdGhlIGFuaW1hdGlvbiB0cmFjayBpdHMgYW5pbWF0aW5nIHN0YXRlXG5cdFx0YW5pbWF0aW9uLmlzQW5pbWF0aW5nID0gZmFsc2Vcblx0XHRcblx0XHRhbmltYXRpb24ub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdGFuaW1hdGlvbi5pc0FuaW1hdGluZyA9IGZhbHNlXG5cdFx0XHRAX3VwZGF0ZSgpXG5cdFx0XHRcblx0XHRAX2FuaW1hdGlvbnNBcnJheS5wdXNoIGFuaW1hdGlvblxuXHRcblx0XG5cdF91cGRhdGU6ICgpID0+XG5cdFx0IyBIYXZlIGFsbCBhbmltYXRpb25zIHN0b3BwZWQ/XG5cdFx0aWYgbm90IEBpc0FuaW1hdGluZygpXG5cdFx0XHRpZiBAcmVwZWF0XG5cdFx0XHRcdEBzdGFydCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25FbmRcblx0XHRcblx0aXNBbmltYXRpbmc6ID0+XG5cdFx0Xy5hbnkoQF9hbmltYXRpb25zQXJyYXksIFwiaXNBbmltYXRpbmdcIiwgdHJ1ZSlcblx0XG5cdHN0YXJ0OiA9PlxuXHRcdGZvciBhbmltYXRpb24gaW4gQF9hbmltYXRpb25zQXJyYXlcblx0XHRcdGFuaW1hdGlvbi5zdGFydCgpXG5cdFx0XHRhbmltYXRpb24uaXNBbmltYXRpbmcgPSB0cnVlXG5cdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvblN0YXJ0XG5cdFx0XG5cdHN0b3A6ID0+XG5cdFx0Zm9yIGFuaW1hdGlvbiBpbiBAX2FuaW1hdGlvbnNBcnJheVxuXHRcdFx0YW5pbWF0aW9uLnN0b3AoKVxuXHRcdFx0YW5pbWF0aW9uLmlzQW5pbWF0aW5nID0gZmFsc2Vcblx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uU3RvcCJdfQ==
