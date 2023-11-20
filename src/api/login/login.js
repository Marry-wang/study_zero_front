import {get, post,postform,postUpload} from '../http'

export const loginform = params =>postform('system/system/login',params)
// export const loginT = params =>post('/demo/jwt/loginTo',params)
export const userName = params =>get('system/system/loginMessage',params)

export const filrUpload = params =>postUpload('/demo/file/upload',params)