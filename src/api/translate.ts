
import { Translate } from '@google-cloud/translate/build/src/v2';

const translate = new Translate({
  projectId: 'crack-flight-344019'
});

export const translateText = async (text: string, targetLanguage: string) => {
  const [translation] = await translate.translate(text, targetLanguage);
  return translation;
};
