<template>
  <div class="products-page">
    <div class="container">
      <!-- Cabeçalho da página -->
      <div class="page-header fade-in">
        <h1>Produtos</h1>
        <p>{{ filteredProducts.length }} produto(s) encontrado(s)</p>
      </div>

      <!-- ===== FILTROS E BUSCA (Interatividade 1: busca + filtros) ===== -->
      <div class="toolbar fade-in">
        <!-- Campo de busca com v-model para busca reativa -->
        <div class="search-wrap">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar produto..."
            class="search-input"
          />
          <!-- v-if: exibe botão de limpar apenas se houver texto -->
          <button v-if="searchQuery" class="clear-search" @click="searchQuery = ''">✕</button>
        </div>

        <!-- Filtro por categoria -->
        <div class="filters">
          <!-- v-for: renderiza botão para cada categoria -->
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Ordenação -->
        <select v-model="sortOrder" class="sort-select">
          <option value="default">Ordenar por</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
          <option value="discount">Maior desconto</option>
        </select>
      </div>

      <!-- ===== GRADE DE PRODUTOS ===== -->
      <!-- v-if: mostra grid se houver resultados -->
      <div v-if="filteredProducts.length > 0" class="products-grid fade-in">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="$emit('add-to-cart', $event)"
        />
      </div>

      <!-- v-else: exibe mensagem quando não há resultados -->
      <div v-else class="empty-state fade-in">
        <span>🔍</span>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros ou o termo de busca.</p>
        <button class="btn btn-primary" @click="resetFilters">Limpar filtros</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { products, categories } from '../data/products.js'

export default {
  name: 'Products',
  components: { ProductCard },
  emits: ['add-to-cart'],

  data() {
    return {
      searchQuery: '',
      selectedCategory: 'Todos',
      sortOrder: 'default',
      allProducts: products,
      categories,
    }
  },

  computed: {
    // Filtra e ordena os produtos conforme busca, categoria e ordenação
    filteredProducts() {
      let result = [...this.allProducts]

      // Filtra por categoria (v-model selectedCategory)
      if (this.selectedCategory !== 'Todos') {
        result = result.filter(p => p.category === this.selectedCategory)
      }

      // Filtra por texto de busca (case-insensitive)
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase()
        result = result.filter(
          p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
        )
      }

      // Ordena conforme seleção do usuário
      switch (this.sortOrder) {
        case 'price-asc':  result.sort((a, b) => a.price - b.price); break
        case 'price-desc': result.sort((a, b) => b.price - a.price); break
        case 'rating':     result.sort((a, b) => b.rating - a.rating); break
        case 'discount':   result.sort((a, b) => b.discount - a.discount); break
      }

      return result
    },
  },

  methods: {
    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = 'Todos'
      this.sortOrder = 'default'
    },
  },

  // Lê parâmetro de URL ?categoria=... para pré-selecionar categoria
  mounted() {
    const cat = this.$route.query.categoria
    if (cat && this.categories.includes(cat)) {
      this.selectedCategory = cat
    }
  },
}
</script>

<style scoped>
.products-page { padding: 2.5rem 0 4rem; }

.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
}

.page-header p { color: var(--color-text-muted); font-size: 0.9rem; margin-top: 0.25rem; }

/* ===== TOOLBAR ===== */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  padding-left: 2.25rem;
  padding-right: 2rem;
  height: 38px;
}

.clear-search {
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  padding: 0.2rem;
  cursor: pointer;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.filter-btn {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  border-radius: var(--radius);
  padding: 0.38rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 500;
  transition: all var(--transition);
}

.filter-btn:hover { border-color: var(--color-accent); color: var(--color-text); }
.filter-btn.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.sort-select {
  min-width: 160px;
  height: 38px;
  padding: 0 0.9rem;
}

/* ===== GRID ===== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 5rem 1rem;
}

.empty-state span { font-size: 4rem; display: block; margin-bottom: 1rem; }
.empty-state h3 { font-family: var(--font-display); font-size: 1.3rem; margin-bottom: 0.5rem; }
.empty-state p { color: var(--color-text-muted); margin-bottom: 1.5rem; }

/* ===== RESPONSIVO ===== */
@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .toolbar { flex-direction: column; align-items: stretch; }
  .search-wrap { min-width: 100%; }
}

@media (max-width: 480px) {
  .products-grid { grid-template-columns: 1fr; }
}
</style>
