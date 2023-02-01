export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class CreateUserDto extends LoginUserDto {
    role: string;
    name: string;
}
export declare class UpdateUserDto {
    password: string;
}
