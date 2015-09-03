# Animation Collections for Framer.js

Classes for managing large sets of animations in [Framer.js](https://github.com/koenbok/Framer). Objects are simple and flexible, and can be used interchangeably with `Animation` objects.

## Get Started

- [Download] (https://github.com/isaacw/framer-animation-collections/archive/master.zip) (Framer Studio project and examples)
- Unzip and go to `AnimationCollections.framer/modules/`
- Copy `AnimationSequence.coffee` and `AnimationSet.coffee` into your Framer Studio project modules folder
- Open your Framer Studio project and, at the top, paste:
```coffeescript
{AnimationSequence} = require "AnimationSequence"
{AnimationSet} = require "AnimationSet"
```

## Example
###### Create a new layer
```coffeescript
square = new Layer
	width: 80
	height: 80
	borderRadius: 8
square.center()
```

###### Define some animations
```coffeescript
rotateAnimation = new Animation
	layer: square
	properties: 
		rotation: 360

moveAnimation = new Animation
	layer: square
	properties: 
		scale: 2

tweenAnimation = new Animation
	layer: square
	properties: 
		borderRadius: 40
```

###### Create an animation sequence
Pass the animations in in the desired order
```coffeescript
squaresAnimation = new AnimationSequence
	animations:
		first: rotateAnimation
		second: moveAnimation
		third: fadeBgAnimation
		fourth: tweenAnimation
```

## Documentation
AnimationSequence and AnimationSet look very similar, but serve different functions. Both classes inherit from `Framer.EventEmitter` and emit events `Events.AnimationStart` and `Events.AnimationEnd`.

#### AnimationSequence
Inherits from: `Framer.EventEmitter`.

Manages a sequence of animations. Animations play in the order specified.

##### new AnimationSequence(options *\<object\>*)
Instantiates a new AnimationSequence.

Example
```coffeescript
mySequence = new AnimationSequence
    animations:
        a: myAnimation
        b: myOtherAnimation
        c: myOtherSequence
    repeat: false
```

##### AnimationSequence.repeat *\<boolean\>*
If set `true`, the sequence will repeat after the final animation has completed; `Events.AnimationEnd` will not emit.

##### AnimationSequence.add(animation *\<object\>*)
Adds an animation to the end of the sequence.

##### AnimationSequence.front(animation *\<object\>*)
Adds an animation to the beginning of the sequence.

##### AnimationSequence.start()
Starts/resumes the sequence.

##### AnimationSequence.stop()
Stops the sequence.

#### AnimationSet
Inherits from: `Framer.EventEmitter`.

Manages a set of animations. Animations play simultaneously.

##### new AnimationSet(options *\<object\>*)
Instantiates a new AnimationSet.

Example
```coffeescript
mySet = new AnimationSet
    animations:
        a: myAnimation
        b: myOtherAnimation
        c: myOtherOtherAnimation
    repeat: false
```

##### AnimationSet.repeat *\<boolean\>*
If set `true`, the set will repeat after all the animations have completed; `Events.AnimationEnd` will not emit.

##### AnimationSet.add(animation *\<object\>*)
Adds an animation to the collection.

##### AnimationSet.start()
Starts/resumes the set.

##### AnimationSet.stop()
Stops the set.

##### AnimationSet.isAnimating()
Returns: boolean
Returns `true` if an animation in the set is currently playing

## Changelog

##### **v0.3** 2015-08-15
###### New
- Initial release!

## Misc Stuff

###### Community & Help
If you haven't already, join the [Framer JS](https://www.facebook.com/groups/framerjs/) Facebook group and post examples and questions. If I get a chance, I'll try to personally answer any questions.

Also, please, feel free to contribute! Right now I mostly need help with bugs and robustness. 

###### Backlog
- [x] AnimationSequence.front method
- [ ] Remove methods
- [ ] Reset methods
