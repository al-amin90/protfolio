import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink?: string;
  sourceLink?: string;
  order: number;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], default: [] },
    liveLink: { type: String },
    sourceLink: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Project: Model<IProject> =
  (mongoose.models.Project as Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
