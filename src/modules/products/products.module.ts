import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, productsSchema } from './schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: productsSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
