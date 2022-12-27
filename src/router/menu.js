
import Home from '@/components/view/homez/Home'
import First from '@/components/view/homez/First'

import Add from '@/components/view/backend/message/addMsg'
import Table from '@/components/view/backend/message/tableShow'
import Upload from '@/components/view/backend/message/Fileupload'

import mesageMenu from '@/components/view/backend/message/Menu'
import mesageRoule from '@/components/view/backend/message/Roule'
import mesageUser from '@/components/view/backend/message/User'


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
            }
        ]
    }
]
