import { Injectable } from "@nestjs/common";
import { join } from "path";
import { writeFile } from "fs/promises";

@Injectable()
export class UploadService {
  async saveFile(file: Express.Multer.File) {
    const filePath = join(process.cwd(), "uploads", file.originalname);
    await writeFile(filePath, file.buffer);
    return { message: "File uploaded successfully", fileName: file.originalname };
  }
}
