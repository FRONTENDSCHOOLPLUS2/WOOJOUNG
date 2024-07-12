export interface User {
  profileImage: string | null;
  name: string;
  token: string | null;
  accessToken: string | null;
}

export interface AuthState {
  isLoggedIn?: boolean | null;
  user: User | null;
  token: string | null;
  accessToken?: string | null;
}
// Button.tsx
export interface Comment {
  _id: string;
  user: User;
  content: string;
  createdAt: string; // 또는 Date 타입을 사용할 수 있습니다
}

export interface Reply {
  _id: string;
}

// CommentItem 컴포넌트의 Props 타입
export interface CommentItemProps {
  name: string;
  content: string;
  time: string; // 또는 Date 타입을 사용할 수 있습니다
  userInfo: User;
  reply: string;
  alldata: Comment;
}
