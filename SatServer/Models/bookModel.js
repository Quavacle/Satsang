const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    authors: [{ type: String }],
    published: { type: Date },
    description: { type: String },
    genres: [{ type: String }],
    imageLinks: { type: Object },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.models.Book || mongoose.model('Book', BookSchema)
