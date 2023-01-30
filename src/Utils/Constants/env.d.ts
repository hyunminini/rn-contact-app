import { API_URL } from '@env'
// export const API_URL = process.env.REACT_APP_API_URL;d

declare module '@env' {
    export const API_URL: string;
}

