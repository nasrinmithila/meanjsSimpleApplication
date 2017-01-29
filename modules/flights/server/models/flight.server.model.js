'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Flight Schema
 */
var FlightSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now,
    required: 'Date cannot be blank'
  },
  departureAirport: {
    type: String,
    default: '',
    required: 'Departure airport cannot be blank'
  },
  arrivalAirport: {
    type: String,
    default: '',
    required: 'Arrival airport cannot be blank'
  },
  price: {
    type: Number,
    default: 0,
    required: 'Price cannot be blank'
  },
  aircraft: {
    type: Schema.ObjectId,
    ref: 'Aircraft'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Flight', FlightSchema);
