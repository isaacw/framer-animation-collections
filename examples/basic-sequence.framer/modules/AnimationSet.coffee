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
		animation.isAnimatingCheck = false

		animation.on Events.AnimationEnd, =>
			animation.isAnimatingCheck = false
			@_update()

		@_animationsArray.push animation


	_update: () =>
		# Have all animations stopped?
		if not @isAnimatingCheck()
			if @repeat
				@start()
			else
				@emit Events.AnimationEnd

	isAnimatingCheck: =>
		_.some(@_animationsArray, "isAnimatingCheck", true)

	start: =>
		for animation in @_animationsArray
			animation.start()
			animation.isAnimatingCheck = true
		@emit Events.AnimationStart

	stop: =>
		for animation in @_animationsArray
			animation.stop()
			animation.isAnimatingCheck = false
		@emit Events.AnimationStop