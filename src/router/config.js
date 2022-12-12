const routes = [
    {
        path: "/",
        name: '首页',
        component: () => import("../views/Index.vue"),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/music',
        name: '音乐',
        component: () => import("../views/MusicPlayer.vue"),
        meta: {
            title: '音乐'
        }
    }
]
export default routes
