import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { v4 as uuid } from "uuid";

export class Video {
  @prop()
  public title: string;

  @prop()
  public description: string;

  @prop({ enum: ["mp4", "mov", "quicktime"] })
  public extension: string;

  @prop({ unique: true, default: () => uuid() })
  public videoId: string;

  @prop({ default: false })
  public published: boolean;

  @prop()
  public thumbnail: any;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
