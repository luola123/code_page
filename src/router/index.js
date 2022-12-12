import {createRouter, createWebHashHistory} from "vue-router";
import routes from "./config.js";

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
export default router
