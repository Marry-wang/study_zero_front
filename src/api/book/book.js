import {get, post,postform,postUpload} from '../http'

export const addBookTypeSummary = params =>postform('user/book/addBookTypeSummary',params)

export const delBookTypeSummary = params =>postform('user/book/delBookTypeSummary',params)

export const editBookTypeSummary = params =>postform('user/book/editBookTypeSummary',params)

export const selectBookTypeSummary = params =>postform('user/book/selectBookTypeSummary',params)

export const addBook = params =>postform('user/book/addBook',params)

export const delBook = params =>get('user/book/delBook',params)

export const selectBook = params =>postform('user/book/selectBook',params)

export const editBook = params =>postform('user/book/editBook',params)

export const selectBookBorrowingRecord = params =>get('user/book/selectBorrowingRecords',params)

export const editBookBorrowingRecord = params =>postform('user/book/addOrUpdateBookBorrowingRecord',params)