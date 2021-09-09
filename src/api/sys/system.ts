import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  MenuStatusParams, ModulePageListGetResultModel, ModulePageParams
} from '../model/systemModel';
import { defHttp } from '/@/utils/http/axios';

// 接口命名:当前页面名称+模块名称+功能   eg:部门管理中表单的删除功能: 部门管理:Dept+表单:Table+删除:Delete  DeptTableDelete
//暴露出去的+api    apiDeptTableDelete

enum Api {
  AccountList = '/v1/system/getAccountList',
  IsAccountExist = '/v1/system/user/exist',
  setRoleStatus = '/v1/system/setRoleStatus',
  MenuList = '/v1/system/permission/list',
  MenuTreeList = '/v1/system/permission/tree',
  RolePageList = '/v1/system/getRoleListByPage',
  GetAllRoleList = '/v1/system/getAllRoleList',

  //部门管理
  DeptTableList = '/v1/system/department/list',
  DeptTableCreate = '/v1/system/department/create',
  DeptTableModify = '/v1/system/department/',
  DeptTableDelete = '/v1/system/department/',

  //角色管理
  RoleTableList = '/v1/system/role/list',
  RoleTreeList = '/v1/system/role/role_tree',
  RoleTableCreate = '/v1/system/role/create',
  RoleTableModify = '/v1/system/role/',
  RoleTableDelete = '/v1/system/role/',

  //菜单管理
  MenuTableList = '/v1/system/permission/list',
  MenuStatusSwitch = '/v1/system/permission/status',
  MenuTableCreate = '/v1/system/permission/create',
  MenuTableModify = '/v1/system/permission/',
  MenuTableDelete = '/v1/system/permission/',

  //系统配置
  GetConfig = '/v1/system/config',
  GetConfigTableList = '/v1/system/config/list',
  ConfigTable = '/v1/system/config/',
  ConfigTableCreate = '/v1/system/config/create',

  //限流管理
  RateLimiterList = '/v1/system/rate_limiter/list',
  RateLimiterCreate = '/v1/system/rate_limiter/create',
  RateLimiter = '/v1/system/rate_limiter/',

  //模型管理
  GetModuleTableList = '/v1/system/rate_limiter/list',
  //模型管理
  ModuleTableList = '/v1/system/module/list',
  ModuleTreeList = '/v1/system/module/tree',
  ModuleTableCreate = '/v1/system/module/create',
  ModuleTableModify = '/v1/system/module/',
  ModuleTableDelete = '/v1/system/module/',

}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getMenuTreeList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuTreeList, params });

// .then((res) => {
//   // @ts-ignore
//   return res.map((res) => {
//     return {
//       id: res.permission_id,
//       name: res.name,
//       orderNo: res.order,
//       createTime: res.created_at,
//       status: res.status,
//       icon: res.icon,
//       component:  res.component,
//       permission: res.permission
//     };
//   });
// });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (username: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { username } }, { errorMessageMode: 'none' });

//部门管理
export const apiDeptTableList = (params?: DeptListItem[]) =>
  defHttp.get({ url: Api.DeptTableList, params });

export const apiDeptTableCreate = (params?: DeptListItem) =>
  defHttp.post({ url: Api.DeptTableCreate, params });

export const apiDeptTableModify = (id: number, params?: DeptListItem) =>
  defHttp.put({ url: Api.DeptTableModify + id, params });

export const apiDeptTableDelete = (id: number) => defHttp.delete({ url: Api.DeptTableDelete + id });

//角色管理
export const apiRoleTableList = (params?: RolePageParams[]) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RoleTableList, params });

//角色选择
export const apiRoleTreeList = (params?: RolePageParams[]) =>
  defHttp.get<any>({ url: Api.RoleTreeList, params });

export const apiRoleTableCreate = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.RoleTableCreate, params });

export const apiRoleTableModify = (id: number, params?) =>
  defHttp.put<RolePageListGetResultModel>({ url: Api.RoleTableModify + id, params });

export const apiRoleTableDelete = (id: number) =>
  defHttp.delete<RolePageListGetResultModel>({ url: Api.RoleTableDelete + id });

//菜单管理
export const apiMenuTableList = (params?: MenuParams[]) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.MenuTableList, params });

export const apiMenuStatusSwitch = (params?: MenuStatusParams[]) =>
  defHttp.post<any>({ url: Api.MenuStatusSwitch, params });

export const apiMenuTableCreate = (params?: MenuParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.MenuTableCreate, params });

export const apiMenuTableModify = (id: number, params?: MenuParams) =>
  defHttp.put<RolePageListGetResultModel>({ url: Api.MenuTableModify + id, params });

export const apiMenuTableDelete = (id: number) =>
  defHttp.delete<RolePageListGetResultModel>({ url: Api.MenuTableDelete + id });

// 系统配置
export const apiGetConfig = () => defHttp.get({ url: Api.GetConfig });

export const apiConfigTableList = (params) => defHttp.get({ url: Api.GetConfigTableList, params });

export const apiPostConfig = (key, params) =>
  defHttp.post({ url: Api.GetConfig + '/update/' + key, params });
export const apiConfigTableDelete = (id: number) =>
  defHttp.delete<RolePageListGetResultModel>({ url: Api.ConfigTable + id });

export const apiConfigTableModify = (id: number, params) =>
  defHttp.put<any>({ url: Api.ConfigTable + id, params });

export const apiConfigTableCreate = (params) =>
  defHttp.post<any>({ url: Api.ConfigTableCreate, params });

// 限流管理
export const apiRateLimiterList = (params?: MenuParams[]) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RateLimiterList, params });

export const apiRateLimiterCreate = (params?: MenuParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.RateLimiterCreate, params });

export const apiRateLimiterModify = (id: number, params?: MenuParams) =>
  defHttp.put<RolePageListGetResultModel>({ url: Api.RateLimiter + id, params });

export const apiRateLimiterDelete = (id: number) =>
  defHttp.delete<any>({ url: Api.RateLimiter + id });

// 模型管理
export const apiModuleTableList = (params?: ModulePageParams[]) =>
  defHttp.get<ModulePageListGetResultModel>({ url: Api.ModuleTableList, params });

//角色选择
export const apiModuleTreeList = (params?: ModulePageParams[]) =>
  defHttp.get<any>({ url: Api.ModuleTreeList, params });

export const apiModuleTableCreate = (params?: ModulePageParams) =>
  defHttp.post<ModulePageListGetResultModel>({ url: Api.ModuleTableCreate, params });

export const apiModuleTableModify = (id: number, params?) =>
  defHttp.put<ModulePageListGetResultModel>({ url: Api.ModuleTableModify + id, params });

export const apiModuleTableDelete = (id: number) =>
  defHttp.delete<ModulePageListGetResultModel>({ url: Api.ModuleTableDelete + id });
