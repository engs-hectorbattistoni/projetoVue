<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title fade-in">Carrinho de Compras</h1>

      <!-- v-if: carrinho com itens -->
      <div v-if="cart.length > 0" class="cart-layout fade-in">

        <!-- Lista de itens -->
        <div class="cart-items">
          <!-- v-for: renderiza cada item do carrinho -->
          <div
            v-for="item in cart"
            :key="item.id"
            class="cart-item"
          >
            <!-- Imagem -->
            <div class="item-image">
              <span>{{ item.emoji }}</span>
            </div>

            <!-- Informações -->
            <div class="item-info">
              <span class="item-category">{{ item.category }}</span>
              <h3>{{ item.name }}</h3>
              <span class="item-unit-price">R$ {{ formatPrice(item.price) }} / un.</span>
            </div>

            <!-- Controle de quantidade -->
            <div class="item-qty">
              <button @click="$emit('update-quantity', { productId: item.id, quantity: item.quantity - 1 })">−</button>
              <span>{{ item.quantity }}</span>
              <button @click="$emit('update-quantity', { productId: item.id, quantity: item.quantity + 1 })">+</button>
            </div>

            <!-- Subtotal -->
            <div class="item-subtotal">
              R$ {{ formatPrice(item.price * item.quantity) }}
            </div>

            <!-- Remover item -->
            <button class="remove-btn" @click="$emit('remove-from-cart', item.id)" title="Remover">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>

        <!-- Resumo do pedido -->
        <div class="cart-summary">
          <h3>Resumo do pedido</h3>

          <div class="summary-rows">
            <div class="summary-row">
              <span>Subtotal ({{ totalItems }} itens)</span>
              <span>R$ {{ formatPrice(subtotal) }}</span>
            </div>
            <div class="summary-row">
              <span>Desconto</span>
              <span class="discount">− R$ {{ formatPrice(discount) }}</span>
            </div>
            <div class="summary-row">
              <span>Frete</span>
              <span class="free">{{ subtotal >= 299 ? 'Grátis' : 'R$ 29,90' }}</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row total">
              <span>Total</span>
              <span>R$ {{ formatPrice(total) }}</span>
            </div>
          </div>

          <!-- Cupom de desconto (v-model para input) -->
          <div class="coupon-section">
            <label>Cupom de desconto</label>
            <div class="coupon-input">
              <input v-model="couponCode" type="text" placeholder="Digite o cupom" @keyup.enter="applyCoupon" />
              <button class="btn btn-secondary" @click="applyCoupon">Aplicar</button>
            </div>
            <p v-if="couponMsg" class="coupon-msg" :class="couponSuccess ? 'success' : 'error'">
              {{ couponMsg }}
            </p>
          </div>

          <button class="btn btn-primary checkout-btn" @click="handleCheckout">
            Finalizar compra
          </button>

          <button class="btn btn-secondary clear-btn" @click="$emit('clear-cart')">
            Limpar carrinho
          </button>

          <!-- Frete grátis acima de R$299 -->
          <p v-if="subtotal < 299" class="free-shipping-hint">
            Adicione mais R$ {{ formatPrice(299 - subtotal) }} para frete grátis
          </p>
        </div>
      </div>

      <!-- v-else: carrinho vazio -->
      <div v-else class="empty-cart fade-in">
        <span class="empty-icon">🛒</span>
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos e aproveite as ofertas!</p>
        <router-link to="/produtos" class="btn btn-primary">Ver produtos</router-link>
      </div>

      <!-- Modal de sucesso na compra -->
      <transition name="modal">
        <div v-if="showSuccess" class="modal-overlay" @click.self="showSuccess = false">
          <div class="success-modal">
            <span class="success-icon">✅</span>
            <h3>Pedido realizado com sucesso!</h3>
            <p>Obrigado pela sua compra. Você receberá um e-mail de confirmação em breve.</p>
            <button class="btn btn-primary" @click="finishOrder">Continuar comprando</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',

  props: {
    cart: { type: Array, default: () => [] },
  },

  emits: ['remove-from-cart', 'update-quantity', 'clear-cart', 'add-to-cart'],

  data() {
    return {
      couponCode: '',
      couponMsg: '',
      couponSuccess: false,
      couponDiscount: 0,
      showSuccess: false,
      // Cupons válidos para demonstração
      validCoupons: { 'TECH10': 10, 'VUEJS': 15, 'STORE20': 20 },
    }
  },

  computed: {
    // Total de itens (soma de quantidades)
    totalItems() {
      return this.cart.reduce((s, i) => s + i.quantity, 0)
    },

    // Subtotal bruto
    subtotal() {
      return this.cart.reduce((s, i) => s + i.price * i.quantity, 0)
    },

    // Desconto por cupom
    discount() {
      return this.subtotal * (this.couponDiscount / 100)
    },

    // Frete
    shipping() {
      return this.subtotal >= 299 ? 0 : 29.9
    },

    // Total final
    total() {
      return this.subtotal - this.discount + this.shipping
    },
  },

  methods: {
    formatPrice(value) {
      return value.toFixed(2).replace('.', ',')
    },

    // Valida e aplica cupom de desconto
    applyCoupon() {
      const code = this.couponCode.trim().toUpperCase()
      if (this.validCoupons[code] !== undefined) {
        this.couponDiscount = this.validCoupons[code]
        this.couponMsg = `Cupom aplicado! ${this.couponDiscount}% de desconto.`
        this.couponSuccess = true
      } else {
        this.couponMsg = 'Cupom inválido ou expirado.'
        this.couponSuccess = false
        this.couponDiscount = 0
      }
    },

    handleCheckout() {
      this.showSuccess = true
    },

    finishOrder() {
      this.$emit('clear-cart')
      this.showSuccess = false
      this.couponCode = ''
      this.couponMsg = ''
      this.couponDiscount = 0
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.cart-page { padding: 2.5rem 0 4rem; }

.page-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
  align-items: start;
}

/* ===== CART ITEMS ===== */
.cart-items { display: flex; flex-direction: column; gap: 1rem; }

.cart-item {
  display: grid;
  grid-template-columns: 72px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  transition: border-color var(--transition);
}

.cart-item:hover { border-color: var(--color-accent); }

.item-image {
  background: var(--color-surface-2);
  border-radius: var(--radius);
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  flex-shrink: 0;
}

.item-category {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-accent);
  font-weight: 700;
  display: block;
  margin-bottom: 0.25rem;
}

.item-info h3 { font-family: var(--font-display); font-size: 0.95rem; font-weight: 600; }
.item-unit-price { font-size: 0.78rem; color: var(--color-text-muted); margin-top: 0.25rem; display: block; }

/* Controle de quantidade */
.item-qty {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}

.item-qty button {
  background: var(--color-surface-2);
  border: none;
  color: var(--color-text);
  width: 30px;
  height: 34px;
  font-size: 1rem;
  transition: background var(--transition);
}

.item-qty button:hover { background: var(--color-border); }
.item-qty span { padding: 0 0.75rem; font-weight: 600; font-size: 0.9rem; min-width: 32px; text-align: center; }

.item-subtotal {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  min-width: 90px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  padding: 0.35rem;
  border-radius: 6px;
  transition: color var(--transition), background var(--transition);
}

.remove-btn:hover { color: var(--color-error); background: rgba(255, 92, 92, 0.1); }

/* ===== SUMMARY ===== */
.cart-summary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: sticky;
  top: 80px;
}

.cart-summary h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.summary-rows { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.25rem; }

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.summary-row.total {
  color: var(--color-text);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
}

.discount { color: var(--color-success); }
.free { color: var(--color-success); font-weight: 600; }

.summary-divider {
  border-top: 1px solid var(--color-border);
  margin: 0.25rem 0;
}

/* Cupom */
.coupon-section { margin-bottom: 1.25rem; }
.coupon-input { display: flex; gap: 0.5rem; margin-top: 0.35rem; }
.coupon-input input { flex: 1; }
.coupon-input .btn { white-space: nowrap; padding: 0.5rem 0.85rem; }

.coupon-msg { font-size: 0.78rem; margin-top: 0.4rem; }
.coupon-msg.success { color: var(--color-success); }
.coupon-msg.error { color: var(--color-error); }

.checkout-btn { width: 100%; justify-content: center; margin-bottom: 0.6rem; padding: 0.8rem; }
.clear-btn { width: 100%; justify-content: center; }

.free-shipping-hint {
  text-align: center;
  font-size: 0.78rem;
  color: var(--color-orange);
  margin-top: 0.75rem;
}

/* ===== EMPTY ===== */
.empty-cart { text-align: center; padding: 5rem 1rem; }
.empty-icon { font-size: 5rem; display: block; margin-bottom: 1.25rem; }
.empty-cart h2 { font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.5rem; }
.empty-cart p { color: var(--color-text-muted); margin-bottom: 1.5rem; }

/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.success-modal {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  max-width: 420px;
  width: 100%;
  text-align: center;
}

.success-icon { font-size: 3.5rem; display: block; margin-bottom: 1rem; }
.success-modal h3 { font-family: var(--font-display); font-size: 1.3rem; margin-bottom: 0.75rem; }
.success-modal p { color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.6; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

/* ===== RESPONSIVO ===== */
@media (max-width: 960px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-summary { position: static; }
}

@media (max-width: 600px) {
  .cart-item { grid-template-columns: 56px 1fr; grid-template-rows: auto auto; }
  .item-qty { grid-column: 1; }
  .item-subtotal { grid-column: 2; text-align: left; }
  .remove-btn { grid-column: 2; justify-self: end; }
}
</style>
