import {
    IsArray,
    IsIn,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class AddNotificationDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;

    @IsNotEmpty()
    @IsIn(['general', 'individual', 'group'])
    type: 'general' | 'individual' | 'group';

    @IsOptional()
    @IsMongoId()
    userId?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    topicIds?: string[];

    @IsOptional()
    @IsString()
    actionUrl?: string;
}
