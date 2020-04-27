var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const databaseUrl = process.env.MONGO_URL;
const opts = {
  useNewUrlParser: true
};

mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl, opts);

var db = mongoose.connection;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: false
  },
  password: {
    required: true,
    unique: false,
    type: String
  },
  email: {
    required: true,
    unique: false,
    type: String
  },
  icon: {
    unique: false,
    type: String
  },
  admin: {
    unique: false,
    type: Boolean
  },
  created_at: {
    unique: false,
    type: Date
  },
  updated_at: {
    unique: false,
    type: Date
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.criarUsuario = function (newUser) {

  return new Promise((Resolve, Reject) => {

    const collection = db.collection('users');

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        newUser.password = hash;
        collection.insert(newUser, function (erro, done) {
          if (erro) Reject(JSON.stringify(erro));
          Resolve(done);
        });
      });
    });

  });

};

module.exports.userExists = function (people) {
  return new Promise((Resolve, Reject) => {
    const collection = db.collection('users');
    collection.findOne({
        email: people.email
      })
      .then((data) => {
        if (data === null) Reject("not find user");
        let verifyPassword = bcrypt.compareSync(people.password, data.password);
        if (verifyPassword) Resolve(data);
        Reject("password different");
      })
      .catch(err => Reject(err.errmsg));

  });
};
