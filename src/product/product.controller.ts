import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot qoshish' })
  @ApiResponse({ status: 201, description: 'Mahsulot muvaffaqiyatli qoshildi.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulotlarni olish' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta mahsulotni olish' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Mahsulotni yangilash' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Mahsulotni ochirish' })
  remove(@Param('id') id: string) {
    return this.productService.remove(Number(id));
  }
}
