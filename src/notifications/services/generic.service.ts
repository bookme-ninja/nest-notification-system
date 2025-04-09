import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Notification, NotificationDocument } from "../schemas/notifications.schema";
import { User, UserDocument } from "../schemas/user.schema";
import { NotificationTopic, NotificationTopicDocument } from "../schemas/notification_topics.schema";
import { NotificationDelivery, NotificationDeliveryDocument } from "../schemas/notification_deliveries.schema";
import { AddUserDto } from "../dtos/add-user.dto";
import { AddTopicToUserDTO } from "../dtos/add-topic-to-user.dto";
import { AddNotificationDTO } from "../dtos/add-notification-dto";

@Injectable()
export class GenericService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
        @InjectModel(NotificationTopic.name) private readonly notificationTopicModel: Model<NotificationTopicDocument>,
        @InjectModel(NotificationDelivery.name) private readonly notificationDeliveryModel: Model<NotificationDeliveryDocument>,
    ) { }

    async createUser(addUserDto: AddUserDto) {
        const createdUser = new this.userModel(addUserDto);
        return await createdUser.save();
    }

    async createTopic(data: { name: string }) {
        const createdTopic = new this.notificationTopicModel(data);
        return await createdTopic.save();
    }

    async addTopicToUser(addTopicToUserDTO: AddTopicToUserDTO) {
        const user = await this.userModel.findById(addTopicToUserDTO.userId);

        if (!user) {
            throw new Error('User not found');
        }

        const alreadyAdded = user.topics.some(
            (t) => t.toString() === addTopicToUserDTO.topicId
        );

        if (!alreadyAdded) {
            user.topics.push(addTopicToUserDTO.topicId as any);
            await user.save();
        }

        return user;
    }
    async createNotification(addNotificationDto: AddNotificationDTO) {
        if (addNotificationDto.type === 'individual') {
            if (!addNotificationDto.userId) {
                throw new Error('User ID is required for individual notification');
            }
        }

        if (addNotificationDto.type === 'group') {
            if (!addNotificationDto.topicIds || !Array.isArray(addNotificationDto.topicIds) || addNotificationDto.topicIds.length === 0) {
                throw new Error('Topic IDs are required for group notification');
            }
        }

        const createdNotification = new this.notificationModel(addNotificationDto);

        const saved = await createdNotification.save();

        return saved;
    }


}