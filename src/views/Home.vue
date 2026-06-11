<template>
  <div class="home">
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content fade-in">
          <span class="hero-eyebrow">🔥 Promoções imperdíveis</span>
          <h1 class="hero-title">
            Tecnologia de ponta<br>
            <span class="accent">no melhor preço</span>
          </h1>
          <p class="hero-desc">
            Smartphones, notebooks, acessórios e muito mais.<br>
            Entrega rápida para todo o Brasil.
          </p>
          <div class="hero-ctas">
            <router-link to="/produtos" class="btn btn-primary">Ver produtos</router-link>
            <router-link to="/contato" class="btn btn-secondary">Fale conosco</router-link>
          </div>
        </div>
        <div class="hero-visual fade-in">
          <div class="hero-card">
            <span class="hero-emoji">📱</span>
            <div class="hero-card-info">
              <p>iPhone 15 Pro Max</p>
              <span>R$ 7.999,99</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DESTAQUES / ESTATÍSTICAS ===== -->
    <section class="stats-bar">
      <div class="container stats-inner">
        <!-- v-for: renderiza cada estatística dinamicamente -->
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <span class="stat-icon">{{ stat.icon }}</span>
          <div>
            <strong>{{ stat.value }}</strong>
            <p>{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CATEGORIAS ===== -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Categorias</h2>
        <div class="categories-grid">
          <!-- v-for: itera sobre a lista de categorias -->
          <div
            v-for="cat in categoryCards"
            :key="cat.name"
            class="cat-card"
            @click="$router.push(`/produtos?categoria=${cat.slug}`)"
          >
            <span class="cat-emoji">{{ cat.emoji }}</span>
            <span class="cat-name">{{ cat.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PRODUTOS EM DESTAQUE ===== -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Destaques</h2>
          <router-link to="/produtos" class="see-all">Ver todos →</router-link>
        </div>

        <div class="products-grid">
          <!-- v-for: renderiza os produtos em destaque -->
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="$emit('add-to-cart', $event)"
          />
        </div>
      </div>
    </section>

    <!-- ===== BANNER PROMO ===== -->
    <section class="promo-banner">
      <div class="container promo-inner">
        <div>
          <h3>🎯 Ofertas do dia</h3>
          <p>Até 18% de desconto em produtos selecionados</p>
        </div>
        <router-link to="/produtos" class="btn btn-orange">Ver ofertas</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { products } from '../data/products.js'

export default {
  name: 'Home',
  components: { ProductCard },
  emits: ['add-to-cart'],

  data() {
    return {
      stats: [
        { icon: '📦', value: '+10.000', label: 'Produtos entregues' },
        { icon: '⭐', value: '4.9/5', label: 'Avaliação média' },
        { icon: '🚚', value: '48h', label: 'Entrega expressa' },
        { icon: '🔒', label: 'Compra segura', value: '100%' },
      ],
      categoryCards: [
        { name: 'Smartphones', emoji: '📱', slug: 'Smartphones' },
        { name: 'Notebooks', emoji: '💻', slug: 'Notebooks' },
        { name: 'Áudio', emoji: '🎧', slug: 'Áudio' },
        { name: 'Wearables', emoji: '⌚', slug: 'Wearables' },
        { name: 'Acessórios', emoji: '🖱️', slug: 'Acessórios' },
        { name: 'Monitores', emoji: '🖥️', slug: 'Monitores' },
      ],
    }
  },

  computed: {
    // Seleciona os 6 primeiros produtos como destaque
    featuredProducts() {
      return products.slice(0, 6)
    },
  },
}
</script>

<style scoped>
/* ===== HERO ===== */
.hero {
  padding: 5rem 0 4rem;
  background: radial-gradient(ellipse at 70% 50%, rgba(79, 124, 255, 0.1) 0%, transparent 60%);
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-eyebrow {
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 700;
  background: rgba(79, 124, 255, 0.15);
  color: var(--color-accent);
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  margin-bottom: 1.2rem;
  border: 1px solid rgba(79, 124, 255, 0.3);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.accent { color: var(--color-accent); }

.hero-desc {
  color: var(--color-text-muted);
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

/* Card hero visual */
.hero-visual {
  display: flex;
  justify-content: center;
}

.hero-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2.5rem 3rem;
  text-align: center;
  box-shadow: 0 16px 64px rgba(0,0,0,0.4);
}

.hero-emoji { font-size: 7rem; display: block; }

.hero-card-info {
  margin-top: 1rem;
  font-weight: 600;
}

.hero-card-info span {
  display: block;
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-top: 0.3rem;
}

/* ===== STATS BAR ===== */
.stats-bar {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stats-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  padding: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.5rem;
  border-right: 1px solid var(--color-border);
}

.stat-item:last-child { border-right: none; }
.stat-item:first-child { padding-left: 0; }

.stat-icon { font-size: 1.6rem; }
.stat-item strong { font-family: var(--font-display); font-size: 1.1rem; display: block; }
.stat-item p { font-size: 0.8rem; color: var(--color-text-muted); }

/* ===== SECTIONS ===== */
.section { padding: 3.5rem 0; }

.section-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.see-all {
  font-size: 0.85rem;
  color: var(--color-accent);
  font-weight: 600;
  transition: opacity var(--transition);
}
.see-all:hover { opacity: 0.75; }

/* ===== CATEGORIAS ===== */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.cat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.25rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: border-color var(--transition), transform var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.cat-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.cat-emoji { font-size: 2rem; }
.cat-name { font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted); }

/* ===== PRODUCTS GRID ===== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

/* ===== PROMO BANNER ===== */
.promo-banner {
  background: linear-gradient(135deg, rgba(79, 124, 255, 0.15), rgba(79, 124, 255, 0.05));
  border: 1px solid rgba(79, 124, 255, 0.25);
  border-radius: var(--radius-lg);
  margin: 0 1.5rem 3rem;
}

.promo-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  gap: 1rem;
}

.promo-inner h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.promo-inner p { color: var(--color-text-muted); font-size: 0.9rem; }

/* ===== RESPONSIVO ===== */
@media (max-width: 1024px) {
  .categories-grid { grid-template-columns: repeat(3, 1fr); }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
  .stat-item:nth-child(2) { border-right: none; }
  .stat-item:nth-child(3) { border-right: 1px solid var(--color-border); }
}

@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .categories-grid { grid-template-columns: repeat(3, 1fr); }
  .stats-inner { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
  .stat-item { border: none !important; }
  .promo-inner { flex-direction: column; text-align: center; }
}

@media (max-width: 480px) {
  .products-grid { grid-template-columns: 1fr; }
  .categories-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
