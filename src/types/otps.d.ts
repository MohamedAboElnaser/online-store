import type { IUser } from "user";

interface IOtp {
    id: string;
    otp: string;
    user: IUser;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
    validTill?: Date;
}

export type { IOtp };
