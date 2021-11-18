import HelloWorld from '@/components/HelloWorld'
import One from '@/components/One'
import Demo1 from '@/components/view/Demo1'
import Demo2 from '@/components/view/Demo2'

export default [
    {
        path: '/one',
        name: 'One',
        component: One
      },
      {
        path: '/hello',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
        path: '/demo1',
        name: 'Demo1',
        component: Demo1
      },
      {
        path: '/demo2',
        name: 'Demo2',
        component: Demo2
      },
]