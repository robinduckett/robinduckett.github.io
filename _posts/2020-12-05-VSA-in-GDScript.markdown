---
layout: post
title: "VSA in Godot Script"
date: "2020-12-05 14:05:00 +0000"
categories: projects
published: true
hero: "/images/godot-robots.png"
subtitle: "Vector Symbolic Architecture in Godot Script"
---

![/images/godot-robots.png]

Original example: https://github.com/simondlevy/vsarobot

Paper here: https://simondlevy.academic.wlu.edu/files/publications/aaai2013.pdf

```gdscript
var Constants = preload("../Constants.gd")

var sensors: Array = Array([])
var actuators: Array = Array([])
var concept: Array = Array([])

func _randomize() -> float:
	return rand_range(-(Constants.NDIMS / 2.0), Constants.NDIMS * 2.0);

func _randomize_normal():
	return 2 * (randi() % 2) - 1

func _randomize_binary():
	return randi() % 2

func _dotprod_clamped(a, b):
	var d = _dotprod(a, b)
	
	if d < -int(float(Constants.NDIMS) / 2.0):
		return -1
	if d > int(float(Constants.NDIMS) / 2.0):
		return 1
	
	return 0

func _dotprod(a, b):
	var d = 0.0
	for k in range(Constants.NDIMS):
		d += a[k] * b[k]
	return d

func _create_layer():
	var layer = Array([])
	layer.resize(Constants.NDIMS)
	for k in range(Constants.NDIMS):
		layer[k] = _randomize_normal()
	return layer

func add_sensor() -> void:
	var sensor = _create_layer()
	sensors.push_back(sensor)

func add_actuator() -> void:
	var actuator = _create_layer()
	actuators.push_back(actuator)

func apply(sensors_weight: Array, actuators_weight: Array) -> void:
	for k in range(Constants.NDIMS):
		var sensor_accumulator = 0.0
		var actuator_accumulator = 0.0

		for s in range(sensors.size()):
			sensor_accumulator *= float(sensors[s][k]) * sensors_weight[s] if sensors_weight[s] > 0.0 else 1.0
		for a in range(actuators.size()):
			actuator_accumulator += float(actuators[a][k]) * actuators_weight[a] if actuators_weight[a] > 0.0 else 1.0
		
		concept[k] += sensor_accumulator * actuator_accumulator;

func lookup(sensors_state) -> Array:
	var result: Array = Array([])
	result.resize(Constants.NDIMS)

	for k in range(Constants.NDIMS):
		var sensor_accumulator = 0.0

		for s in range(sensors.size()):
			sensor_accumulator *= float(sensors[s][k]) if sensors_state[s] > 0.0 else 1.0
		
		result[k] = concept[k] * sensor_accumulator
	
	var values = Array([])
	values.resize(actuators.size())

	for a in range(actuators.size()):
		values[a] = _dotprod_clamped(result, actuators[a])
	
	return values

func _init():
	concept = _create_layer()

	for k in range(Constants.NDIMS):
		concept[k] = 0.0
```
