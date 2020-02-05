# JS 2D Collision Module

This is a simple library that allows you to quickly implement collision detection and response to your JavaScript project. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Installing

To install this module, drop and include the following files into your project: 
1. collision.js


## Functions 
### hullVertsIntersect
##### Description

Performs an intersection test on two axis-aligned hulls (which contain an array of vertices in clockwise order)
##### Usage
> hullVertsIntersect(bb0, bb1)

##### Parameters

1. bb0 - A 2D array of two min max points which form a box

2. bb1 - A 2D array of two min max points which form a box

![Diagram of the min max box model](https://github.com/allpark/JS-2D-Collision-Module/blob/master/diagram_minmax.jpg)

##### Value
bool - whether given hulls intersect or not 

##### Example
> let intersecting = hullVertsIntersect( [[0,0],[100,100]], [[90,90],[120,120]]);

##
### satAABB
##

##### Description

Performs an intersection test on two axis-aligned hulls (which contain an array of vertices in clockwise order)
Uses simplified separating axis theorem (SAT).

##### Usage
> satAABB(verts0, verts1)

##### Parameters

1. verts0 - A 2D array of vertices (points)

2. verts1 - A 2D array of vertices (points)

##### Value
1. bool  - whether given hulls intersect or not 
2. array - minimum translation vector for pushing verts0 out of verts1 so that they no longer intersect
##### Example
```
let collisionData = satAABB( [[0,0],[100,0], [100,100], [0,100]], [[80,0],[200,0], [200,100], [80,100]]);

let intersecting  = collisionData[0];
let mtv           = collisionData[1];

print(intersecting)
print(mtv)

true
[20, 0]
```

## Technologies

* Javascript

## Authors

* **Allan Parker** - *Initial work* - [AllPark](https://github.com/allpark)
* **Daniel Shiffman / The Coding Train** - *Tutorials and guidance* - [TheCodingTrain](https://github.com/CodingTrain)


