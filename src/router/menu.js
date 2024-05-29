
import Home from '@/view/homez/Home'
import First from '@/view/homez/First'

import Add from '@/view/message/addMsg'
import Table from '@/view/message/tableShow'
import Upload from '@/view/message/Fileupload'
import messageMenu from '@/view/menu/index'
import messageRole from '@/view/role/index'
import messageUser from '@/view/user/index'

import download from '@/view/message/downloadFile'
export default[
    {
        path: '/home',
        component: Home,
        redirect:'/first',
        children:[
            {
                path: '/messageMenu',
                component: messageMenu,
              },
            {
                path: '/messageRole',
                component: messageRole,
            },
            {
                path: '/messageUser',
                component: messageUser,
            },
            {
                path: '/first',
                component: First,
            },
            {
                path: '/add',
                component: Add
            },
            {
                path: '/table',
                component: Table
            },
            {
                path: '/upload',
                component: Upload
            },
            {
                path: '/download',
                component: download
            }
        ]
    }
]
