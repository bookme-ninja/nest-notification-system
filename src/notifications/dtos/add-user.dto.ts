import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class AddUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    fcmToken?: string;
}
