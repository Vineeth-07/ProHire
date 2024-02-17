const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
var cookieParser = require("cookie-parser");
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const session = require("express-session");
app.use(cookieParser("Some secret String"));
const { User } = require("./models");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

app.use(
  session({
    secret: "my-super-secret-key-2837428907583420",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      User.findOne({ where: { email: username } })
        .then(async function (user) {
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid password" });
          }
        })
        .catch(() => {
          return done(null, false, {
            message: "Account doesn't exist for this mail",
          });
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user in session", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});

//routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);

module.exports = app;
