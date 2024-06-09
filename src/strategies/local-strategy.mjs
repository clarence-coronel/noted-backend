import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "./../mongoose/schemas/UserSchema.mjs";
import { isPasswordValid } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
  //   console.log(`Inside Serialize User`);
  //   console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  //   console.log(`Inside Deserializer`);
  //   console.log(`Deserializing User ID: ${id}`);
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User Not Found");

    const userWithoutPassword = findUser.toObject();
    delete userWithoutPassword.password;

    done(null, userWithoutPassword);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });

      if (!findUser) throw new Error("User Not Found");

      if (!isPasswordValid(password, findUser.password))
        throw new Error("Bad Credentials");

      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
