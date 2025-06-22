import mongoose, {Schema, Document} from 'mongoose';

export interface IPhotostrip extends Document {
    filename: string;
    captions?: string;
    timestamp?: Date;
}

const PhotostripSchema: Schema = new Schema<IPhotostrip>({
    filename: { type: String, required: true },
    captions: { type: String, required: false },
    timestamp: { type: Date, required: false }
});

export default mongoose.model<IPhotostrip>('Photostrip', PhotostripSchema);