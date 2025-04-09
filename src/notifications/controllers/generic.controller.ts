import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';

import { GenericService } from '../services/generic.service';
import { AddUserDto } from '../dtos/add-user.dto';
import { AddTopicToUserDTO } from '../dtos/add-topic-to-user.dto';
import { AddNotificationDTO } from '../dtos/add-notification-dto';

@Controller('general')
export class GenericController {
    constructor(private readonly genericService: GenericService) { }

    @Post('/add-user')
    async addUser(@Body() addUserDto: AddUserDto) {
        return await this.genericService.createUser(addUserDto);
    }

    @Post('/add-topic')
    async addTopic(@Body() body: { name: string }) {
        return await this.genericService.createTopic(body);
    }

    @Post('/assign-topic')
    async addTopicToUser(@Body() addTopicToUserDTO: AddTopicToUserDTO) {
        return await this.genericService.addTopicToUser(addTopicToUserDTO);
    }

    @Post('/add-notification')
    async addNotification(@Body() addNotificationDto: AddNotificationDTO) {
        return await this.genericService.createNotification(addNotificationDto);
    }
}