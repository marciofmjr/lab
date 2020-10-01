export default {
  getToken() {
    return window.localStorage.tkn;
  },
  setToken(token) {
    window.localStorage.tkn = token;
  },
  setUser(user) {
    window.localStorage.usr = JSON.stringify(user);
  },
  getUser() {
    if (window.localStorage.usr) {
      return JSON.parse(window.localStorage.usr);
    }
    return {};
  },
  logout() {
    window.localStorage.removeItem("tkn");
    window.localStorage.removeItem("usr");
    window.location.href = "/";
  },
  hasPermission(permissions) {
    const user = this.getUser();
    let hasPermission = false;

    if (user && user.permissions && user.permissions.length) {
      user.permissions.forEach(userPermission => {
        if (permissions.includes(userPermission)) {
          hasPermission = true;
        }
      });
    }

    return hasPermission;
  }
};
