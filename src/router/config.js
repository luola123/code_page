const routes = [{
    path: "/",
    name: '首页',
    component: () => import("../views/Index.vue"),
    meta: {
        title: '首页'
    }
}]
export default routes
