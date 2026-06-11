<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="logo-text">⚡ Tech<strong>Store</strong></span>
        <p>Os melhores produtos tech com os melhores preços.</p>
      </div>

      <div class="footer-links">
        <h4>Navegação</h4>
        <ul>
          <li><router-link to="/">Início</router-link></li>
          <li><router-link to="/produtos">Produtos</router-link></li>
          <li><router-link to="/contato">Contato</router-link></li>
          <li><router-link to="/carrinho">Carrinho</router-link></li>
        </ul>
      </div>

      <div class="footer-links">
        <h4>Categorias</h4>
        <ul>
          <li><router-link to="/produtos?categoria=smartphones">Smartphones</router-link></li>
          <li><router-link to="/produtos?categoria=notebooks">Notebooks</router-link></li>
          <li><router-link to="/produtos?categoria=acessorios">Acessórios</router-link></li>
          <li><router-link to="/produtos?categoria=audio">Áudio</router-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© {{ year }} TechStore — Projeto Front-End Vue.js</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    year() { return new Date().getFullYear() }
  }
}
</script>

<style scoped>
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: 4rem;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2.5rem;
  padding: 3rem 1.5rem;
}

.footer-brand .logo-text {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
}

.footer-brand .logo-text strong { color: var(--color-accent); }

.footer-brand p {
  color: var(--color-text-muted);
  font-size: 0.88rem;
  margin-top: 0.6rem;
  max-width: 240px;
}

.footer-links h4 {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.footer-links ul { list-style: none; }
.footer-links li { margin-bottom: 0.55rem; }
.footer-links a {
  color: var(--color-text-muted);
  font-size: 0.88rem;
  transition: color var(--transition);
}
.footer-links a:hover { color: var(--color-accent); }

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding: 1rem 1.5rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
  .footer-brand { grid-column: 1 / -1; }
}

@media (max-width: 480px) {
  .footer-inner { grid-template-columns: 1fr; }
}
</style>
