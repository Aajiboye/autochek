// The list of the users for user service

module.exports = {
  BASE: `${process.env.LOCATIONSRVBASE}/user`,
  // category routes
  ADDLOCATION: '/location/add',
  UPDATELOCATION: '/location/',
  SOFTDELETE: '/location/soft/',
  HARDDELETE: '/location/hard/',
  ALLLOCATIONS: '/locations/',
  GETLOCATION: '/location/',
  GETDISTANCE: '/distance/',
};
