<template>
  <!-- Componente raiz: provê estado global do carrinho para toda a aplicação -->
  <div id="app-wrapper">
    <Navbar :cartCount="cartCount" />

    <!-- Conteúdo dinâmico das rotas -->
    <main>
      <router-view
        :cart="cart"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @update-quantity="updateQuantity"
        @clear-cart="clearCart"
      />
    </main>

    <Footer />

    <!-- Modal de confirmação global (item adicionado ao carrinho) -->
    <transition name="toast">
      <div v-if="toastVisible" class="toast">
        <span>✓</span> Item adicionado ao carrinho!
      </div>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: { Navbar, Footer },

  data() {
    return {
      // Estado global do carrinho de compras
      cart: [],
      toastVisible: false,
      toastTimer: null,
    }
  },

  computed: {
    // Total de itens no carrinho (soma das quantidades)
    cartCount() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0)
    },
  },

  methods: {
    // Adiciona produto ao carrinho ou incrementa quantidade
    addToCart(product) {
      const existing = this.cart.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.showToast()
    },

    // Remove item completamente do carrinho
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
    },

    // Atualiza quantidade de um item
    updateQuantity({ productId, quantity }) {
      const item = this.cart.find(i => i.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    // Esvazia o carrinho
    clearCart() {
      this.cart = []
    },

    // Exibe notificação toast por 2 segundos
    showToast() {
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastVisible = true
      this.toastTimer = setTimeout(() => { this.toastVisible = false }, 2200)
    },
  },
}
</script>

<style>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

/* ===== TOAST ===== */
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: var(--color-success);
  color: #fff;
  padding: 0.75rem 1.4rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 9999;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toast-enter-active, .toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
