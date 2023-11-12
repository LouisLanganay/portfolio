export interface Experience {
  type?: 'job' | 'educational';
  title: string;
  location: string;
  date: string;
  description?: string;
}

export default Experience;
