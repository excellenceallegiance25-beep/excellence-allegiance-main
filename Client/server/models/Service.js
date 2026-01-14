import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  icon: {
    type: String,
    default: '🚀'
  },
  features: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create index for better query performance
serviceSchema.index({ order: 1, isActive: 1 });

const Service = mongoose.model('Service', serviceSchema);
export default Service;