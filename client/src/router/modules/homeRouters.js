const DefaultLayout = () => import('@/layouts/default')

const Home = () => import('@/views/home')
const Map = () => import('@/views/home/map')
const Charts = () => import('@/views/home/charts')
const HomeForm = () => import('@/views/home/homeForm')
const Message = () => import('@/views/home/messages')
const Calendar = () => import('@/views/home/calendar')
const Tags = () => import('@/views/home/tags')
const Editor = () => import('@/views/home/richEditor')
const Tabs = () => import('@/views/home/tabs')
const Icons = () => import('@/views/home/icons')
const TreeTable = () => import('@/views/home/treeTable')
const H5Setting = () => import('@/views/home/h5Setting')
const Print = () => import('@/views/home/print')

const HomeRoute = {
  path: '/',
  name: 'homePage',
  component: Home,
  meta: {
    icon: 'dashboard',
    title: 'control',
    group: 'home',
    affix: true
  }
}

const MapRoute = {
  path: '/map',
  name: 'map',
  component: Map,
  meta: {
    icon: 'statistics',
    title: 'map',
    group: 'home'
  }
}

const ChartsRoute = {
  path: '/charts',
  name: 'charts',
  component: Charts,
  meta: {
    icon: 'statistics',
    title: 'charts',
    group: 'home'
  }
}

const HomeFormRoute = {
  path: '/homeForm',
  name: 'homeform',
  component: HomeForm,
  meta: {
    icon: 'form',
    title: 'homeform',
    group: 'home'
  }
}

const MessageRoute = {
  path: '/messagelayer',
  name: 'message_layer',
  component: Message,
  meta: {
    icon: 'message',
    title: 'message_layer',
    group: 'home',
    isNew: true
  }
}

const CalendarRoute = {
  path: '/calendar',
  name: 'calendar',
  component: Calendar,
  meta: {
    icon: 'table',
    title: 'calendar',
    group: 'home'
  }
}

const TagsRoute = {
  path: '/tags',
  name: 'tags',
  component: Tags,
  meta: {
    icon: 'guide',
    title: 'tags',
    group: 'home',
    isNew: true
  }
}

const EditorRoute = {
  path: '/editor',
  name: 'editor',
  component: Editor,
  meta: {
    icon: 'edit',
    title: 'editor',
    group: 'home',
    isNew: true
  }
}

const TabsRoute = {
  path: '/tabs',
  name: 'tabs',
  component: Tabs,
  meta: {
    icon: 'tab',
    title: 'tabs',
    group: 'home',
    isNew: true
  }
}

const IconsRoute = {
  path: '/icons',
  name: 'icons',
  component: Icons,
  meta: {
    icon: 'icon',
    title: 'icons',
    group: 'home',
    isNew: true
  }
}

const TreeTableRoute = {
  path: '/treeTable',
  name: 'treeTable',
  component: TreeTable,
  meta: {
    icon: 'tree-table',
    title: 'treeTable',
    group: 'home',
    isNew: true
  }
}

const H5SettingRoute = {
  path: '/h5Setting',
  name: 'h5Setting',
  component: H5Setting,
  meta: {
    icon: 'shopping',
    title: 'h5Setting',
    group: 'home',
    isNew: true
  }
}

const PrintRoute = {
  path: '/print',
  name: 'print',
  component: Print,
  meta: {
    icon: 'shopping',
    title: 'print',
    group: 'home',
    isNew: true
  }
}

const HomeRouters = {
  path: '/',
  component: DefaultLayout,
  meta: {
    icon: 'dashboard',
    title: 'control',
    group: 'home',
    showInHome: true
  },
  children: [
    HomeRoute,
    MapRoute,
    ChartsRoute,
    HomeFormRoute,
    MessageRoute,
    CalendarRoute,
    TagsRoute,
    EditorRoute,
    TabsRoute,
    IconsRoute,
    TreeTableRoute,
    H5SettingRoute,
    PrintRoute
  ]
}

export default HomeRouters
