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
  
  export const userSignUp = async (data:any) => {
    const config = postConfig(
      data,
      CONSTANTS.BASE_URL + CONSTANTS.END_POINT.SIGNUP,
    );
    return await publicResponseHandler(config);
  };
  export const login = async (data:any) => {
    const config = postConfig(
      data,
      CONSTANTS.BASE_URL + CONSTANTS.END_POINT.LOGIN,
    );
    return await publicResponseHandler(config);
  };
  export const userSignIn = async (data:any) => {
    const config = postConfig(
      data,
      CONSTANTS.BASE_URL + CONSTANTS.END_POINT.SIGNIN,
    );
    return await publicResponseHandler(config);
  };
  
  export const resendOtp = async (data:any) => {
    const config = postConfig(
      data,
      CONSTANTS.BASE_URL + CONSTANTS.END_POINT.LOGIN,
    );
    return await publicResponseHandler(config);
  };
  export const emailVerification = async (token:string) => {
    const config = putConfig(
      null,
      `${CONSTANTS.BASE_URL + CONSTANTS.END_POINT.VERIFY_EMAIL}:${token}`,
    );
    return await publicResponseHandler(config);
  };

  export const resendEmailVerification = async () => {
    const config = postConfig(
      null,
      CONSTANTS.BASE_URL + CONSTANTS.END_POINT.RESEND,
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
  