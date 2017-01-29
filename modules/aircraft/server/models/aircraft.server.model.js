'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Aircraft Schema
 */
var AircraftSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  category: {
    type: String,
    default: '',
    trim: true,
    required: 'Category cannot be blank'
  },
  seatNo: {
    type: Number,
    default: 0,
    trim: true,
    required: 'Seat Number cannot be blank'
  },
  price: {
    type: Number,
    default: 0,
    trim: true,
    required: 'Price cannot be blank'
  },
  airport: {
    type: String,
    default: '',
    trim: true,
    required: 'Airport cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Aircraft', AircraftSchema);
