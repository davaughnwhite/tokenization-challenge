import { decrypt } from '../../utils.js';

export const readTokens = (store, tokens) => {
  return tokens
    .split(',')
    ?.map((token) => {
      if (!store.has(token)) {
        throw new Error('Invalid token');
      }

      return { [token]: decrypt(store.get(token), token) };
    })
    ?.reduce((a, b) => ({ ...a, ...b }), {});
};

export const writeToken = (store, key, data) => {
  store.set(key, data);
};

export const updateToken = (store, key, data) => {
  if (!store.has(key)) {
    throw new Error('Invalid token');
  }

  store.set(key, data);
};

export const deleteToken = (store, key) => {
  if (!store.has(key)) {
    throw new Error('Invalid token');
  }

  store.delete(key);
};
