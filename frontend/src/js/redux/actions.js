export const SAVE_TOKEN = 'SAVE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const SAVE_AVATAR_URL = 'SAVE_AVATAR_URL';
export const DELETE_AVATAR_URL = 'DELETE_AVATAR_URL';

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  payload: token
});

export const deleteToken = () => ({
  type: DELETE_TOKEN
});

export const saveAvatarUrl = (avatarUrl) => ({
  type: SAVE_AVATAR_URL,
  payload: avatarUrl
});

export const deleteAvatarUrl = () => ({
  type: DELETE_AVATAR_URL
});