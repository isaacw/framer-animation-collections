# Mixed Collections
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
Framer.Defaults.Layer.width = 100
Framer.Defaults.Layer.height = 100
Framer.Defaults.Layer.borderRadius = 50
Framer.Defaults.Layer.backgroundColor = "white"
Framer.Defaults.Animation.time = 1


# Set canvas props
bg1 = new BackgroundLayer 
	backgroundColor: colors["teal"]
	borderRadius: 0

bg2 = new BackgroundLayer 
	backgroundColor: "white"
	borderRadius: 0




# App
# -------------------------------------


circle1 = new Layer
circle1.center()
circle1.x -= 120

circle2 = new Layer
circle2.center()
circle2.y -= 120

circle3 = new Layer
circle3.center()
circle3.x += 120

circle4 = new Layer
circle4.center()
circle4.y += 120

circle5 = new Layer
circle5.center()


outwardAnimationSet = new AnimationSet
	animations:
		a: circle1.animate
			properties:
				x: circle1.x - 60
		b: circle2.animate
			properties:
				y: circle2.y - 60
		c: circle3.animate
			properties:
				x: circle3.x + 60
		d: circle4.animate
			properties:
				y: circle4.y + 60

mainAnimationSequence = new AnimationSequence
	animations:
		1: outwardAnimationSet
		2: circle5.animate
			properties:
				borderRadius: 8
		3: circle5.animate
			properties:
				scale: 1.75
				rotation: 360
			time: 0.85
		4: bg1.animate
			properties:
				opacity: 0


# Execute
# -------------------------------------

mainAnimationSequence.start()


