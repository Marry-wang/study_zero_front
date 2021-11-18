import Menu from '@/components/view/backend/Menu'
import Home from '@/components/view/homez/Home'
import children1 from './children'

export default[
    {
        path: '/menu',
        component: Menu
    },
    {
        path: '/home',
        component: Home,
        children: children1,
    }
]
