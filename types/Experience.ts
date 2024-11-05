export interface Experience {
  type?: string | 'job' | 'educational';
  title: string;
  location: string;
  date: string;
  description?: string;
  image?: string;
  technologies?: string[];
}

export default Experience;
