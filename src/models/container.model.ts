import mongoose, { Schema, Model, Document } from 'mongoose';

type ContainerDocument = Document & {
  application: string;
  status: string;
  id: string;
};

type ContainerInput = {
  application: ContainerDocument['application'];
  status: ContainerDocument['status'];
  id: ContainerDocument['id'];
};

const containerSchema = new Schema(
  {
    application: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
    },
    id: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },    
  },
  {
    collection: 'containers',
    timestamps: true,
  },
);

const Container: Model<ContainerDocument> = mongoose.model<ContainerDocument>('Container', containerSchema);

export { Container, ContainerInput, ContainerDocument };
