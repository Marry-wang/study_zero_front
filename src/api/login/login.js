import {get, post,postform,postUpload} from '../http'

export const loginform = params =>postform('/demo/login',params)
export const loginT = params =>post('/demo/jwt/loginTo',params)
export const userName = params =>get('/demo/jwt/getUserInfo',params)

export const filrUpload = params =>postUpload('/demo/file/upload',params)