const mongoose = require('mongoose');
const { Schema } = mongoose;

const Page = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15,
    },
    description: {
      type: String,
      maxlength: 50,
    },
    creationDate: {
      type: String,
      maxlength: 50,
    },
    websiteType: {
      type: String,
      maxlength: 50,
    },
    numberPages: {
      type: String,
      maxlength: 50,
    },
    industry: {
      type: String,
      maxlength: 50,
    },
    targetAudience: {
      type: String,
      maxlength: 50,
    },
    language: {
      type: String,
      maxlength: 50,
    },
    slug: {
      type: String,
      required: true,
    },
    content: Object,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Pages', Page);
