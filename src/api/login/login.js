import {get, post} from '../http'

export const loginT = params =>post('/demo/login',params)
export const userName = params =>get('/demo/getUserInfo',params)