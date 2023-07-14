import {get, post,postform,postUpload} from '../http'

export const getMenuList = params =>post('system/system/getMenu',params)