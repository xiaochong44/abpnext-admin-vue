import { ChangePasswordInput, ProfileDto, UpdateProfileDto } from './model';
import { defHttp } from '/@/utils/http/axios';

export class ProfileService {
  get() {
    return defHttp.get<ProfileDto>({ url: 'api/identity/my-profile' });
  }
  update(profile: UpdateProfileDto) {
    return defHttp.put({ url: 'api/identity/my-profile', data: profile });
  }
  changePassword(input: ChangePasswordInput) {
    return defHttp.post({ url: 'api/identity/my-profile/change-password', data: input });
  }
}
