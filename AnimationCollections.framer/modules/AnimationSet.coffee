# Animation Set
# Manages a set of Animations
# 
# by Isaac Weinhausen
# http://isaacw.com


class exports.AnimationSet extends Framer.EventEmitter
	
	constructor: (options = {}) ->
		@_animationsArray = []
		@add(animation) for k, animation of options.animations
		@repeat = options.repeat ? false
			
	add: (animation) =>
		
		# Ensure the animation is stopped (needed when passed via the layer.animate method)
		animation.stop()
		
		# Have the animation track its animating state
		animation.isAnimating = false
		
		animation.on Events.AnimationEnd, =>
			animation.isAnimating = false
			@_update()
			
		@_animationsArray.push animation
	
	
	_update: () =>
		# Have all animations stopped?
		if not @isAnimating()
			if @repeat
				@start()
			else
				@emit Events.AnimationEnd
		
	isAnimating: =>
		_.any(@_animationsArray, "isAnimating", true)
	
	start: =>
		for animation in @_animationsArray
			animation.start()
			animation.isAnimating = true
		@emit Events.AnimationStart
		
	stop: =>
		for animation in @_animationsArray
			animation.stop()
			animation.isAnimating = false
		@emit Events.AnimationStop