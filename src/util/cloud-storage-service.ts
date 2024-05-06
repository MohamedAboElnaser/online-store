import { v2 as cloudinary } from "cloudinary";
import AppError from "./appError";

class CloudStorageService {
    private constructor() {}

    public static async uploadFiles(
        files: Express.Multer.File[],
        folderName: string
    ): Promise<string[]> {
        try {
            // upload images to cloud storage
            const promises = files.map((file, idx) => {
                return new Promise<string>((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream(
                            {
                                folder: `${folderName}`,
                                public_id: `0${idx}`,
                            },
                            (error, result) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result.secure_url);
                                }
                            }
                        )
                        .end(file.buffer);
                });
            });

            const filesURLs = await Promise.all(promises);
            return filesURLs;
        } catch (err) {
            throw new AppError(
                "Error occurred while saving images to cloud storage",
                500
            );
        }
    }

    public static async deleteFolder(folderName: string) {
        try {
            const res = await cloudinary.api.delete_resources_by_prefix(
                folderName
            );
            // console.log("Response from delete operation==>", res);
        } catch (err) {
            throw new AppError("Error occurred while deleting files", 500);
        }
    }
}

export default CloudStorageService;
