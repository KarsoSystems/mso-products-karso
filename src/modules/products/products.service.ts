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

  async createProduct(product: DtoProducts) {
    try {
      const newProduct = new this.productsModel(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      return error.errorResponse.errmsg;
    }
  }

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

  async editProduct(sku: string, product: DtoProducts) {
    const edicion = await this.productsModel.replaceOne(
      { sku: Number(sku) },
      product,
    );
    console.log(edicion);
  }
}
