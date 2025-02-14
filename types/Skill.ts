export interface Skill {
  title: string;
  options: SkillOption[];
}

export interface SkillOption {
  name: string;
  display: boolean;
  description?: string;
}

export default Skill;
