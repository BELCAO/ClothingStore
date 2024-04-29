export const SAVE_TOKEN = 'SAVE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  payload: token
});

export const deleteToken = () => ({
  type: DELETE_TOKEN
});
