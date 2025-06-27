import User from "./User";

interface CommentType {
  id: number;
  text: string;
  author: User;
  date: string;
}

export default CommentType;
