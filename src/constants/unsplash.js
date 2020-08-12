import Unsplash from 'unsplash-js';
import {UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY} from '@env';
export const unsplash = new Unsplash({
  accessKey: UNSPLASH_ACCESS_KEY,
  secretKey: UNSPLASH_SECRET_KEY,
});
