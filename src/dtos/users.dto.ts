import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['admin', 'app'])
  public role: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public password: string;
}
