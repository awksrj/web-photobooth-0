import mongoose, {Schema, Document} from 'mongoose';

export interface IPhotostrip extends Document {
    imageUrls: [string];
    caption?: string;
    timestamp?: Date;
}

const PhotostripSchema: Schema = new Schema<IPhotostrip>({
    imageUrls: { type: [String], required: true }, // store comma-separated urls
    caption: { type: String, required: false },
    timestamp: { type: Date, required: false }
});

export default mongoose.model<IPhotostrip>('Photostrip', PhotostripSchema);