import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    fcmToken: string;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'NotificationTopic' }])
    topics: Types.ObjectId[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
