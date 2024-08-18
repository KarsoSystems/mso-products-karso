import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class DtoProducts {
  @IsNumber()
  @IsNotEmpty()
  sku: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  descripcion_larga: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsString()
  @IsNotEmpty()
  foto_principal: string;

  @IsArray()
  @IsNotEmpty()
  fotos: string[];

  @IsBoolean()
  @IsNotEmpty()
  top: boolean;

  @IsBoolean()
  @IsNotEmpty()
  disponible: boolean;

  @IsBoolean()
  @IsNotEmpty()
  visible: boolean;
}

export class DtoProductsRequest {
  @IsNumber()
  @IsNotEmpty()
  sku: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  descripcion_larga: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsBoolean()
  @IsNotEmpty()
  top: boolean;

  @IsBoolean()
  @IsNotEmpty()
  disponible: boolean;

  @IsBoolean()
  @IsNotEmpty()
  visible: boolean;
}
