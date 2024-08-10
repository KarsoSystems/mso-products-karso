import { Model } from 'mongoose';
import { folio } from 'src/utils/functions';
import { Products } from './schemas/products.schema';
import { InjectModel } from '@nestjs/mongoose';
import { DtoProducts } from './dto/products-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<Products>,
  ) {}

  /**
   * @createProduct Metodo para crear un producto nuevo
   * @param product Recibe los parametros para crear un producto
   */
  async createProduct(product: DtoProducts) {
    try {
      const newProduct = new this.productsModel(product);
      await newProduct.save();
      return {
        folio: folio(),
        mensaje: 'Operación exitosa',
        detalles: `El SKU ${product.sku} se creo correctamente.`,
        resultado: null,
      };
    } catch (error) {
      // return error.errorResponse.errmsg;
      throw new HttpException(
        {
          folio: folio(),
          mensaje: 'Ocurrio un error',
          detalles: error.message,
          resultado: null,
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  /**
   * @getProducts Metodo que devuelve la lista de productos, y verifica los filtros.
   * @param filter se envia un filtro para traer cierto tipo de productos.
   * @returns retorna la lista de productos.
   */
  async getProducts(filter: string) {
    try {
      if (filter === 'visible') {
        return this.productsModel.find({ disponible: true, visible: true });
      }

      if (filter === 'disponible') {
        return this.productsModel.find({ disponible: true });
      }

      if (filter === 'top') {
        return this.productsModel.find({ disponible: true, top: true });
      }

      return this.productsModel.find({});
    } catch (error) {
      throw new HttpException(
        {
          folio: folio(),
          mensaje: 'Ocurrio un error',
          detalles: error.message,
          resultado: null,
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  /**
   * @editProduct Metodo para editar las caracteristicas de un producto.
   * @param sku Recibe el sku que se va a editar
   * @param product Recibe los parametros nuevos del SKU.
   */
  async editProduct(sku: string, product: DtoProducts) {
    try {
      await this.productsModel.replaceOne({ sku: Number(sku) }, product);
      return {
        folio: folio(),
        mensaje: 'Operación exitosa',
        detalles: `El SKU ${sku} de modificó correctamente.`,
        resultado: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          folio: folio(),
          mensaje: 'Ocurrio un error',
          detalles: error.message,
          resultado: null,
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  /**
   * @softDeleteProduct Metodo para desactivar/activer la disponibilidad de un producto
   * @param sku Recibe el SKU que se va a desactivar/activar
   * @param status Recibe el estatustrue/false para la visibilidad del producto
   */
  async softDeleteProduct(sku: string, status: boolean) {
    try {
      const getProduct = await this.productsModel.find({ sku: sku });
      if (getProduct[0]) {
        await this.productsModel.updateOne(
          {
            sku: Number(sku),
          },
          {
            $set: {
              disponible: status,
            },
          },
        );
        return {
          folio: folio(),
          mensaje: 'Operación exitosa',
          detalles: `El SKU ${sku} paso a estatus ${status}.`,
          resultado: null,
        };
      }
      throw new Error('El sku no existe');
    } catch (error) {
      throw new HttpException(
        {
          folio: folio(),
          mensaje: 'Ocurrio un error',
          detalles: error.message,
          resultado: null,
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }
}
