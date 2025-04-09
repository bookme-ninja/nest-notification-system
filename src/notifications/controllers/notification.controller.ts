import { Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Get(':userId')
    async getUserNotifications(@Param('userId') userId: string) {
        return this.notificationService.getUserNotifications(userId);
    }

    @Post('process')
    async processAllNotifications() {
        return this.notificationService.processAllNotifications();
    }

}
