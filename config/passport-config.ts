import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { DatabaseManager } from "./db";
import { AppError } from "../src/util";

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ["HS256"],
};

// verification  callback
const jwtStrategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    },
    (JWT_payload: { id: string }, done) => {
        /** 
        JWT_payload is the decoded JWT payload
        done is a callback that is called with the user object
        which will be set to req.user in the route handler
        if the user is found, done is called with the user object
        if the user is not found, done is called with false
        if there is an error, done is called with an error
        if (JWT_payload) {
         * */
        //fetch the user from the database using id
        console.log("Jwt_payload===>", JWT_payload);
        DatabaseManager.getInstance()
            .user.findUnique({
                where: {
                    id: JWT_payload.id,
                },
            })
            .then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch((err) => {
                done(new AppError("Invalid token!", 400), false);
            });
    }
);

export default (passport: any) => {
    passport.use(jwtStrategy);
};
