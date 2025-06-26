export interface User {
  id?: string;
  username: string;
  email?: string;
}

export default interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  user: User; 
}
