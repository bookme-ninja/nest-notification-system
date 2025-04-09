import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class NotificationDelivery {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Notification', required: true })
    notification: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId;
}

export type NotificationDeliveryDocument = HydratedDocument<NotificationDelivery>;
export const NotificationDeliverySchema = SchemaFactory.createForClass(NotificationDelivery);

// Prevent duplicates
NotificationDeliverySchema.index({ notification: 1, user: 1 }, { unique: true });
