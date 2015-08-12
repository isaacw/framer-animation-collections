# Animation Chain
# by Isaac Weinhausen
# http://isaacw.com




{AnimationSequence} = require "AnimationSequence"
{AnimationSet} = require "AnimationSet"

# Classes
# -------------------------------------



# App
# -------------------------------------


# Set canvas props

bg = new BackgroundLayer 
	backgroundColor: "#292929"


# Render colored squares

colors = 
	"purple" : "#877DD7"
	"blue" : "#28affa"
	"teal" : "#2DD7AA"
	"green" : "#7DDD11"

do ->
	i = 0
	for key, value of colors
		@[key] = new Layer
			width: 50, height: 50
			x: 50*i
			backgroundColor: value
		i++


# Animation functions

moveDown = (layer) ->
	new Animation
		layer: layer
		properties: 
			y: -> 
				if layer.y > Screen.height
					0
				else
					layer.y + 100
		time: 0.5

flip = (layer) ->
	flipAnimation = new Animation
		layer: layer
		properties: 
			rotationZ: 360
		time: 0.5
	flipAnimation.on Events.AnimationEnd, ->
		layer.rotationZ = 0


# Animation Chains

this.sequence1 = new AnimationSequence
	animations:
		a: moveDown(purple)
		b: flip(purple)
# 		c: moveDown(blue)
# 		d: flip(blue)
# 	repeat: true

# sequence1.add moveDown(purple)
# sequence1.add flip(purple)
sequence1.add moveDown(blue)
sequence1.add flip(blue)
# sequence1.repeat = true

sequence1.on Events.AnimationEnd, ->
	print "sequence1 ended"
	set1.start()
	

this.set1 = new AnimationSet
	animations:
		a: moveDown(teal)
		b: flip(teal)
		c: moveDown(green)
		d: flip(green)
# 	repeat: true

set1.on Events.AnimationEnd, ->
	print "set1 ended"




# Execute
# -------------------------------------

sequence1.start()
# set1.start()

