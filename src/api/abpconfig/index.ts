import { ApplicationConfigurationDto } from './model';
import { defHttp } from '/@/utils/http/axios';

export const getAbpConfig = () =>
  defHttp.get<ApplicationConfigurationDto>({ url: 'api/abp/application-configuration' });
