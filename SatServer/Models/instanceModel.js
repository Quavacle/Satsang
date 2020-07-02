const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    condition: { type: String },
    notes: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    borrowed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    requested_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    pending_return: { type: Boolean, default: false },
    return_by: { type: Date },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Instance || mongoose.model('Instance', instanceSchema);
