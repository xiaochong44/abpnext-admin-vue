import { defHttp } from '/@/utils/http/axios';
import oauthConfig from './config';
import qs from 'qs';
declare type TokenResult = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scop: string;
};

export const login = (username: string, password: string) => {
  const data = qs.stringify({ username: username, password: password, ...oauthConfig });
  //return axios.post(prefix+'connect/token',data,{headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }})
  return defHttp.post<TokenResult>({
    url: 'connect/token?',
    data: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  //return defHttp.post<TokenResult>({url:'/api/account/login',params:{userNameOrEmailAddress:username,password:password,rememberMe:true}})
};
