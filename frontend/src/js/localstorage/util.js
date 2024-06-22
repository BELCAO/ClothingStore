export const getTokenLS = () => {
    return localStorage.getItem('token');
};

export const setTokenLS = (token) => {
    localStorage.setItem('token', token);
};