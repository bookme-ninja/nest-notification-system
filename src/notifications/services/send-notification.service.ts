import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Notification, NotificationDocument } from "../schemas/notifications.schema";
import { User, UserDocument } from "../schemas/user.schema";
import { NotificationDelivery } from "../schemas/notification_deliveries.schema";

