import { 
    Controller, 
    Post, 
    UploadedFile, 
    UseInterceptors 
  } from "@nestjs/common";
  import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
  import { FileInterceptor } from "@nestjs/platform-express";
  import { UploadService } from "./upload.service";
  
  @ApiTags("Upload") 
  @Controller("upload")
  export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
  
    @Post("single")
    @ApiOperation({ summary: "Single" }) 
    @ApiConsumes("multipart/form-data") 
    @ApiBody({
      schema: {
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary",
          },
        },
      },
    })
    @ApiResponse({ status: 201, description: "Fayl muvaffaqiyatli yuklandi." })
    @ApiResponse({ status: 400, description: "Xato: notogri format yoki katta fayl." })
    @UseInterceptors(FileInterceptor("file"))
    async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
      return this.uploadService.saveFile(file);
    }
  }
  