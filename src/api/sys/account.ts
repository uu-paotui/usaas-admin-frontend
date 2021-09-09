import { defHttp } from '/@/utils/http/axios';
import { GetAccountInfoModel } from '../model/accountModel';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',

  AccountTableList = '/v1/system/user/list',
  AccountTableCreate = '/v1/system/user/create',
  AccountTableModify = '/v1/system/user/',
  AccountTableDelete = '/v1/system/user/',
}

// Get personal center-basic settings

export const accountInfoApi = () => defHttp.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });

export const sessionTimeoutApi = () => defHttp.post<void>({ url: Api.SESSION_TIMEOUT });

export const apiAccountTableList = (params) =>
  defHttp.get<void>({ url: Api.AccountTableList, params });

export const apiAccountTableCreate = (params: any) =>
  defHttp.post<void>({ url: Api.AccountTableCreate, params });

export const apiAccountTableModify = (id: number, params: any) =>
  defHttp.put<void>({ url: Api.AccountTableModify + id, params });

export const apiAccountTableDelete = (id: number) =>
  defHttp.delete<void>({ url: Api.AccountTableDelete + id });
