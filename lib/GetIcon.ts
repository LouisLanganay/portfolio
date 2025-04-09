const emojis = [
  {
    'name': ['nodejs', 'node'],
    'emoji': '/icons/nodejs.png'
  },
  {
    'name': ['react'],
    'emoji': '/icons/react.png'
  },
  {
    'name': ['discordjs'],
    'emoji': '/icons/discordjs.png'
  },
  {
    'name': ['javascript'],
    'emoji': '/icons/javascript.png'
  },
  {
    'name': ['mongodb'],
    'emoji': '/icons/mongodb.png'
  },
  {
    'name': ['tailwindcss'],
    'emoji': '/icons/tailwindcss.svg'
  },
  {
    'name': ['typescript'],
    'emoji': '/icons/typescript.png'
  },
  {
    'name': ['adobe illustrator', 'illustrator'],
    'emoji': '/icons/adobeillustrator.png'
  },
  {
    'name': ['figma'],
    'emoji': '/icons/figma.png'
  },
  {
    'name': ['c'],
    'emoji': '/icons/c.png'
  },
  {
    'name': ['postman'],
    'emoji': '/icons/postman.png'
  },
  {
    'name': ['sass'],
    'emoji': '/icons/sass.png'
  },
  {
    'name': ['nextjs'],
    'emoji': '/icons/nextjs.svg'
  },
  {
    'name': ['stripe'],
    'emoji': '/icons/stripe.svg'
  },
  {
    'name': ['c++'],
    'emoji': '/icons/cpp.png'
  },
  {
    'name': ['photoshop'],
    'emoji': '/icons/photoshop.png'
  },
  {
    'name': ['linux'],
    'emoji': '/icons/linux.png'
  },
  {
    'name': ['git'],
    'emoji': '/icons/git.png'
  },
  {
    'name': ['angular'],
    'emoji': '/icons/angular.png'
  },
  {
    'name': ['vite', 'vitejs'],
    'emoji': '/icons/vite.svg'
  },
  {
    'name': ['nestjs', 'nest'],
    'emoji': '/icons/nestjs.svg'
  },
  {
    'name': ['capacitors', 'capacitor', 'capacitorjs'],
    'emoji': '/icons/capacitor.svg'
  },
  {
    'name': ['prisma'],
    'emoji': '/icons/prisma.svg'
  },
  {
    'name': ['php'],
    'emoji': '/icons/php.svg'
  },
  {
    'name': ['python'],
    'emoji': '/icons/python.svg'
  },
  {
    'name': ['docker'],
    'emoji': '/icons/docker.svg'
  },
  {
    'name': ['openai'],
    'emoji': '/icons/openai.svg'
  },
  {
    'name': ['mysql', 'sql'],
    'emoji': '/icons/mysql.svg'
  },
  {
    'name': ['java'],
    'emoji': '/icons/java.svg'
  },
];

export const getIcon = (name: string) => {
  const icon = emojis.find((emoji) =>
    emoji.name.some(n => n === name.toLowerCase())
  );
  return icon?.emoji;
};
