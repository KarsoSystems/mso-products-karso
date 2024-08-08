import { Model } from 'mongoose';
import { Products } from './schemas/products.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DtoProducts } from './dto/products-dto';

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
      return newProduct;
    } catch (error) {
      return error.errorResponse.errmsg;
    }
  }

  /**
   * @getProducts Metodo que devuelve la lista de productos, y verifica los filtros.
   * @param filter se envia un filtro para traer cierto tipo de productos.
   * @returns retorna la lista de productos.
   */
  getProducts(filter: string) {
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
      return error;
    }
  }

  /**
   * @editProduct Metodo para editar las caracteristicas de un producto.
   * @param sku Recibe el sku que se va a editar
   * @param product Recibe los parametros nuevos del SKU.
   */
  async editProduct(sku: string, product: DtoProducts) {
    const edicion = await this.productsModel.replaceOne(
      { sku: Number(sku) },
      product,
    );
    return edicion;
  }

  /**
   * @softDeleteProduct Metodo para desactivar/activer la disponibilidad de un producto
   * @param sku Recibe el SKU que se va a desactivar/activar
   * @param status Recibe el estatustrue/false para la visibilidad del producto
   */
  async softDeleteProduct(sku: string, status: boolean) {
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
      return `Se cambio el estatus del SKU ${sku}  a ${String(status)} `;
    }

    return 'algo salio mal';
  }
}
