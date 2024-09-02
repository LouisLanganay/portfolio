import axios from 'axios';

export const getRepository = async (link: string) => {
  const repositoryName = link.split('/').slice(-1)[0];

  const result = await axios
    .get(`https://api.github.com/repos/LouisLanganay/${repositoryName}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (result.status !== 200)
    return null;
  return result.data;
};
