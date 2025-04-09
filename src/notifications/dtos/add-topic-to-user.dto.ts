import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AddTopicToUserDTO {
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @IsMongoId()
    @IsNotEmpty()
    topicId: string;
}

