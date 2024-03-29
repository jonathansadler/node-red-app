
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/dashboard', component: () => import('pages/dashboard.vue') },
      { path: '/config', component: () => import('pages/Config.vue') },
      { path: '/camera', component: () => import('pages/Camera.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/device', component: () => import('pages/Device.vue') },
      { path: '/location', component: () => import('pages/Location.vue') },
      { path: '/push', component: () => import('pages/Push.vue') }
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
