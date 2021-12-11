
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: {
      name: 'characters'
    },
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/characters',
        name: 'characters',
        component: () => import('pages/home/characters/Characters.vue')
      },
      {
        path: '/characters/character-detail/:id',
        name: 'characterDetail',
        component: () => import('pages/home/characters/CharacterDetail.vue'),
        redirect: {
          name: 'characterComics'
        },
        children: [
          {
            path: '/characters/character-detail/:id/comics',
            name: 'characterComics',
            component: () => import('pages/home/characters/characterDetail/CharacterComics.vue')
          },
          {
            path: '/characters/character-detail/:id/stories',
            name: 'characterStories',
            component: () => import('pages/home/characters/characterDetail/CharacterStories.vue')
          }
        ]
      },
      {
        path: '/comics',
        name: 'comics',
        component: () => import('pages/home/comics/comics.vue')
      },
      {
        path: '/comics/comic-detail/:id',
        name: 'comicsDetail',
        component: () => import('pages/home/comics/ComicDetail.vue'),
        redirect: {
          name: 'comicsCharacters'
        },
        children: [
          {
            path: '/comics/comic-detail/:id/characters',
            name: 'comicsCharacters',
            component: () => import('pages/home/comics/comicsDetail/ComicCharacters.vue')
          },
          {
            path: '/comics/comic-detail/:id/stories',
            name: 'comicsStories',
            component: () => import('pages/home/comics/comicsDetail/ComicsStories.vue')
          }
        ]
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('pages/home/favorites/Favorites.vue'),
        redirect: {
          name: 'charactersFavorites'
        },
        children: [
          {
            path: '/favorites/characters-favorites',
            name: 'charactersFavorites',
            component: () => import('pages/home/favorites/favorite-pages/CharactersFavorites.vue')
          },
          {
            path: '/favorites/comics-favorites',
            name: 'comicsFavorites',
            component: () => import('pages/home/favorites/favorite-pages/ComicsFavorites.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    redirect: {
      name: 'login'
    },
    children: [
      {
        path: '/auth/login',
        name: 'login',
        component: () => import('pages/auth/Login.vue')
      },
      {
        path: '/auth/register',
        name: 'register',
        component: () => import('pages/auth/Register.vue')
      },
      {
        path: '/auth/forgot-password',
        name: 'forgotPassword',
        component: () => import('pages/auth/ForgotPassword.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
