import { folio } from 'src/utils/functions';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { DtoProducts } from './dto/products-dto';
import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  /**
   * @getAllProducts Controlador para obtener la lista de productos.
   * @param params recibe el parametro para condicionar los filtros.
   * @returns retorna la lista de productos.
   */
  @Get()
  async getAllProducts(
    @Query() params: { filter: string },
    @Res() response: Response,
  ) {
    try {
      const result = await this.productsService.getProducts(params.filter);
      response.status(HttpStatus.OK).json({
        folio: folio(),
        mensaje: 'Operación exitosa',
        resultado: result,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @postProducts Servicio para crear productos
   * @param product Recibe los parametros para dar de alta un nuevo producto
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  postProducts(@Body() product: DtoProducts) {
    return this.productsService.createProduct(product);
  }

  /**
   * @putProduct Servicio para editar los elementos de un producto
   * @param sku Recibe el SKU del producto que se va a editar
   * @param product Recibe los parametros completos para la edicion.
   */
  @Put(':sku')
  @UseGuards(AuthGuard('jwt'))
  putProduct(@Param('sku') sku: string, @Body() product: DtoProducts) {
    return this.productsService.editProduct(sku, product);
  }

  /**
   * @desactivateProduct Servicio que cambia el estaus de los productos
   * @param sku Recibe el SKU a activar/desactivar
   * @param body  recibe un objeto con estatus true o false
   */
  @Put('status/:sku')
  @UseGuards(AuthGuard('jwt'))
  desactivateProduct(
    @Param('sku') sku: string,
    @Body() body: { status: boolean },
  ) {
    return this.productsService.softDeleteProduct(sku, body.status);
  }
}
