export const SAVE_TOKEN = 'SAVE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const SAVE_AVATAR_URL = 'SAVE_AVATAR_URL';
export const DELETE_AVATAR_URL = 'DELETE_AVATAR_URL';
export const SAVE_USER_NAME = 'SAVE_USER_NAME';
export const DELETE_USER_NAME = 'DELETE_USER_NAME';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const DELETE_USER_INFO = 'DELETE_USER_INFO';

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

export const saveUserName = (userName) => ({
  type: SAVE_USER_NAME,
  payload: userName
});

export const deleteUserName = () => ({
  type: DELETE_USER_NAME
});

export const saveUserInfo = (userInfo) => ({
  type: SAVE_USER_INFO,
  payload: userInfo
});

export const deleteUserInfo =() => ({
  type: DELETE_USER_INFO,
});
