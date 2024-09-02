export interface Experience {
  type?: string | 'job' | 'educational';
  title: string;
  location: string;
  date: string;
  description?: string;
  image?: string;
}

export default Experience;
