const BASE_URL = 'https://api.fortifi.world';
const COINGECKO_PUBLIC = 'https://api.coingecko.com/api/v3';
const COINGECKO = 'https://pro-api.coingecko.com/api/v3';

const END_POINT = {
    SIGNUP: '/api/auth/sign_up',
    SIGNIN: '/api/auth/sign_in',
    LOGIN: '/api/auth/sent/otp', //resend otp also
    VERIFY_EMAIL: '/api/email/verify/',
    RESEND:'/api/email/resend',
    UPDATE_PASSWORD:'/api/user/update/password',
    SUBMIT_KYC:'/api/user/kyc',
    GET_NEWS:'/api/news',
};

export {
  BASE_URL,
  END_POINT,
  COINGECKO_PUBLIC,
  COINGECKO
};
