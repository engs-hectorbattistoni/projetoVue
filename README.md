# ⚡ TechStore — Loja Virtual Vue.js

Projeto desenvolvido com **Vue.js 3 + Vite + Vue Router** como trabalho acadêmico do 2º bimestre.


## 🚀 Como executar o projeto

### Pré-requisitos
#
- **Node.js** v18 ou superior  
  → [https://nodejs.org](https://nodejs.org)

### Passo a passo

```bash
# 1. Baixe o zip do projeto

# 2. Entre na pasta do projeto

# 3. Instale as dependências
npm install

# 4. Execute o servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em **http://localhost:5173**

---

## 🗂️ Estrutura do Projeto

```
techstore/
├── index.html                  # Ponto de entrada HTML
├── vite.config.js              # Configuração do Vite
├── package.json
└── src/
    ├── main.js                 # Inicialização do Vue
    ├── App.vue                 # Componente raiz (estado global do carrinho)
    ├── assets/
    │   └── global.css          # Variáveis CSS e estilos globais
    ├── router/
    │   └── index.js            # Configuração do Vue Router
    ├── data/
    │   └── products.js         # Dados dos produtos (mock)
    ├── components/
    │   ├── Navbar.vue          # Barra de navegação (responsiva + hamburger)
    │   ├── Footer.vue          # Rodapé
    │   └── ProductCard.vue     # Card de produto reutilizável
    └── views/
        ├── Home.vue            # Página inicial (hero, categorias, destaques)
        ├── Products.vue        # Catálogo com busca + filtros + ordenação
        ├── ProductDetail.vue   # Detalhe do produto + modal de specs
        ├── Cart.vue            # Carrinho + cupom + finalização
        └── Contact.vue         # Formulário de contato com validação
```

---

## 🎨 Funcionalidades

- 🛍️ Catálogo com 12 produtos tech
- 🔍 Busca em tempo real por nome ou categoria
- 🏷️ Filtro por categoria + ordenação por preço/avaliação/desconto
- 🛒 Carrinho persistente durante a sessão com controle de quantidade
- 🎟️ Cupons de desconto válidos: `TECH10`, `VUEJS`, `STORE20`
- 🚚 Frete grátis automático para compras acima de R$ 299
- 📋 Modal de especificações técnicas
- 📬 Formulário de contato com validação completa
- 🔔 Toast de notificação ao adicionar ao carrinho
- 📱 Design 100% responsivo
