# Dynamic Sequence
# by Isaac Weinhausen
# http://isaacw.com




# Import classes
# -------------------------------------

{AnimationSequence} = require "AnimationSequence"
{AnimationSet} = require "AnimationSet"




# Setup
# -------------------------------------

# Remember these nice colors
colors = 
	"purple" : "#877DD7"
	"blue" : "#28affa"
	"teal" : "#2DD7AA"
	"green" : "#7DDD11"
	"darkGray" : "#292929"


# Override defaults
Framer.Defaults.Layer.borderRadius = 8
Framer.Defaults.Animation.time = 0.2


# Set canvas props
bg = new BackgroundLayer 
	backgroundColor: colors["green"]
	borderRadius: 0


# Useful animation functions
moveDown = (layer) ->
	new Animation
		layer: layer
		properties: 
			y: ->
				layer.y + 100
flip = (layer) ->
	flipAnimation = new Animation
		layer: layer
		properties: 
			rotationZ: 360
	flipAnimation.on Events.AnimationEnd, ->
		layer.rotationZ = 0




# App
# -------------------------------------

squareProps = 
	width: 80
	height: 80
	spacing: 20

cols = 3
rows = 3

purpleContainer = new Layer
	width: (squareProps.width + squareProps.spacing) * cols - squareProps.spacing
	height: (squareProps.height + squareProps.spacing) * rows - squareProps.spacing
	backgroundColor: ""
	clip: false
purpleContainer.center()

purpleGroup = new AnimationSequence

for y in [1..rows]
	for x in [1..cols] 
		square = new Layer
			width: squareProps.width
			height: squareProps.height
			x: (squareProps.width + squareProps.spacing) * (x - 1)
			y: (squareProps.height + squareProps.spacing) * (y - 1)
			backgroundColor: "white"
			superLayer: purpleContainer
		purpleGroup.front moveDown(square)
		square.on Events.Click, (event, layer) ->
			purpleGroup.start()




# Execute
# -------------------------------------

# purpleGroup.start()

