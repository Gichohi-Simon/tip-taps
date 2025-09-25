export interface CreatePostInput {
  title: string;
  content: string;
  authorId?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface PostInterface {
  id: string;
  title: string;
  content: string; 
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: User; 
};