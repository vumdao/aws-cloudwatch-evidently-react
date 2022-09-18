export const localStore = {
    set: (key, val) => {
      return localStorage.setItem(key, JSON.stringify(val));
    },
    remove: (key) => {
      return localStorage.removeItem(key);
    },
    get: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
    clear: () => {
      return localStorage.clear();
    }
};