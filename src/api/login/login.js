import {get, post} from '../http'

export const loginT = params =>get('/demo/jwt/login',params)
export const userName = params =>get('/demo/jwt/getUserInfo',params)