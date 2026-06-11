import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/produtos', name: 'Products', component: Products },
  { path: '/produto/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/carrinho', name: 'Cart', component: Cart },
  { path: '/contato', name: 'Contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Rola para o topo ao navegar entre páginas
  scrollBehavior() { return { top: 0 } },
})

export default router
