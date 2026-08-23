export type User = {
  id: number;
  name: string;
  profilePicture?: string;
  email?: string;
  createdAt: string;
  provider: "GUEST" | "GOOGLE";
};
