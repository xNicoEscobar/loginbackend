import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallBack: true, usernameField: 'email' }, async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const exists = await userModel.findOne({ email: username });
            if (exists) {
                return done(null, false)
            }

            const user = await userModel.create({ 
                first_name, 
                last_name, 
                age, 
                email: username, 
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), 
            });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }))
}