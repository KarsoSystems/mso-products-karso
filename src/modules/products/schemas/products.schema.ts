import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Products {
  @Prop({ type: Number, unique: true, trim: true, required: true })
  sku: number;

  @Prop({ type: String, trim: true, required: true })
  descripcion: string;

  @Prop({ type: String, trim: true, required: true })
  descripcion_larga: string;

  @Prop({ type: Number, trim: true, required: true })
  precio: number;

  @Prop({ type: String, trim: true, required: true })
  foto_principal: string;

  @Prop({ type: Array })
  fotos: string[];

  @Prop({ type: Boolean, required: true })
  top: boolean;

  @Prop({ type: Boolean, required: true })
  disponible: boolean;

  @Prop({ type: Boolean, required: true })
  visible: boolean;
}

export const productsSchema = SchemaFactory.createForClass(Products);
