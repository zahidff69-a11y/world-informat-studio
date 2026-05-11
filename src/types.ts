export interface UserProfile {
  fullName: string;
  mobile: string;
  birthday: string;
  gender: "male" | "female" | "other";
  bio?: string;
  email: string;
  createdAt: number;
}

export type ViewType = "home" | "login" | "signup" | "history";
