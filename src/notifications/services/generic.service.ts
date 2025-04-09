import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Notification, NotificationDocument } from "../schemas/notifications.schema";
import { User, UserDocument } from "../schemas/user.schema";
import { NotificationTopic, NotificationTopicDocument } from "../schemas/notification_topics.schema";

@Injectable()
export class GenericService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
        @InjectModel(NotificationTopic.name) private readonly notificationTopicModel: Model<NotificationTopicDocument>,
    ) { }

    async createUser(data: { name: "", fcmToken: "" }) {
        const createdUser = new this.userModel(data);
        return await createdUser.save();
    }

    async createTopic(data: { name: "" }) {
        const createdTopic = new this.notificationTopicModel(data);
        return await createdTopic.save();
    }

    async addTopicToUser(userId: string, topicId: string) {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const alreadyAdded = user.topics.some(
            (t) => t.toString() === topicId
        );

        if (!alreadyAdded) {
            user.topics.push(topicId as any);
            await user.save();
        }

        return user;
    }
    async createNotification(data: {
        title: string;
        body: string;
        type: 'general' | 'individual' | 'group';
        userId?: string; // for individual
        topicIds?: string[]; // for group
        actionUrl?: string;
    }) {
        const { title, body, type, userId, topicIds, actionUrl } = data;

        let extraInfo: string | null = null;

        if (type === 'individual') {
            if (!userId) throw new Error('User ID is required for individual notification');
            extraInfo = userId;
        }

        if (type === 'group') {
            if (!topicIds || !Array.isArray(topicIds) || topicIds.length === 0) {
                throw new Error('Topic IDs are required for group notification');
            }
            extraInfo = JSON.stringify(topicIds);
        }

        const createdNotification = new this.notificationModel({
            title,
            body,
            type,
            userId,
            topicIds,
            actionUrl,
        });

        const saved = await createdNotification.save();

        return saved;
    }

}