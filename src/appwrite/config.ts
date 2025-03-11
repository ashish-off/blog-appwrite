import conf from "../conf/conf";
import { Client, Databases, Storage, Query } from "appwrite";

interface createPostType {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}

interface postType {
  title: string;
  content: string;
  featuredImage: string;
  status: string;
}

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: createPostType) {
    try {
      const response = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      console.log("Post created:", response);
      return response;
    } catch (error) {
      console.log("Appwrite createPost Error : ", error);
      throw error;
    }
  }

  async updatePost(slug: string, post: postType) {
    const { title, content, featuredImage, status } = post;
    try {
      const response = await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // document id
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      console.log("Post updated:", response);
      return response;
    } catch (error) {
      console.log("Appwrite updatePost Error : ", error);
      throw error;
    }
  }

  async deletePost(slug: string) {
    try {
      const response = await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      console.log("Post deleted:", response);
      return true;
    } catch (error) {
      console.log("Appwrite deletePost Error : ", error);
      return false;
    }
  }

  async getPost(slug: string) {
    try {
      const response = await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      console.log("Post deleted:", response);
      return response;
    } catch (error) {
      console.log("Appwrite getPost Error : ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const response = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      return response;
    } catch (error) {
      console.log("Appwrite getPosts Error : ", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
