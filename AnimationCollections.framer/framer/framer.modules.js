require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AnimationSequence":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AnimationSequence = (function(superClass) {
  extend(AnimationSequence, superClass);

  function AnimationSequence(options) {
    var animation, j, k, len, ref, ref1, ref2;
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
    if (_.isArray(options.animations)) {
      print("array!");
      ref = options.animations;
      for (k = j = 0, len = ref.length; j < len; k = ++j) {
        animation = ref[k];
        this.add(animation);
      }
    } else {
      ref1 = options.animations;
      for (k in ref1) {
        animation = ref1[k];
        this.add(animation);
      }
    }
    this.repeat = (ref2 = options.repeat) != null ? ref2 : false;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvd2VpbmhhdXMvc3JjL2ZyYW1lci1hbmltYXRpb24tY29sbGVjdGlvbnMvQW5pbWF0aW9uQ29sbGVjdGlvbnMuZnJhbWVyL21vZHVsZXMvQW5pbWF0aW9uU2VxdWVuY2UuY29mZmVlIiwiL1VzZXJzL3dlaW5oYXVzL3NyYy9mcmFtZXItYW5pbWF0aW9uLWNvbGxlY3Rpb25zL0FuaW1hdGlvbkNvbGxlY3Rpb25zLmZyYW1lci9tb2R1bGVzL0FuaW1hdGlvblNldC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNPQSxJQUFBOzs7O0FBQU0sT0FBTyxDQUFDOzs7RUFFQSwyQkFBQyxPQUFEO0FBQ1osUUFBQTs7TUFEYSxVQUFVOzs7Ozs7Ozs7SUFDdkIsSUFBQyxDQUFBLGdCQUFELEdBQW9CO0lBQ3BCLElBQUMsQ0FBQSxpQkFBRCxHQUFxQjtJQUNyQixJQUFHLENBQUMsQ0FBQyxPQUFGLENBQVUsT0FBTyxDQUFDLFVBQWxCLENBQUg7TUFDQyxLQUFBLENBQU0sUUFBTjtBQUNBO0FBQUEsV0FBQSw2Q0FBQTs7UUFBQSxJQUFDLENBQUEsR0FBRCxDQUFLLFNBQUw7QUFBQSxPQUZEO0tBQUEsTUFBQTtBQUlDO0FBQUEsV0FBQSxTQUFBOztRQUFBLElBQUMsQ0FBQSxHQUFELENBQUssU0FBTDtBQUFBLE9BSkQ7O0lBS0EsSUFBQyxDQUFBLE1BQUQsNENBQTJCO0VBUmY7OzhCQVViLEdBQUEsR0FBSyxTQUFDLFNBQUQsRUFBWSxLQUFaO0FBR0osUUFBQTtJQUFBLFNBQVMsQ0FBQyxJQUFWLENBQUE7SUFHQSxTQUFTLENBQUMsRUFBVixDQUFhLE1BQU0sQ0FBQyxZQUFwQixFQUFrQyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFDakMsS0FBQyxDQUFBLE9BQUQsQ0FBQTtNQURpQztJQUFBLENBQUEsQ0FBQSxDQUFB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RUFGUTs7eUJBUVQsV0FBQSxHQUFhLFNBQUE7V0FDWixDQUFDLENBQUMsR0FBRixDQUFNLElBQUMsQ0FBQSxnQkFBUCxFQUF5QixhQUF6QixFQUF3QyxJQUF4QztFQURZOzt5QkFHYixLQUFBLEdBQU8sU0FBQTtBQUNOLFFBQUE7QUFBQTtBQUFBLFNBQUEscUNBQUE7O01BQ0MsU0FBUyxDQUFDLEtBQVYsQ0FBQTtNQUNBLFNBQVMsQ0FBQyxXQUFWLEdBQXdCO0FBRnpCO1dBR0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsY0FBYjtFQUpNOzt5QkFNUCxJQUFBLEdBQU0sU0FBQTtBQUNMLFFBQUE7QUFBQTtBQUFBLFNBQUEscUNBQUE7O01BQ0MsU0FBUyxDQUFDLElBQVYsQ0FBQTtNQUNBLFNBQVMsQ0FBQyxXQUFWLEdBQXdCO0FBRnpCO1dBR0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsYUFBYjtFQUpLOzs7O0dBdkM0QixNQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBbmltYXRpb24gU2VxdWVuY2VcbiMgTWFuYWdlcyBhIHNlcXVlbmNlIG9mIEFuaW1hdGlvbnNcbiMgXG4jIGJ5IElzYWFjIFdlaW5oYXVzZW5cbiMgaHR0cDovL2lzYWFjdy5jb21cblxuXG5jbGFzcyBleHBvcnRzLkFuaW1hdGlvblNlcXVlbmNlIGV4dGVuZHMgRnJhbWVyLkV2ZW50RW1pdHRlclxuXHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9hbmltYXRpb25zQXJyYXkgPSBbXVxuXHRcdEBfY3VycmVudEFuaW1hdGlvbiA9IG51bGxcblx0XHRpZiBfLmlzQXJyYXkgb3B0aW9ucy5hbmltYXRpb25zXG5cdFx0XHRwcmludCBcImFycmF5IVwiXG5cdFx0XHRAYWRkKGFuaW1hdGlvbikgZm9yIGFuaW1hdGlvbiwgayBpbiBvcHRpb25zLmFuaW1hdGlvbnNcblx0XHRlbHNlXG5cdFx0XHRAYWRkKGFuaW1hdGlvbikgZm9yIGssIGFuaW1hdGlvbiBvZiBvcHRpb25zLmFuaW1hdGlvbnNcblx0XHRAcmVwZWF0ID0gb3B0aW9ucy5yZXBlYXQgPyBmYWxzZVxuXHRcblx0YWRkOiAoYW5pbWF0aW9uLCBpbmRleCkgPT5cblxuXHRcdCMgRW5zdXJlIHRoZSBhbmltYXRpb24gaXMgc3RvcHBlZCAobmVlZGVkIGZvciB3aGVuIHBhc3NlZCB2aWEgdGhlIGxheWVyLmFuaW1hdGUgbWV0aG9kKVxuXHRcdGFuaW1hdGlvbi5zdG9wKClcblx0XHRcblx0XHQjIFNldCBhbmltYXRpb24gY2FsbGJhY2tcblx0XHRhbmltYXRpb24ub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdEBfdXBkYXRlKClcblx0XHRcblx0XHQjIE5vIHZhbGlkIGluZGV4IHdhcyBwYXNzZWQ/XG5cdFx0dW5sZXNzIGluZGV4PyBhbmQgaW5kZXggPD0gQF9hbmltYXRpb25zQXJyYXkubGVuZ3RoXG5cdFx0XHRpbmRleCA9IEBfYW5pbWF0aW9uc0FycmF5Lmxlbmd0aFxuXHRcdFxuXHRcdCMgSW5zZXJ0IGFuaW1hdGlvbiBpbnRvIGl0cyBwb3NpdGlvblxuXHRcdEBfYW5pbWF0aW9uc0FycmF5LnNwbGljZSBpbmRleCwgMCwgYW5pbWF0aW9uXG5cdFx0XG5cdFx0IyBVcGRhdGUgSW5kaWNlcyAoYW5pbWF0aW9ucyBuZWVkIHRvIHRyYWNrIHRoZWlyIG93biBwb3NpdGlvbilcblx0XHRhbmltYXRpb24uaW5kZXggPSBpIGZvciBhbmltYXRpb24sIGkgaW4gQF9hbmltYXRpb25zQXJyYXlcblx0XHRcblx0XG5cdGZyb250OiAoYW5pbWF0aW9uKSA9PlxuXHRcdEBhZGQgYW5pbWF0aW9uLCAwXG5cdFx0IyBAX3Vuc2hpZnQgYW5pbWF0aW9uXG5cdFx0XG5cdF91cGRhdGU6ID0+XG5cdFx0XG5cdFx0IyBFbmQgb2Ygc2VxdWVuY2U/IERvIG5vdCByZXN0YXJ0P1xuXHRcdGlmIEBfaXNFbmRPZlNlcXVlbmNlKCkgYW5kIEByZXBlYXQgaXMgZmFsc2Vcblx0XHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25FbmRcblx0XHRcdFxuXHRcdCMgTmV2ZXJtaW5kLCBtb3ZlIGFsb25nLi4uXG5cdFx0ZWxzZVxuXHRcdFx0IyBTdGFydCBuZXh0IGFuaW1hdGlvbiAob3IgcmVzdGFydCBzZXF1ZW5jZSlcblx0XHRcdEBfbmV4dCgpLnN0YXJ0KClcblx0XHRcdFxuXHRcdCMgKFJlKVNldCBjdXJyZW50IEFuaW1hdGlvblxuXHRcdEBfY3VycmVudEFuaW1hdGlvbiA9IEBfbmV4dCgpXG5cblxuXHRfaXNFbmRPZlNlcXVlbmNlOiAoYW5pbWF0aW9uID0gQF9jdXJyZW50QW5pbWF0aW9uKSA9PlxuXHRcdGFuaW1hdGlvbi5pbmRleCBpcyBAX2FuaW1hdGlvbnNBcnJheS5sZW5ndGggLSAxXG5cdFx0XG5cdF9uZXh0OiA9PlxuXHRcdEBfYW5pbWF0aW9uc0FycmF5W0BfY3VycmVudEFuaW1hdGlvbi5pbmRleCArIDFdID8gQF9hbmltYXRpb25zQXJyYXlbMF1cblx0XG5cdHN0YXJ0OiA9PlxuXHRcdGlmIEBfYW5pbWF0aW9uc0FycmF5Lmxlbmd0aCA+IDBcblx0XHRcdCMgU2V0IF9jdXJyZW50QW5pbWF0aW9uIGlmIG5vdCBzZXRcblx0XHRcdHVubGVzcyBAX2N1cnJlbnRBbmltYXRpb24/XG5cdFx0XHRcdEBfY3VycmVudEFuaW1hdGlvbiA9IEBfYW5pbWF0aW9uc0FycmF5WzBdXG5cdFx0XHRAX2N1cnJlbnRBbmltYXRpb24uc3RhcnQoKVxuXHRcdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvblN0YXJ0XG5cdFx0XG5cdHN0b3A6ID0+XG5cdFx0QF9jdXJyZW50QW5pbWF0aW9uLnN0b3AoKVxuXHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25TdG9wXG5cblxuXG4iLCIjIEFuaW1hdGlvbiBTZXRcbiMgTWFuYWdlcyBhIHNldCBvZiBBbmltYXRpb25zXG4jIFxuIyBieSBJc2FhYyBXZWluaGF1c2VuXG4jIGh0dHA6Ly9pc2FhY3cuY29tXG5cblxuY2xhc3MgZXhwb3J0cy5BbmltYXRpb25TZXQgZXh0ZW5kcyBGcmFtZXIuRXZlbnRFbWl0dGVyXG5cdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX2FuaW1hdGlvbnNBcnJheSA9IFtdXG5cdFx0QGFkZChhbmltYXRpb24pIGZvciBrLCBhbmltYXRpb24gb2Ygb3B0aW9ucy5hbmltYXRpb25zXG5cdFx0QHJlcGVhdCA9IG9wdGlvbnMucmVwZWF0ID8gZmFsc2Vcblx0XHRcdFxuXHRhZGQ6IChhbmltYXRpb24pID0+XG5cdFx0XG5cdFx0IyBFbnN1cmUgdGhlIGFuaW1hdGlvbiBpcyBzdG9wcGVkIChuZWVkZWQgd2hlbiBwYXNzZWQgdmlhIHRoZSBsYXllci5hbmltYXRlIG1ldGhvZClcblx0XHRhbmltYXRpb24uc3RvcCgpXG5cdFx0XG5cdFx0IyBIYXZlIHRoZSBhbmltYXRpb24gdHJhY2sgaXRzIGFuaW1hdGluZyBzdGF0ZVxuXHRcdGFuaW1hdGlvbi5pc0FuaW1hdGluZyA9IGZhbHNlXG5cdFx0XG5cdFx0YW5pbWF0aW9uLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRhbmltYXRpb24uaXNBbmltYXRpbmcgPSBmYWxzZVxuXHRcdFx0QF91cGRhdGUoKVxuXHRcdFx0XG5cdFx0QF9hbmltYXRpb25zQXJyYXkucHVzaCBhbmltYXRpb25cblx0XG5cdFxuXHRfdXBkYXRlOiAoKSA9PlxuXHRcdCMgSGF2ZSBhbGwgYW5pbWF0aW9ucyBzdG9wcGVkP1xuXHRcdGlmIG5vdCBAaXNBbmltYXRpbmcoKVxuXHRcdFx0aWYgQHJlcGVhdFxuXHRcdFx0XHRAc3RhcnQoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAZW1pdCBFdmVudHMuQW5pbWF0aW9uRW5kXG5cdFx0XG5cdGlzQW5pbWF0aW5nOiA9PlxuXHRcdF8uYW55KEBfYW5pbWF0aW9uc0FycmF5LCBcImlzQW5pbWF0aW5nXCIsIHRydWUpXG5cdFxuXHRzdGFydDogPT5cblx0XHRmb3IgYW5pbWF0aW9uIGluIEBfYW5pbWF0aW9uc0FycmF5XG5cdFx0XHRhbmltYXRpb24uc3RhcnQoKVxuXHRcdFx0YW5pbWF0aW9uLmlzQW5pbWF0aW5nID0gdHJ1ZVxuXHRcdEBlbWl0IEV2ZW50cy5BbmltYXRpb25TdGFydFxuXHRcdFxuXHRzdG9wOiA9PlxuXHRcdGZvciBhbmltYXRpb24gaW4gQF9hbmltYXRpb25zQXJyYXlcblx0XHRcdGFuaW1hdGlvbi5zdG9wKClcblx0XHRcdGFuaW1hdGlvbi5pc0FuaW1hdGluZyA9IGZhbHNlXG5cdFx0QGVtaXQgRXZlbnRzLkFuaW1hdGlvblN0b3AiXX0=
