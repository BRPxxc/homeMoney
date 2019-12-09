export class AuthService {

  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
  }

  logOut() {
    this.isAuthenticated = false;
    window.localStorage.clear()
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
