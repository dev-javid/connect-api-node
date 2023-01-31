import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateLicenseDto {
  @IsNotEmpty()
  public phone: string;
}

export class UpdateLicenseDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['activate'])
  public status: string;
}
