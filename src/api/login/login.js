import {get, post} from '../http'

export const loginT = params =>post('/demo/loginTo',params)
export const userName = params =>get('/demo/getUserInfo',params)