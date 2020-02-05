# JS 2D Collision Module

This is a simple library that allows you to quickly implement collision detection and response to your JavaScript project. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing

To install this module, drop and include the following files into your project: 
1. collision.js

### Functions 

#### hullVertsIntersect
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
> let intersecting = hullVertsIntersect( [[0,0],[100,100]], [[90,90],[111,111]])

## Technologies

* Javascript

## Authors

* **Allan Parker** - *Initial work* - [AllPark](https://github.com/allpark)
* **Daniel Shiffman / The Coding Train** - *Tutorials and guidance* - [TheCodingTrain](https://github.com/CodingTrain)


