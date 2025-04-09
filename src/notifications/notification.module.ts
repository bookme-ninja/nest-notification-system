import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GenericController } from "./controllers/generic.controller";
import { GenericService } from "./services/generic.service";
import { User, UserSchema } from "./schemas/user.schema";
import { Notification, NotificationSchema } from "./schemas/notifications.schema";
import { NotificationTopic, NotificationTopicSchema } from "./schemas/notification_topics.schema";
import { NotificationDelivery, NotificationDeliverySchema } from "./schemas/notification_deliveries.schema";
import { NotificationController } from "./controllers/notification.controller";
import { NotificationService } from "./services/notification.service";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Notification.name, schema: NotificationSchema },
            { name: NotificationTopic.name, schema: NotificationTopicSchema },
            { name: NotificationDelivery.name, schema: NotificationDeliverySchema },
        ]),
    ],
    controllers: [GenericController, NotificationController],
    providers: [GenericService, NotificationService]
})

export class NotificationModule { }