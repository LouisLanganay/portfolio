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
  c,
  postman,
  sass
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
  },
  {
    'name': 'postman',
    'emoji': postman
  },
  {
    'name': 'sass',
    'emoji': sass
  }
];

const getIcon = (name: string) => {
  const icon = emojis.find((emoji) => emoji.name === name.toLowerCase());
  return icon?.emoji;
};

export default getIcon;
