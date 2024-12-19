import {get, post,postform,postUpload} from '../http'

export const uploadFile = params =>postUpload('user/file/upload',params)

export const viewUrl = params =>get('user/file/viewUrl',params)

export const delFile = params =>get('user/file/del',params)