import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

interface createAccountType {
  email: string;
  password: string;
  name: string;
}

interface loginType {
  email: string;
  password: string;
}

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }: createAccountType) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("User registered/ created:", userAccount);

      if (userAccount) {
        // call login method
        const loginResponse = await this.login({ email, password });
        return loginResponse;
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Appwrite createAccount Error : ", error);
      throw error;
    }
  }

  async login({ email, password }: loginType) {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("User logged in:", response);
      return response;
    } catch (error) {
      console.error("Appwrite login Error : ", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = this.account.get();
      console.log("Current User:", currentUser);
      return currentUser;
    } catch (error) {
      console.error("Appwrite getCurrentUser Error : ", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite logout Error : ", error);
      throw error;
    }
  }
}

const authservice = new Authservice();

export default authservice;
