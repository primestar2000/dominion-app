import { churchBranch } from "./church-branches-types";

// export type UserProfileTtype = {
//   user_id: string;
//   role: string;
//   email: string;
//   phone: string;
//   name: string;
//   church_branch: churchBranch;
//   address: string;
//   profile_picture: string;
// };


export type userProfileType = {
    address: string;
    church_branch: string;
    created_at: string;
    id: string;
    name: string;
    phone: string | null; 
    profile_picture: null
    role: string;
    user_id: string;
}