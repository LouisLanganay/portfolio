interface Project {
  title: string;
  description: string;
  links?: {
    name: string;
    url: string;
  }[];
  image?: string;
  date: string;
  tags: string[];
  tools: string[];
  stats?: {
    users?: {
      value: string;
      tooltip?: string;
    }
    downloads?: {
      value: string;
      tooltip?: string;
    }
  },
  repository?: string;
}

export default Project;
