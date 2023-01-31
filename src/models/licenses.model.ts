import { model, Schema, Document } from 'mongoose';
import { License } from '@/interfaces/licenses.interface';

const licenseSchema: Schema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    activatedOn: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const licenseModel = model<License & Document>('License', licenseSchema);

export default licenseModel;
