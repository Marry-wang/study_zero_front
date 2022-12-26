
import Home from '@/components/view/homez/Home'
import First from '@/components/view/homez/First'
// import Index from '@/components/view/homez/Index'

import Add from '@/element/view/addMsg'
import Table from '@/element/view/tableShow'
import Upload from '@/element/view/Fileupload'

// import Menu from '@/components/view/backend/Menu'
import mesageMenu from '@/components/view/backend/message/Menu'
import mesageRoule from '@/components/view/backend/message/Roule'
import mesageUser from '@/components/view/backend/message/User'

// import HelloWorld from '@/components/view/other/HelloWorld'
// import One from '@/components/view/other/One'
// import Demo1 from '@/components/view/other/Demo1'
// import Demo2 from '@/components/view/other/Demo2'

export default[
    // {
    //     path: '/menu',
    //     component: Menu
    // },
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
            // {
            //     path: '/index',
            //     component: Index
            // },
        ]
    },
    // {
    //     path: '/menuIndex',
    //     component: Index,
    //     redirect:'/demo2',
    //     children:[
    //         {
    //             path: '/demo1',
    //             component: Demo1
    //           },
    //         {
    //             path: '/one',
    //             component: One,
    //         },
    //         {
    //             path: '/demo2',
    //             component: Demo2,
    //         },
    //         {
    //             path: '/hello',
    //             component: HelloWorld,
    //         },
            
    //     ]
    // }
]
