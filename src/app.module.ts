import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UploadModule } from 'uploads/upload.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule,UploadModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
