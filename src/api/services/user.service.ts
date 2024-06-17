import { CloudStorageService } from "../../utils";
import { DatabaseManager } from "../../../config";
import { IUser } from "user";

class UsersService {
    public static async updateUserData(
        id: string,
        data: IUser,
        imagesFiles: Express.Multer.File[]
    ) {
        // update userPhoto if exist
        let photo;
        if (imagesFiles) {
            photo = await CloudStorageService.uploadFiles(
                imagesFiles,
                `users/${id}`
            );
        }
        const updatedUserRecord =
            await DatabaseManager.getInstance().user.update({
                where: {
                    id,
                },
                data: {
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                    email: data?.email,
                    photo: photo ? photo[0] : undefined,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    photo: true,
                    updatedAt: true,
                },
            });

        return updatedUserRecord;
    }
}

export default UsersService;
