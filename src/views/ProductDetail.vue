<template>
  <div class="detail-page">
    <div class="container">
      <!-- v-if: exibe produto ou mensagem de não encontrado -->
      <div v-if="product" class="product-detail fade-in">

        <!-- Breadcrumb de navegação -->
        <nav class="breadcrumb">
          <router-link to="/">Início</router-link>
          <span>›</span>
          <router-link to="/produtos">Produtos</router-link>
          <span>›</span>
          <span>{{ product.name }}</span>
        </nav>

        <div class="detail-grid">
          <!-- Imagem / visual -->
          <div class="detail-image">
            <span class="big-emoji">{{ product.emoji }}</span>
            <!-- Badge de desconto (v-if) -->
            <div v-if="product.discount" class="big-badge">
              -{{ product.discount }}% OFF
            </div>
          </div>

          <!-- Informações do produto -->
          <div class="detail-info">
            <span class="category-tag">{{ product.category }}</span>
            <h1>{{ product.name }}</h1>

            <!-- Avaliação -->
            <div class="rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(product.rating) }">★</span>
              <span class="rating-text">{{ product.rating }} ({{ product.reviews }} avaliações)</span>
            </div>

            <!-- Preço -->
            <div class="price-section">
              <div v-if="product.discount" class="original">
                De: R$ {{ originalPrice }}
              </div>
              <div class="current-price">
                R$ {{ formattedPrice }}
              </div>
              <div v-if="product.discount" class="savings">
                Você economiza R$ {{ savings }}
              </div>
            </div>

            <!-- Descrição -->
            <p class="description">{{ product.description }}</p>

            <!-- Especificações técnicas (v-for) -->
            <div class="specs">
              <h4>Especificações</h4>
              <ul>
                <li v-for="spec in product.specs" :key="spec">
                  <span>✓</span> {{ spec }}
                </li>
              </ul>
            </div>

            <!-- Estoque -->
            <p class="stock" :class="{ low: product.stock <= 5 }">
              <span v-if="product.stock > 5">✓ Em estoque ({{ product.stock }} unidades)</span>
              <span v-else-if="product.stock > 0">⚠️ Últimas {{ product.stock }} unidades!</span>
              <span v-else>✕ Fora de estoque</span>
            </p>

            <!-- Quantidade e botão de compra -->
            <div class="buy-section">
              <div class="quantity-control">
                <button @click="quantity > 1 ? quantity-- : null">−</button>
                <span>{{ quantity }}</span>
                <button @click="quantity < product.stock ? quantity++ : null">+</button>
              </div>

              <button class="btn btn-primary add-cart-btn" @click="handleAddToCart">
                🛒 Adicionar ao carrinho
              </button>

              <!-- Botão de detalhes abre modal -->
              <button class="btn btn-secondary" @click="showModal = true">
                Ver especificações completas
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Produto não encontrado -->
      <div v-else class="not-found fade-in">
        <span>😕</span>
        <h2>Produto não encontrado</h2>
        <router-link to="/produtos" class="btn btn-primary">Voltar aos produtos</router-link>
      </div>
    </div>

    <!-- ===== MODAL de especificações (Interatividade 2: Modal) ===== -->
    <transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal-box">
          <div class="modal-header">
            <h3>{{ product?.name }}</h3>
            <button class="modal-close" @click="showModal = false">✕</button>
          </div>
          <div class="modal-body">
            <p class="modal-desc">{{ product?.description }}</p>
            <h4>Especificações Técnicas</h4>
            <ul class="modal-specs">
              <li v-for="spec in product?.specs" :key="spec">
                <span class="spec-check">✓</span>
                <span>{{ spec }}</span>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="handleAddToCart(); showModal = false">
              🛒 Adicionar ao carrinho
            </button>
            <button class="btn btn-secondary" @click="showModal = false">Fechar</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { products } from '../data/products.js'

export default {
  name: 'ProductDetail',
  emits: ['add-to-cart'],

  data() {
    return {
      quantity: 1,
      showModal: false,
    }
  },

  computed: {
    // Encontra o produto pelo ID na rota
    product() {
      const id = parseInt(this.$route.params.id)
      return products.find(p => p.id === id) || null
    },

    formattedPrice() {
      return this.product?.price.toFixed(2).replace('.', ',') ?? ''
    },

    originalPrice() {
      if (!this.product?.discount) return ''
      const orig = this.product.price / (1 - this.product.discount / 100)
      return orig.toFixed(2).replace('.', ',')
    },

    savings() {
      if (!this.product?.discount) return ''
      const orig = this.product.price / (1 - this.product.discount / 100)
      return (orig - this.product.price).toFixed(2).replace('.', ',')
    },
  },

  methods: {
    handleAddToCart() {
      for (let i = 0; i < this.quantity; i++) {
        this.$emit('add-to-cart', this.product)
      }
    },
  },
}
</script>

<style scoped>
.detail-page { padding: 2rem 0 4rem; }

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.breadcrumb a { color: var(--color-accent); }
.breadcrumb a:hover { text-decoration: underline; }

/* Grid de detalhe */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* Imagem */
.detail-image {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 4rem 2rem;
}

.big-emoji { font-size: 10rem; user-select: none; }

.big-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--color-orange);
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius);
}

/* Info */
.category-tag {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

.detail-info h1 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.rating { display: flex; align-items: center; gap: 3px; margin-bottom: 1.5rem; }
.star { color: var(--color-border); font-size: 1rem; }
.star.filled { color: #f5b731; }
.rating-text { font-size: 0.82rem; color: var(--color-text-muted); margin-left: 0.4rem; }

/* Preço */
.price-section { margin-bottom: 1.5rem; }
.original { font-size: 0.9rem; color: var(--color-text-muted); text-decoration: line-through; }
.current-price {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}
.savings { font-size: 0.85rem; color: var(--color-success); font-weight: 600; margin-top: 0.25rem; }

.description { color: var(--color-text-muted); font-size: 0.93rem; line-height: 1.7; margin-bottom: 1.5rem; }

/* Specs */
.specs h4 { font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); margin-bottom: 0.75rem; }
.specs ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.5rem; }
.specs li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
.specs li span:first-child { color: var(--color-success); font-weight: 700; }

.stock { font-size: 0.88rem; font-weight: 600; margin-bottom: 1.5rem; }
.stock.low { color: var(--color-orange); }

/* Buy section */
.buy-section { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}

.quantity-control button {
  background: var(--color-surface-2);
  border: none;
  color: var(--color-text);
  width: 36px;
  height: 40px;
  font-size: 1.1rem;
  transition: background var(--transition);
}

.quantity-control button:hover { background: var(--color-border); }
.quantity-control span { padding: 0 1rem; font-weight: 600; font-size: 0.95rem; min-width: 40px; text-align: center; }

.add-cart-btn { flex: 1; justify-content: center; }

/* Not found */
.not-found { text-align: center; padding: 5rem 1rem; }
.not-found span { font-size: 4rem; display: block; margin-bottom: 1rem; }
.not-found h2 { font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1.5rem; }

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

.modal-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h3 { font-family: var(--font-display); font-size: 1.1rem; }

.modal-close {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  transition: color var(--transition);
}

.modal-close:hover { color: var(--color-text); }

.modal-body { padding: 1.5rem; }
.modal-desc { color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.25rem; }
.modal-body h4 { font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); margin-bottom: 0.75rem; }

.modal-specs { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
.modal-specs li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem; }
.spec-check { color: var(--color-success); font-weight: 700; flex-shrink: 0; }

.modal-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--color-border);
}

/* Animação do modal */
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-box, .modal-leave-active .modal-box { transition: transform 0.25s ease; }
.modal-enter-from .modal-box { transform: scale(0.95); }

/* ===== RESPONSIVO ===== */
@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
  .big-emoji { font-size: 7rem; }
  .detail-info h1 { font-size: 1.4rem; }
  .current-price { font-size: 1.8rem; }
  .buy-section { flex-direction: column; }
  .add-cart-btn { width: 100%; }
}
</style>
