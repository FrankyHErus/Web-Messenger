import API, { AuthAPI, SigninData, SignupData } from '../api/authApi';
import router from '../utils/router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser().then(id => {
        document.cookie = "id=" + id + "; max-age=3600";
        console.log("Setted id: " + id);
        router.go('/messenger');
        location.reload();
      });
    } catch (e: any) {
        console.log(e);
        alert("Error: " + e["reason"]);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/messenger');

    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() : Promise<Number>{
    const user = await this.api.read();

    return user.id;
  }

  async logout() {
    try {
      await this.api.logout().then(() => {
        document.cookie = "id=;";
      });
      router.go("/sign-in");
      location.reload();
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
