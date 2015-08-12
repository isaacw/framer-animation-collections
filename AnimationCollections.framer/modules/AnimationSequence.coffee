# Animation Sequence
# Manages a sequence of Animations
# 
# by Isaac Weinhausen
# http://isaacw.com


class exports.AnimationSequence extends Framer.EventEmitter
	
	constructor: (options = {}) ->
		@_animationsArray = []
		@_currentAnimation = null
		@add(animation) for k, animation of options.animations
		@repeat = options.repeat ? false
			
	add: (animation) =>
		
		# Ensure the animation is stopped (needed for when passed via the layer.animate method)
		animation.stop()
		
		# Have the animation track it's own position in the chain
		animation.index = @_animationsArray.length
		
		animation.on Events.AnimationEnd, =>
			@_update()
			
		@_animationsArray.push animation
		
		# Set _currentAnimation if this is the first animation added
		if @_animationsArray.length is 1
			@_currentAnimation = @_animationsArray[0]
		
		
	_update: =>
		
		# End of sequence? Do not restart?
		if @_isEndOfSequence() and @repeat is false
			@emit Events.AnimationEnd
			
		# Nevermind, move along...
		else
			# Start next animation (or restart sequence)
			@_next().start()
			
		# (Re)Set current Animation
		@_currentAnimation = @_next()


	_isEndOfSequence: (animation = @_currentAnimation) =>
		animation.index is @_animationsArray.length - 1
		
	_next: =>
		@_animationsArray[@_currentAnimation.index + 1] ? @_animationsArray[0]
	
	start: =>
		if @_currentAnimation?
			@_currentAnimation.start()
			@emit Events.AnimationStart
		
	stop: =>
		@_currentAnimation.stop()
		@emit Events.AnimationStop



