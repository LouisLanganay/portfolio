import {
  nodejs,
  react,
  discordjs,
  javascript,
  mongodb,
  tailwindcss,
  typescript,
  adobeillustrator,
  figma,
  c
} from '../assets/icons/index';

const emojis = [
  {
    'name': 'nodejs',
    'emoji': nodejs
  },
  {
    'name': 'react',
    'emoji': react
  },
  {
    'name': 'discordjs',
    'emoji': discordjs
  },
  {
    'name': 'javascript',
    'emoji': javascript
  },
  {
    'name': 'mongodb',
    'emoji': mongodb
  },
  {
    'name': 'tailwindcss',
    'emoji': tailwindcss
  },
  {
    'name': 'typescript',
    'emoji': typescript
  },
  {
    'name': 'adobe illustrator',
    'emoji': adobeillustrator
  },
  {
    'name': 'figma',
    'emoji': figma
  },
  {
    'name': 'c',
    'emoji': c
  }
];

const getIcon = (name: string) => {
  const icon = emojis.find((emoji) => emoji.name === name.toLowerCase());
  return icon?.emoji;
};

export default getIcon;
