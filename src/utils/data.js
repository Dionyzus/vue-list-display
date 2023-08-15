import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

import { 
  CATEGORIES, IMAGE_SOURCES, PROVIDERS, RTP_VALUES, VOLATILITIES 
} from '../common/constants';

const MAX_CATEGORIES_COUNT = 3;
const MAX_TITLE_WORDS_COUNT = 2;

export const generateMockData = (count) => {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    title: generateRandomGameTitle(),
    provider: getRandomProvider(),
    categories: getRandomCategories(),
    description: faker.lorem.paragraph(),
    imageSrc: getRandomImage(),
    RTP: getRandomRTPValue(),
    volatility: getRandomVolatility()
  }));
};

const generateRandomGameTitle = () => {
  const wordCount = Math.floor(Math.random() * MAX_TITLE_WORDS_COUNT) + 1;
  const randomWords = faker.lorem.words(wordCount);

  return randomWords;
};

const getRandomProvider = () => {
  const providerValues = Object.values(PROVIDERS);
  const randomIndex = Math.floor(Math.random() * providerValues.length);

  return providerValues[randomIndex];
};

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * IMAGE_SOURCES.length);

  return IMAGE_SOURCES[randomIndex];
};

const getRandomRTPValue = () => {
  const randomIndex = Math.floor(Math.random() * RTP_VALUES.length);

  return RTP_VALUES[randomIndex];
};

const getRandomVolatility = () => {
  const volatilityValues = Object.values(VOLATILITIES);
  const randomIndex = Math.floor(Math.random() * volatilityValues.length);

  return volatilityValues[randomIndex];
};

const getRandomCategories = () => {
  const categoriesCount = Math.floor(Math.random() * MAX_CATEGORIES_COUNT) + 1;

  const randomCategories = Array.from({ length: categoriesCount }, () => {
    const categoryValues = Object.values(CATEGORIES);
    const randomIndex = Math.floor(Math.random() * categoryValues.length);

    return categoryValues[randomIndex];
  });

  return Array.from(new Set(randomCategories));
};
