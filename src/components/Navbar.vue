<template>
  <!-- Barra de navegação responsiva com menu hamburger para mobile -->
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar-inner">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">Tech<strong>Store</strong></span>
      </router-link>

      <!-- Links de navegação (desktop) -->
      <nav class="nav-links" :class="{ open: menuOpen }">
        <router-link to="/" @click="closeMenu">Início</router-link>
        <router-link to="/produtos" @click="closeMenu">Produtos</router-link>
        <router-link to="/contato" @click="closeMenu">Contato</router-link>
      </nav>

      <!-- Ações: carrinho e botão hamburger -->
      <div class="nav-actions">
        <!-- Ícone do carrinho com badge de quantidade -->
        <router-link to="/carrinho" class="cart-btn" title="Carrinho">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <!-- v-if: mostra badge apenas quando há itens no carrinho -->
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>

        <!-- Botão hamburger para mobile -->
        <button class="hamburger" @click="toggleMenu" :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'">
          <span :class="{ active: menuOpen }"></span>
          <span :class="{ active: menuOpen }"></span>
          <span :class="{ active: menuOpen }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    // Recebe a contagem do carrinho do App.vue
    cartCount: { type: Number, default: 0 },
  },

  data() {
    return {
      menuOpen: false,
      isScrolled: false,
    }
  },

  mounted() {
    // Detecta scroll para aplicar sombra na navbar
    window.addEventListener('scroll', this.onScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    toggleMenu() { this.menuOpen = !this.menuOpen },
    closeMenu() { this.menuOpen = false },
    onScroll() { this.isScrolled = window.scrollY > 20 },
  },
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 15, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.navbar.scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: 0 2px 24px rgba(0,0,0,0.3);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 2rem;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-text);
  white-space: nowrap;
}

.logo-icon { font-size: 1.3rem; }
.logo-text strong { color: var(--color-accent); }

/* Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color var(--transition);
  position: relative;
  padding-bottom: 2px;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width var(--transition);
  border-radius: 99px;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--color-text);
}

.nav-links a.router-link-active::after { width: 100%; }

/* Ações */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--color-text-muted);
  transition: color var(--transition);
}

.cart-btn:hover { color: var(--color-text); }

.cart-badge {
  position: absolute;
  top: -7px;
  right: -9px;
  background: var(--color-orange);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger span:nth-child(1).active { transform: translateY(7px) rotate(45deg); }
.hamburger span:nth-child(2).active { opacity: 0; }
.hamburger span:nth-child(3).active { transform: translateY(-7px) rotate(-45deg); }

/* ===== RESPONSIVO ===== */
@media (max-width: 768px) {
  .hamburger { display: flex; }

  .nav-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 1rem 1.5rem;
    transform: translateY(-110%);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    pointer-events: none;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-links a {
    padding: 0.75rem 0;
    font-size: 1rem;
    width: 100%;
    border-bottom: 1px solid var(--color-border);
  }

  .nav-links a:last-child { border-bottom: none; }
}
</style>
