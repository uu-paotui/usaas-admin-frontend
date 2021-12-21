/*
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-22 15:40:36
 * @LastEditTime: 2021-12-16 17:24:49
 * @Description: 
 */
import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl } = useGlobSetting();
enum Api {
  FetchOssToken = 'https://hire.maleweb.cn/api/v3/common/oss_token',
}

export const fetchOssToken = () => {
  return defHttp.get({
    url: Api.FetchOssToken
  })
}

export const uploadFileToOss = (
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) => {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
  );
}
