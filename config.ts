import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const SERVER_URL = publicRuntimeConfig.SERVER_URL

export const APP_ID = publicRuntimeConfig.APP_ID