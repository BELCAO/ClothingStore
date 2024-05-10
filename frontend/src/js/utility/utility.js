import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteAvatarUrl, deleteToken, deleteUserName } from '../redux/actions';

export const useLogOut = () => {
  const dispatch = useDispatch();
  return useCallback((data) => dispatch(saveData(data)), [dispatch]);
};

export const useDeleteData = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(deleteData()), [dispatch]);
};
