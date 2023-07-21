import {get, post,postform,postUpload} from '../http'

// menu
export const getMenuList = params =>post('system/system/getMenu',params)
export const addOrUpdateMenu = params =>postform('system/system/addOrUpdateMenu',params)
export const delMenu = params =>postform('system/system/delMenu',params)


//user
export const getUserList = params =>post('system/system/getUser',params)
export const addOrUpdateUser = params =>postform('system/system/addOrUpdateUser',params)
export const delUser = params =>postform('system/system/delUser',params)


//role
export const getRoleList = params =>post('system/system/getRole',params)
export const addOrUpdateRole = params =>postform('system/system/addOrUpdateRole',params)
export const delRole = params =>postform('system/system/delRole',params)