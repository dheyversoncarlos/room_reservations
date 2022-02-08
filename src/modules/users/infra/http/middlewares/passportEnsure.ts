import { FinUserByEmailService } from "@modules/users/services/FindUserByEmailService";
import { FindUserByIdService } from "@modules/users/services/FindUserByIdService";
import { compareSync } from "bcrypt";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { container } from "tsyringe";

const passportEnsure = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const findById = container.resolve(FindUserByIdService);
      const user = await findById.handle(id);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const findByEmail = container.resolve(FinUserByEmailService);

          const user = await findByEmail.handle(email);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const isValid = compareSync(password, user.password);

          if (!isValid) {
            return done(null, false, { message: "Wrong Password" });
          }

          return done(null, user, { message: "Logged in Successfully" });
        } catch (err) {
          return done(err, false, { message: "An error ocurred" });
        }
      }
    )
  );

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: process.env.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export { passportEnsure };
