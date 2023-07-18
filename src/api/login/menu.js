import {get, post,postform,postUpload} from '../http'

export const getMenuList = params =>post('system/system/getMenu',params)
export const addMenu = params =>post('system/system/addMenu',params)
export const updateMenu = params =>postform('system/system/updateMenu',params)