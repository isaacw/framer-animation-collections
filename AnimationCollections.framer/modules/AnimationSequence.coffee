# Animation Sequence
# Manages a sequence of Animations
# 
# by Isaac Weinhausen
# http://isaacw.com


class exports.AnimationSequence extends Framer.EventEmitter
	
	constructor: (options = {}) ->
		@_animationsArray = []
		@_currentAnimation = null
		if _.isArray options.animations
			@add(animation) for animation, k in options.animations
		else
			@add(animation) for k, animation of options.animations
		@repeat = options.repeat ? false
	
	add: (animation, index) =>

		# Ensure the animation is stopped (needed for when passed via the layer.animate method)
		animation.stop()
		
		# Set animation callback
		animation.on Events.AnimationEnd, =>
			@_update()
		
		# No valid index was passed?
		unless index? and index <= @_animationsArray.length
			index = @_animationsArray.length
		
		# Insert animation into its position
		@_animationsArray.splice index, 0, animation
		
		# Update Indices (animations need to track their own position)
		animation.index = i for animation, i in @_animationsArray
		
	
	front: (animation) =>
		@add animation, 0
		# @_unshift animation
		
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
		if @_animationsArray.length > 0
			# Set _currentAnimation if not set
			unless @_currentAnimation?
				@_currentAnimation = @_animationsArray[0]
			@_currentAnimation.start()
			@emit Events.AnimationStart
		
	stop: =>
		@_currentAnimation.stop()
		@emit Events.AnimationStop



