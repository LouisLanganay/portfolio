const emojis = [
  {
    'name': 'nodejs',
    'emoji': '/icons/nodejs.png'
  },
  {
    'name': 'react',
    'emoji': '/icons/react.png'
  },
  {
    'name': 'discordjs',
    'emoji': '/icons/discordjs.png'
  },
  {
    'name': 'javascript',
    'emoji': '/icons/javascript.png'
  },
  {
    'name': 'mongodb',
    'emoji': '/icons/mongodb.png'
  },
  {
    'name': 'tailwindcss',
    'emoji': '/icons/tailwindcss.svg'
  },
  {
    'name': 'typescript',
    'emoji': '/icons/typescript.png'
  },
  {
    'name': 'adobe illustrator',
    'emoji': '/icons/adobeillustrator.png'
  },
  {
    'name': 'figma',
    'emoji': '/icons/figma.png'
  },
  {
    'name': 'c',
    'emoji': '/icons/c.png'
  },
  {
    'name': 'postman',
    'emoji': '/icons/postman.png'
  },
  {
    'name': 'sass',
    'emoji': '/icons/sass.png'
  },
  {
    'name': 'nextjs',
    'emoji': '/icons/nextjs.svg'
  },
  {
    'name': 'stripe',
    'emoji': '/icons/stripe.svg'
  }
];

export const getIcon = (name: string) => {
  const icon = emojis.find((emoji) => emoji.name === name.toLowerCase());
  return icon?.emoji;
};
