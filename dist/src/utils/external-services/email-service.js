"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    constructor(to, subject, message) {
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
    getTransporter() {
        if (process.env.NODE_ENV === "production") {
            return nodemailer_1.default.createTransport({
                host: process.env.SendinBlue_HOST,
                port: Number(process.env.SendinBlue_PORT),
                secure: false,
                auth: {
                    user: process.env.SendinBlue_USER,
                    pass: process.env.SendinBlue_PASSWORD,
                },
            });
        }
        else {
            return nodemailer_1.default.createTransport({
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
        }
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transporter = this.getTransporter();
                yield this.getTransporter().sendMail({
                    from: process.env.EMAIL_FROM,
                    to: this.to,
                    subject: this.subject,
                    text: this.message,
                });
            }
            catch (err) {
                console.log("Error of email service", err);
                throw new Error(`Error occurred while sending email: ${err}`);
            }
        });
    }
}
exports.Email = Email;
exports.default = Email;
//# sourceMappingURL=email-service.js.map