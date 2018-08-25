export const setLocalStorage = value => {
    localStorage.setItem('saved-url', JSON.stringify(value));
};
  
export const getLocalStorage = () => {
    const data = localStorage.getItem('saved-url');

    return data ? JSON.parse(data) : null;
};

export const removeFromLocalStorage = () => {
    localStorage.removeItem('saved-url');
};