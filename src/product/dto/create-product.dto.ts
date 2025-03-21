import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'Samsung Galaxy S24', description: 'Mahsulot nomi' })
    name: string;
  
    @ApiProperty({ example: 'Eng yangi Samsung flagmani', description: 'Mahsulot haqida tavsif', required: false })
    description?: string;
  
    @ApiProperty({ example: 1200.50, description: 'Mahsulot narxi' })
    price: number;
  }