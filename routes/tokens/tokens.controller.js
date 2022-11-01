import express from 'express';

import { readTokens, writeToken, updateToken, deleteToken } from './tokens.service.js';
import { encrypt, decrypt, generateKey } from '../../utils.js';

const route = express.Router();
const store = new Map();
route.get('/', (req, res) => {
  const {
    query: { t },
  } = req;

  if (!t) {
    return res.status(500).end('Tokens param, t, missing from URL');
  }

  try {
    const tokens = readTokens(store, t);
    res.json(tokens);
  } catch (e) {
    return res.status(404).end('Resource does not exist');
  }
});

route.post('/', (req, res) => {
  const {
    body: { secret },
  } = req;

  if (!secret) {
    return res.status(500).end('Secret missing from body.');
  }
  const token = generateKey();
  const data = encrypt(secret, token);
  writeToken(store, token, data);

  return res.status(201).json({ token });
});

route.put('/:token', (req, res) => {
  try {
    const {
      body: { secret },
    } = req;

    const {
      params: { token },
    } = req;

    if (!secret) {
      return res.status(500).end('Secret missing from body');
    }

    const data = encrypt(secret, token);
    updateToken(store, token, data);

    res.status(204).end();
  } catch (e) {
    return res.status(404).end('Resource does not exist');
  }
});

route.delete('/:token', (req, res) => {
  const {
    params: { token },
  } = req;

  try {
    deleteToken(store, token);
    res.status(204).end();
  } catch (e) {
    return res.status(404).end('Resource does not exist');
  }
});

export default route;
