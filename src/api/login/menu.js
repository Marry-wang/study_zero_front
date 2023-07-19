import {get, post,postform,postUpload} from '../http'

export const getMenuList = params =>post('system/system/getMenu',params)
export const addOrUpdateMenu = params =>postform('system/system/addOrUpdateMenu',params)
export const delMenu = params =>postform('system/system/delMenu',params)