import bcrypt from "bcrypt";
import { DatabaseManager } from "../../../config";
import { OTPService, AppError, Email } from "../../util";

class AuthService {
    private constructor() {}
    public static async register(
        email: string,
        password: string,
        firstName: string,
        lastName?: string
    ): Promise<number> {
        try {
            //validate that user does not exist
            const user = await DatabaseManager.getInstance().user.findUnique({
                where: {
                    email,
                },
            });

            if (user) {
                if (!user.isVerified)
                    throw new AppError(
                        "the email already used,but not verified yet",
                        400
                    );
                else
                    throw new AppError(
                        "the email already used try another one",
                        400
                    );
            }

            //generate and hash otp
            const otp = OTPService.generate(6);
            const hashedOTP = OTPService.hash(String(otp));

            //hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            //create user record
            const userRecord = await DatabaseManager.getInstance().user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                },
            });

            //send otp to user via email
            //TODO enhance the email body using a template
            // const message = `Thanks for registering to the online-store,
            //  use the opt to verify your account otp is ${otp}`;
            //    new Email(
            //     userRecord.email,
            //     "Registering to the Online-store",
            //     message
            // )
            //     .send()
            //     .then()
            //     .catch((err) => {
            //         console.error(err);
            //         throw new AppError("error while sending the email", 500);
            //     });

            //create opt record
            const otpRecord = await DatabaseManager.getInstance().otps.create({
                data: {
                    otp: hashedOTP,
                    userId: userRecord.id,
                    validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), //2 days
                },
            });

            return otp;
        } catch (err) {
            //rollback the transaction
            await DatabaseManager.getInstance().user.delete({
                where: {
                    email,
                },
            });
            throw err;
        }
    }

    public static async verify(otp: number): Promise<void> {
        //validate the otp
        const otpRecord = await DatabaseManager.getInstance().otps.findFirst({
            where: {
                otp: OTPService.hash(String(otp)),
            },
        });

        if (!otpRecord) throw new AppError("invalid otp", 400);

        if (otpRecord && otpRecord.validTill < new Date())
            throw new AppError("otp expired, generate another one", 400);

        await DatabaseManager.getInstance().$transaction([
            //verify the user account and create his cart
            DatabaseManager.getInstance().user.update({
                where: {
                    id: otpRecord.userId,
                },
                data: {
                    isVerified: true,
                    Cart: {
                        create: {},
                    },
                },
            }),
            //delete the otp record
            DatabaseManager.getInstance().otps.delete({
                where: {
                    id: otpRecord.id,
                },
            }),
        ]);
    }

    public static async regenerateOTP(email: string): Promise<number> {
        //validate that email is exist and not verified
        const user = await DatabaseManager.getInstance().user.findUnique({
            where: {
                email,
            },
        });

        if (!user) throw new AppError("email not found", 400);

        if (user && user.isVerified)
            throw new AppError("the email already verified", 400);

        //generate and hash otp
        const otp = OTPService.generate(6);
        const hashedOTP = OTPService.hash(String(otp));

        //send otp to user via email
        //TODO enhance the email body using a template
        // new Email(email, "Regenerating the OTP", `your new otp is ${otp}`)
        //     .send()
        //     .then()
        //     .catch((err) => {
        //         throw err;
        //     });
        //delete the old otp record and create a new one
            await DatabaseManager.getInstance().$transaction([
                DatabaseManager.getInstance().otps.deleteMany({
                    where: {
                        userId: user.id,
                    },
                }),
                DatabaseManager.getInstance().otps.create({
                    data: {
                        otp: hashedOTP,
                        userId: user.id,
                        validTill: new Date(
                            Date.now() + 2 * 24 * 60 * 60 * 1000
                        ), //2 days
                    },
                }),
            ]);

       
        return otp;
    }
}

export { AuthService };
export default AuthService;
