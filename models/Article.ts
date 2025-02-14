import Article from '@/types/Blog';
import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema<Article>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  publishedAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }],
  tools: [{ type: String }],
  repository: { type: String },
  published: { type: Boolean, default: true }
});

ArticleSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = new Date().toISOString();
  }
  next();
});

export default mongoose.models.Article || mongoose.model<Article>('articles', ArticleSchema);
