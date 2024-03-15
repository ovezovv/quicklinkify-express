import mongoose, { Schema, Document } from 'mongoose';

interface ILink extends Document {
  username: string;
  url: string;
  shortUrl: string;
  visitCount: number;
  reqLimit: number;
  isExpired: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const LinkSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true, unique: true},
  visitCount: { type: Number, default: 0 },
  reqLimit: { type: Number, default: 10 },
  isExpired: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now},
  createdAt: { type: Date, default: Date.now },
});

export const Link =  mongoose.model<ILink>('Link', LinkSchema);

export const getLinks = () =>  Link.find();
export const getLinkByUsername = (username: string) => Link.findOne({ username });
export const getLinkById = (id: string) => Link.findById(id);
export const createLink = (values: Record<string, any>) => new Link(values).save().then((link) => link.toObject());
export const updateLinkById = (id: string, values: Record<string, any>) => Link.findByIdAndUpdate(id, values);
export const deleteLinkById = (id: string) => Link.findByIdAndDelete({ _id: id });

