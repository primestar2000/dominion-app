import { churchBranch } from "./church-branches-types";

export type UserProfile = {
  id: string;
  user_id: string;
  role: string;
  email: string;
  phone: string;
  name: string;
  church_branch: churchBranch;
};
