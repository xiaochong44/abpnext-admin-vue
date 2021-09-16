import { IdentityRoleService } from './identityRole';
import { IdentityUserService } from './identityUser';
import { ProfileService } from './profile';

const roleService = new IdentityRoleService();
const userService = new IdentityUserService();
const profileService = new ProfileService();
export default {
  IdentityRoleService: roleService,
  IdentityUserService: userService,
  ProfileService: profileService,
};
