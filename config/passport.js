var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


const Users = mongoose.model('Users');

// Let Passport know we want to use a Local Strategy: login with email and password.
// What other kinds of strategies could you try in class today?
passport.use(new LocalStrategy({
    usernameField: "email"
  },
  function (email, password, done) {
    // This runs when a user tries to sign in.

    // TODO: Replace this object with a mongoose User model.

    Users.findOne({
        email
      })
      .then((user) => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {
            errors: {
              'email or password': 'is invalid'
            }
          });
        }

        return done(null, user);
      }).catch(done);
    // If none of the above, return the user

  }));

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function (obj, cb) {
  // TODO: return an instance of a Mongoose User model.
  cb(null, obj);
});

// Export our auth configuration.
module.exports = passport;