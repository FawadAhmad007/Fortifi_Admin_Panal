import {
    postConfig,
    getConfig,
    publicResponseHandler,
    putConfig,
    protectedPutConfig,
    protectedGetConfig,
    post,
    // privateResponseHandler,
    protectedPostConfig,
    protectedDeleteConfig,
    protectedPatchConfig,
    protectedGetPdf
  } from './networkConfig';
  
  import * as CONSTANTS from '../constants/';
  
  // import { getToken } from '@token';
  export const login = async (data:any) => {
    const config = postConfig(
      data,
      CONSTANTS.BASE_URL + CONSTANTS.END_POINT.LOGIN,
    );
    return await publicResponseHandler(config);
  };
  export const getContacts = async (token:any,page:number) => {
    const config = getConfig(
      `${CONSTANTS.BASE_URL + CONSTANTS.END_POINT.GET_CONTACTS}?page=${page}&limit=10`,
    );
    return await publicResponseHandler(config);
  };

 
  export const createNews = async (data:any,token:any) => {
    const config = protectedPostConfig(
      data,
      CONSTANTS.BASE_URL + CONSTANTS.END_POINT.CREATE_NEWS,
      token
    );
    return await publicResponseHandler(config);
  };

//   export const upload = async (photo:any) => {
//     const data = new FormData();
  
//     data.append('file', photo);
  
//     data.append('upload_preset', CONSTANTS.UPLOAD_PRESET);
  
//     data.append('cloud_name', CONSTANTS.CLOUD_NAME);
  
//     data.append('api_key', CONSTANTS.CLOUDINARY_API_KEY);
  
//     const config = post(data, CONSTANTS.CLOUDINARY_URL);
  
//     return await publicResponseHandler(config);
//   };
  