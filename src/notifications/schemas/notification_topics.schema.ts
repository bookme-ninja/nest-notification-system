import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class NotificationTopic {
    @Prop({ required: true, unique: true })
    name: string;
}

export type NotificationTopicDocument = HydratedDocument<NotificationTopic>;
export const NotificationTopicSchema = SchemaFactory.createForClass(NotificationTopic);
