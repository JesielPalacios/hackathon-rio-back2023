import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUsertRequest {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  secondName?: string;

  @IsString()
  @IsNotEmpty()
  firstSurname: string;

  secondSurname?: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @Min(8)
  password: string;

  @IsNotEmpty()
  preferences: any[];
}

export class UpdateProductRequest {
  description?: string;

  @Min(1)
  price?: number;

  stock?: number;
}
