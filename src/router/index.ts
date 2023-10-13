import { createRouter, createWebHistory } from 'vue-router'
import guest from '@/router/middleware/guest'
import user from '@/router/middleware/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue'),
      meta: {
        middleware: guest,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/register.vue'),
      meta: {
        middleware: guest,
      },
    },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      meta: {
        middleware: user,
      },
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'project',
          name: 'project',
          component: () => import('../pages/project.vue'),
        },
        {
          path: '/project/:id',
          name: 'detail-project',
          props: true,
          component: () => import('../pages/detail-project.vue'),
        },
        {
          path: '/device/:id',
          name: 'detail-device',
          props: true,
          component: () => import('../pages/detail-device.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'profile',
          component: () => import('../pages/profile.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/utils/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/utils/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/utils/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/utils/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/utils/form-layouts.vue'),
        },
      ],
    },
  ],
})

// {
//   path: '/',
//   component: () => import('../layouts/blank.vue'),
//   children: [
//     {
//       path: 'login',
//       component: () => import('../pages/login.vue'),
//     },
//     {
//       path: 'register',
//       component: () => import('../pages/register.vue'),
//     },
//     {
//       path: '/:pathMatch(.*)*',
//       component: () => import('../pages/[...all].vue'),
//     },
//   ],
// },

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware: any = to.meta.middleware

    middleware({ to, from, next })
  }
})

export default router
