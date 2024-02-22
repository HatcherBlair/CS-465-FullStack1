import { Inject, Injectable } from "@angular/core";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";
import { AuthResponse } from "../models/authresponse";
import { TripDataService } from "./trip-data.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Retrieves a token from localStorage
  public getToken(): string {
    return this.storage.getItem("travlr-token");
  }

  // Save a token in localStorage
  public saveToken(token: string): void {
    this.storage.setItem("travlr-token", token);
  }

  // Logs a user in
  public login(user: User): Promise<any> {
    return this.tripDataService
      .login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  // Registers a new user
  public register(user: User): Promise<any> {
    return this.tripDataService
      .register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  // Logs a user out
  public logout(): void {
    this.storage.removeItem("travlr-token");
  }

  // Returns user login status
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    }

    return false;
  }

  // Gets the currently logged in user
  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split(".")[1]));
      return { email, name } as User;
    }
  }
}
