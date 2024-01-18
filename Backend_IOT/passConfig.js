const User = require("./app/model/user.js"); 
const bcrypt = require('bcryptjs')
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
// Local Strategy for username/password authentication
  passport.use(
    new localStrategy((username, password, done) => {
        console.log("username" + username);

        // Find the user with the provided username
        User.findOne({ username: username }, (err, user) => {
            if (err) throw err;

            // If user not found, return false
            if (!user) return done(null, false);

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;

                // If passwords match, return the user, otherwise return false
                if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    })
);

// Google OAuth2.0 Strategy
  passport.use(new GoogleStrategy({
    clientID: "519454084747-h5rvejg15uo4b3f12l46i1je9s01ohud.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/google/callback"
  },

  function(accessToken, refreshToken, profile, cb) {
    // Find or create a user with the provided Google profile information
    User.findOne({ googleId: profile.id }, async (err, user) => {
      if (user){
        return cb(err, user);
      }
      if (!user) {
        // Create a new user with Google profile information
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
        });
        await newUser.save();
        return cb(err, user);;
      }
    });
  }
));

// Serialize user to store in the session
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    const user = User.findById(id);
    console.log("done");
    done(null, user);
});
};