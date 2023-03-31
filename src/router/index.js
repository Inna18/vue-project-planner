import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddProject from "@/views/AddProject";
import EditProject from "@/views/EditProject";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'add',
    component: AddProject
  },
  {
    path: '/projects/:id',
    name: 'edit',
    component: EditProject,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
