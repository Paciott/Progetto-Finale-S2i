export interface Post {
  post: Comment;
  _id: string;
  username: string;
  title: string;
  content: string;
  likes: { [key: string]: bool };
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  location: string;
  userId: string;
}

export interface Comment {
  creatorUsername: string;
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
}

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  location: string;
  occupation: string;
}
