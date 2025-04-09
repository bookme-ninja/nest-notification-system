import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type NotificationType = 'general' | 'individual' | 'group';

@Schema({ timestamps: true })
export class Notification {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    body: string;

    @Prop({ enum: ['general', 'individual', 'group'], required: true })
    type: NotificationType;

    // For individual notifications
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null })
    userId?: Types.ObjectId;

    // For group notifications
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'NotificationTopic' }])
    topicIds?: Types.ObjectId[];

    @Prop()
    actionUrl?: string;

    @Prop({ default: false })
    sent: boolean;

}

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
