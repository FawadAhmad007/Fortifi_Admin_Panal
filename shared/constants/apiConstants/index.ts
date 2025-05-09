// const BASE_URL =  'http://localhost:8000';

// const BASE_URL =  'https://fortifi.world';
const BASE_URL = 'https://api.fortifi.world' 

const COINGECKO_PUBLIC = 'https://api.coingecko.com/api/v3';
const COINGECKO = 'https://pro-api.coingecko.com/api/v3';

const END_POINT = {
    LOGIN: '/api/admin/Login', 
    GET_CONTACTS:'/contact/getContacts',
    UPDATE_KYC:'/api/kyc/update/{id}',
    GET_KYC:'/api/kyc',
    GET_SINGLE_KYC:'/api/kyc/{id}',
    GET_NEWS:'/api/news',
    GET_NEWS_BY_ID:'/api/news/{id}',
    CREATE_NEWS:'/api/news/create',
    UPDATE_NEWS:'/api/news/update/{id}',
    DELETE_NEWS:'/api/news/{id}'
};

export {
  BASE_URL,
  END_POINT,
  COINGECKO_PUBLIC,
  COINGECKO
};
