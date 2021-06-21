/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const autoIncrementModelID = require('./Counter.model');

const UserSchema = mongoose.Schema({
  locationTitle: {
    type: String,
  },
  locationID: {
    type: String,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  phone: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  galleryImages: {
    type: Array,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  deleted:{
    type: Boolean,
    default:false,
    select: false,
},
  geolocation: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: Array,
}}, 
{
  timestamps: true,
});
UserSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID('applicationCount', 'locationID', this, next, 'LOC');
});
UserSchema.pre('find', function () {
  this.where({ deleted: false });
  this.sort({ createdAt: -1 });
});

module.exports = mongoose.model('location', UserSchema);
