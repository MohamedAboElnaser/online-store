import exp from "constants";
import jwt from "jsonwebtoken";
import { IToken } from "token";

class JWTUtil {
    private constructor() {}

    public static issueJWT(id: string): IToken {
        const payload = {
            id,
            iat: Date.now(),
        };

        const validFor = process.env.JWT_VALIDITY;

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: validFor,
            algorithm: "HS256",
        });

        return {
            token: `Bearer ${token}`,
            validFor,
        };
    }
}

export default JWTUtil;
export { JWTUtil };
