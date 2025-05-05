// networkConfig.ts (TypeScript improvements + error fixes)
import Axios,{ AxiosRequestConfig,Method, ResponseType } from 'axios';
interface AxiosConfig extends AxiosRequestConfig {
    responseType?: ResponseType;
  }
  
// Define types for cleaner and safer TypeScript
interface AxiosConfig {
  method: Method;
  url: string;
  data?: any;
  timeout: number;
  headers: Record<string, string>;
  responseType?: ResponseType;}

export const post = (data: any, url: string): AxiosConfig => ({
  method: 'POST',
  url,
  data,
  timeout: 10000,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
    'Content-Type': 'application/json',
  },
});

export const postConfig = (data: any, url: string): AxiosConfig => {
  const config: AxiosConfig = {
    method: 'POST',
    url,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
    },
  };
  console.log('postConfig', config);
  if (data != null) config.data = data;
  return config;
};

export const putConfig = (data: any, url: string): AxiosConfig => {
  const config: AxiosConfig = {
    method: 'PUT',
    url,
    timeout: 10000,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
      'Content-Type': 'application/json',
    },
  };
  if (data != null) config.data = data;
  return config;
};

export const getConfig = ( url: string): AxiosConfig => ({
  method: 'GET',
  url,
  timeout: 10000,
  headers: {
    // 'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
    'Content-Type': 'application/json',

  },
});

export const protectedGetConfig = (url: string, token: string): AxiosConfig => ({
  method: 'GET',
  url,
  timeout: 10000,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}

);

export const protectedPostConfig = (data: any, url: string, token: string): AxiosConfig => {
  const config: AxiosConfig = {
    method: 'POST',
    url,
    timeout: 10000,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  if (data != null) config.data = data;
  return config;
};

export const protectedPutConfig = (data: any, url: string, token: string): AxiosConfig => {
  const config: AxiosConfig = {
    method: 'PUT',
    url,
    timeout: 10000,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  if (data != null) config.data = data;
  return config;
};

export const protectedPatchConfig = (data: any, url: string, token: string): AxiosConfig => {
  const config: AxiosConfig = {
    method: 'PATCH',
    url,
    timeout: 10000,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  if (data != null) config.data = data;
  return config;
};

export const protectedDeleteConfig = (url: string, token: string): AxiosConfig => ({
  method: 'DELETE',
  url,
  timeout: 10000,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY || '',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const protectedGetPdf = (url: string, token: string): AxiosConfig => ({
  method: 'GET',
  url,
  timeout: 10000,
  responseType: 'arraybuffer',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Accept: 'application/pdf',
  },
});

export const publicResponseHandler = async (config: AxiosConfig): Promise<any> => {
  try {
    const response = await Axios(config);
    return response;
  } catch (err: any) {
    if (Axios.isCancel(err)) {
      return { code: 'ECONNABORTED' };
    } else if (err.code === 'ERR_NETWORK' || err.code === 'ERR_BAD_RESPONSE') {
      return err;
    } else {
      return err?.response?.data;
    }
  }
};
