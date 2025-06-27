import Like from "./Like";
import User from "./User";


export default interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  user: User;
  likes?: Like[];
  comments?: Comment[];
}
