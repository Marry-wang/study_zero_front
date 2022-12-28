
import Home from '@/components/view/homez/Home'
import First from '@/components/view/homez/First'

import Add from '@/components/view/message/addMsg'
import Table from '@/components/view/message/tableShow'
import Upload from '@/components/view/message/Fileupload'
import mesageMenu from '@/components/view/message/Menu'
import mesageRoule from '@/components/view/message/Roule'
import mesageUser from '@/components/view/message/User'

import download from '@/components/view/message/downloadFile'
export default[
    {
        path: '/home',
        component: Home,
        redirect:'/first',
        children:[
            {
                path: '/mesageMenu',
                component: mesageMenu
              },
            {
                path: '/mesageRoule',
                component: mesageRoule,
            },
            {
                path: '/mesageUser',
                component: mesageUser,
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
