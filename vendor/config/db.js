var url = 'mongodb://paulaodev:paulo2017@ds157653.mlab.com:57653/khanml';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.connect(url, { useMongoClient: true });
