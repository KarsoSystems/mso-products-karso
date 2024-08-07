import { DtoProducts } from './dto/products-dto';
import { ProductsService } from './products.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('products')
// @UseGuards(AuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getAllProducts(@Query() params: { filter: string }) {
    return this.productsService.getProducts(params.filter);
  }

  @Post()
  postProducts(@Body() product: DtoProducts) {
    return this.productsService.createProduct(product);
  }

  @Put(':sku')
  putProduct(@Param('sku') sku: string, @Body() product: DtoProducts) {
    this.productsService.editProduct(sku, product);
    return 'editar';
  }
}