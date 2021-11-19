import Menu from '@/components/view/backend/Menu'
import Home from '@/components/view/homez/Home'
import Index from '@/components/view/homez/Index'
import HelloWorld from '@/components/HelloWorld'
import One from '@/components/One'
import Demo1 from '@/components/view/Demo1'
import Demo2 from '@/components/view/Demo2'

import Main from '@/components/view/homez/Componts/Main'

export default[
    {
        path: '/menu',
        component: Menu
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/menuIndex',
        component: Index,
        redirect:'/demo2',
        children:[
            {
                path: '/demo1',
                component: Demo1
              },
            {
                path: '/one',
                component: One,
            },
            {
                path: '/demo2',
                component: Demo2,
            },
            {
                path: '/hello',
                component: HelloWorld,
            },
            
        ]
    }
]
