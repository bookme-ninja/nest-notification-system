import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Notification, NotificationDocument } from "../schemas/notifications.schema";
import { User, UserDocument } from "../schemas/user.schema";
import { NotificationDelivery, NotificationDeliveryDocument } from "../schemas/notification_deliveries.schema";
import { NotificationTopic, NotificationTopicDocument } from "../schemas/notification_topics.schema";

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
        @InjectModel(NotificationTopic.name) private readonly notificationTopicModel: Model<NotificationTopicDocument>,
        @InjectModel(NotificationDelivery.name) private readonly notificationDeliveryModel: Model<NotificationDeliveryDocument>,
    ) { }

    async processAllNotifications() {
        const unsentNotifications = await this.notificationModel.find({ sent: false });

        for (const notification of unsentNotifications) {
            let recipientUsers: any[] = [];

            if (notification.type === 'general') {
                recipientUsers = await this.userModel.find();
            }

            if (notification.type === 'individual' && notification.userId) {
                const user = await this.userModel.findById(notification.userId);
                if (user) recipientUsers = [user];
            }

            if (notification.type === 'group' && notification.topicIds?.length) {
                recipientUsers = await this.userModel.find({
                    topics: { $in: notification.topicIds },
                }).lean();

                // Remove duplicates (in case user is in multiple topics)
                const uniqueUserMap = new Map();
                for (const user of recipientUsers) {
                    uniqueUserMap.set(user._id.toString(), user);
                }
                recipientUsers = Array.from(uniqueUserMap.values());
            }

            for (const user of recipientUsers) {
                console.log(`Sending to ${user.username || user.email}: ${notification.title}`);
            }

            notification.sent = true;
            await notification.save();
        }

        return { success: true, processed: unsentNotifications.length };
    }

    async getUserNotifications(userId: string) {
        const user = await this.userModel.findById(userId).select('topics');
        if (!user) throw new Error('User not found');

        const notifications = await this.notificationModel.find({
            $or: [
                { type: 'general' },
                { type: 'individual', userId },
                {
                    type: 'group',
                    topicIds: { $in: user.topics },
                },
            ],
        }).sort({ createdAt: -1 });

        return notifications;
    }
}