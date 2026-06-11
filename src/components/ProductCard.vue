<template>
  <!-- Card de produto reutilizável, usado na Home e em Produtos -->
  <div class="product-card" @click="goToDetail">
    <!-- Badge de desconto (v-if: exibe apenas se houver desconto) -->
    <div v-if="product.discount" class="discount-badge">-{{ product.discount }}%</div>

    <!-- Imagem do produto (emoji como placeholder visual) -->
    <div class="card-image">
      <span class="product-emoji">{{ product.emoji }}</span>
    </div>

    <div class="card-body">
      <!-- Categoria do produto -->
      <span class="category-tag">{{ product.category }}</span>

      <h3 class="product-name">{{ product.name }}</h3>

      <!-- Avaliação com estrelas -->
      <div class="rating">
        <!-- v-for: renderiza estrelas dinamicamente -->
        <span
          v-for="i in 5"
          :key="i"
          class="star"
          :class="{ filled: i <= Math.round(product.rating) }"
        >★</span>
        <span class="rating-count">({{ product.reviews }})</span>
      </div>

      <div class="card-footer">
        <div class="price-group">
          <!-- Preço original riscado (v-if: apenas se houver desconto) -->
          <span v-if="product.discount" class="original-price">
            R$ {{ originalPrice }}
          </span>
          <span class="price">R$ {{ formattedPrice }}</span>
        </div>

        <!-- Botão de adicionar ao carrinho -->
        <button class="add-btn" @click.stop="$emit('add-to-cart', product)" title="Adicionar ao carrinho">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',

  props: {
    // Objeto com todos os dados do produto
    product: { type: Object, required: true },
  },

  emits: ['add-to-cart'],

  computed: {
    // Preço formatado em moeda brasileira
    formattedPrice() {
      return this.product.price.toFixed(2).replace('.', ',')
    },
    // Preço original antes do desconto
    originalPrice() {
      if (!this.product.discount) return ''
      const orig = this.product.price / (1 - this.product.discount / 100)
      return orig.toFixed(2).replace('.', ',')
    },
  },

  methods: {
    goToDetail() {
      this.$router.push(`/produto/${this.product.id}`)
    },
  },
}
</script>

<style scoped>
.product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
  position: relative;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: 0 8px 32px rgba(79, 124, 255, 0.15);
}

.discount-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: var(--color-orange);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  z-index: 1;
}

.card-image {
  background: var(--color-surface-2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
}

.product-emoji { font-size: 5rem; user-select: none; }

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.category-tag {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  font-weight: 700;
}

.product-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text);
}

/* Estrelas de avaliação */
.rating {
  display: flex;
  align-items: center;
  gap: 1px;
}

.star {
  color: var(--color-border);
  font-size: 0.85rem;
  transition: color var(--transition);
}

.star.filled { color: #f5b731; }

.rating-count {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-left: 0.3rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.price-group {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}

.original-price {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--color-text);
}

.add-btn {
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition), transform var(--transition);
  flex-shrink: 0;
}

.add-btn:hover { background: var(--color-accent-hover); }
.add-btn:active { transform: scale(0.92); }
</style>
