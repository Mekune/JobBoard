import { createWebHistory, createRouter } from "vue-router";
import Home from '../pages/Home.vue';
import Login from '../admin/Login.vue';
import DashboardAdmin from '../admin/DashboardAdmin.vue'


import VueCookies from "vue-cookies";

const isAuthenticated = () => {
    return VueCookies.get('Name') !== null;
};

const guestGuard = (to, from, next) => {
    if (isAuthenticated()) {
        // L'utilisateur est déjà connecté, redirigez-le vers la page d'accueil
        next({ name: 'Home' });
    } else {
        // L'utilisateur n'est pas connecté, laissez-le accéder à la page de connexion
        next();
    }
};



const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login-register",
        name: "Login",
        component: Login,
        beforeEnter: guestGuard,
    },
    {
        path: "/dashboard-admin",
        name: "DashboardAdmin",
        component: DashboardAdmin,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;