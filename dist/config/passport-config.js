"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const db_1 = require("./db");
const utils_1 = require("../src/utils");
//cookie extractor
const cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
};
// verification  callback
const jwtStrategy = new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromExtractors([
        passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
    ]),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ["HS256"],
}, (JWT_payload, done) => {
    /**
    JWT_payload is the decoded JWT payload
    done is a callback that is called with the user object
    which will be set to req.user in the route handler
    if the user is found, done is called with the user object
    if the user is not found, done is called with false
    if there is an error, done is called with an error
    if (JWT_payload) {
     
    */
    //fetch the user from the database using id
    db_1.DatabaseManager.getInstance()
        .user.findUnique({
        where: {
            id: JWT_payload.id,
        },
        select: {
            id: true,
            role: true,
            email: true,
            firstName: true,
            lastName: true,
            photo: true,
            Cart: {
                select: {
                    id: true,
                },
            },
        },
    })
        .then((user) => {
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    })
        .catch((err) => {
        done(new utils_1.AppError("Invalid token!", 400), false);
    });
});
exports.default = (passport) => {
    passport.use(jwtStrategy);
};
//# sourceMappingURL=passport-config.js.map