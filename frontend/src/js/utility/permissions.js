import { jwtDecode } from 'jwt-decode'; // đúng cách import



export const hasPermissionAdmin = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.scope === process.env.REACT_APP_ROLE_ADMIN // Assuming the token has a 'permissions' field
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};
