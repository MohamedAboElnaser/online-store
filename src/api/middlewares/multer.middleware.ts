import { RequestHandler } from "express";
import multer, { Multer } from "multer";

class MulterService {
    private static multerInstance: Multer | null;

    private constructor() {}

    public static getMulter(): Multer {
        if (!this.multerInstance) {
            this.multerInstance = multer({ storage: multer.memoryStorage() });
        }

        return this.multerInstance;
    }
    /**
     * It populate text fields to req.body and files to req.files
     */
    public static getNoneMethod(): RequestHandler {
        return MulterService.getMulter().none();
    }

    public static multipleFiles(
        fieldName: string,
        maxCount: number = 4
    ): RequestHandler {
        return MulterService.getMulter().array(fieldName, maxCount);
    }
}

export default MulterService;
export { MulterService };
