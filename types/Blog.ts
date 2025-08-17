interface Article {
  title: string;
  description: string;
  content: string;
  image?: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  tools: string[];
  repository?: string;
  published: boolean;
  slug: string;
  id?: string;
}

export default Article;
