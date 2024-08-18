import { folio } from 'src/utils/functions';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DtoProducts, DtoProductsRequest } from './dto/products-dto';
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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
      return response.status(HttpStatus.OK).json({
        folio: folio(),
        mensaje: 'Operación exitosa',
        resultado: result,
      });
    } catch (error) {
      throw error;
    }
  }

  // /**
  //  * @postProducts Servicio para crear productos
  //  * @param product Recibe los parametros para dar de alta un nuevo producto
  //  */
  // @Post()
  // @UseGuards(AuthGuard('jwt'))
  // async postProducts(@Body() product: DtoProducts, @Res() response: Response) {
  //   try {
  //     const respuesta = await this.productsService.createProduct(product);
  //     return response.status(HttpStatus.CREATED).json(respuesta);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  /**
   * @putProduct Servicio para editar los elementos de un producto
   * @param sku Recibe el SKU del producto que se va a editar
   * @param product Recibe los parametros completos para la edicion.
   */
  @Put(':sku')
  @UseGuards(AuthGuard('jwt'))
  async putProduct(
    @Param('sku') sku: string,
    @Body() product: DtoProducts,
    @Res() response: Response,
  ) {
    try {
      const respuestaEdicion = await this.productsService.editProduct(
        sku,
        product,
      );
      return response.status(HttpStatus.CREATED).json(respuestaEdicion);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @desactivateProduct Servicio que cambia el estaus de los productos
   * @param sku Recibe el SKU a activar/desactivar
   * @param body  recibe un objeto con estatus true o false
   */
  @Put('status/:sku')
  @UseGuards(AuthGuard('jwt'))
  async desactivateProduct(
    @Param('sku') sku: string,
    @Body() body: { status: boolean },
    @Res() response: Response,
  ) {
    try {
      const respuestaStatus = await this.productsService.softDeleteProduct(
        sku,
        body.status,
      );
      return response.status(HttpStatus.CREATED).json(respuestaStatus);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'foto_principal', maxCount: 1 }]),
  )
  async newProduct(
    @UploadedFiles() files: { foto_principal?: Express.Multer.File[] },
    @Body() product: DtoProductsRequest,
    @Res() response: Response,
  ) {
    try {
      const result = await this.productsService.uploadFileS3(
        files.foto_principal[0],
      );
      const respuesta = await this.productsService.createProduct({
        ...product,
        foto_principal: result.Location,
        fotos: ['test.jpg'],
      });
      return response.status(HttpStatus.CREATED).json(respuesta);
    } catch (error) {
      throw error;
    }
  }
}
