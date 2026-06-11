<template>
  <div class="contact-page">
    <div class="container">
      <div class="contact-grid fade-in">

        <!-- Coluna de informações -->
        <div class="contact-info">
          <h1>Fale conosco</h1>
          <p class="subtitle">Nossa equipe está pronta para ajudar você com qualquer dúvida.</p>

          <!-- Lista de canais de contato (v-for) -->
          <div class="info-cards">
            <div v-for="info in contactInfo" :key="info.label" class="info-card">
              <span class="info-icon">{{ info.icon }}</span>
              <div>
                <strong>{{ info.label }}</strong>
                <p>{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Horário de atendimento -->
          <div class="hours-box">
            <h4>🕐 Horário de atendimento</h4>
            <ul>
              <li>Segunda a Sexta: 8h – 18h</li>
              <li>Sábado: 9h – 13h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        <!-- ===== FORMULÁRIO com validação (Interatividade 3: Formulário + Validação) ===== -->
        <div class="contact-form-wrap">
          <h2>Enviar mensagem</h2>

          <!-- v-if: mostra alerta de sucesso ao enviar -->
          <div v-if="formSent" class="form-success fade-in">
            <span>✅</span>
            <div>
              <strong>Mensagem enviada!</strong>
              <p>Responderemos em até 24 horas.</p>
            </div>
            <button @click="resetForm" class="btn btn-secondary">Nova mensagem</button>
          </div>

          <!-- v-else: exibe formulário -->
          <form v-else @submit.prevent="submitForm" novalidate>

            <!-- Nome -->
            <div class="form-group">
              <label for="name">Nome completo *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Seu nome"
                :class="{ error: errors.name }"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" class="error-msg">{{ errors.name }}</p>
            </div>

            <!-- E-mail -->
            <div class="form-group">
              <label for="email">E-mail *</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="seu@email.com"
                :class="{ error: errors.email }"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
            </div>

            <!-- Telefone -->
            <div class="form-group">
              <label for="phone">Telefone</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="(xx) xxxxx-xxxx"
              />
            </div>

            <!-- Assunto -->
            <div class="form-group">
              <label for="subject">Assunto *</label>
              <select
                id="subject"
                v-model="form.subject"
                :class="{ error: errors.subject }"
                @blur="validateField('subject')"
              >
                <option value="">Selecione o assunto</option>
                <option value="compra">Dúvida sobre compra</option>
                <option value="troca">Troca ou devolução</option>
                <option value="tecnico">Suporte técnico</option>
                <option value="outro">Outro</option>
              </select>
              <p v-if="errors.subject" class="error-msg">{{ errors.subject }}</p>
            </div>

            <!-- Mensagem -->
            <div class="form-group">
              <label for="message">Mensagem *</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="Descreva sua dúvida..."
                :class="{ error: errors.message }"
                @blur="validateField('message')"
              ></textarea>
              <!-- Contador de caracteres -->
              <div class="char-count" :class="{ warning: form.message.length > 450 }">
                {{ form.message.length }}/500
              </div>
              <p v-if="errors.message" class="error-msg">{{ errors.message }}</p>
            </div>

            <!-- Botão de envio -->
            <button
              type="submit"
              class="btn btn-primary submit-btn"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Enviando...</span>
              <span v-else>Enviar mensagem</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',

  data() {
    return {
      // Dados do formulário (v-model)
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      },

      // Erros de validação
      errors: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },

      formSent: false,
      isSubmitting: false,

      // Informações de contato para listar com v-for
      contactInfo: [
        { icon: '📧', label: 'E-mail', value: 'contato@techstore.com.br' },
        { icon: '📞', label: 'Telefone', value: '(41) 3000-0000' },
        { icon: '💬', label: 'WhatsApp', value: '(41) 99000-0000' },
        { icon: '📍', label: 'Endereço', value: 'Laranjeiras do Sul, PR' },
      ],
    }
  },

  methods: {
    // Valida um campo específico ao sair do foco (blur)
    validateField(field) {
      switch (field) {
        case 'name':
          this.errors.name = this.form.name.trim().length < 3
            ? 'Nome deve ter pelo menos 3 caracteres.'
            : ''
          break

        case 'email': {
          const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          this.errors.email = !emailRe.test(this.form.email)
            ? 'Informe um e-mail válido.'
            : ''
          break
        }

        case 'subject':
          this.errors.subject = !this.form.subject
            ? 'Selecione um assunto.'
            : ''
          break

        case 'message':
          if (!this.form.message.trim()) {
            this.errors.message = 'A mensagem não pode estar vazia.'
          } else if (this.form.message.length > 500) {
            this.errors.message = 'Mensagem deve ter no máximo 500 caracteres.'
          } else {
            this.errors.message = ''
          }
          break
      }
    },

    // Valida todos os campos e retorna se o form é válido
    validateAll() {
      ['name', 'email', 'subject', 'message'].forEach(f => this.validateField(f))
      return !Object.values(this.errors).some(e => e !== '')
    },

    // Submete o formulário se válido
    async submitForm() {
      if (!this.validateAll()) return
      this.isSubmitting = true

      // Simula envio com delay de 1.2s
      await new Promise(resolve => setTimeout(resolve, 1200))

      this.isSubmitting = false
      this.formSent = true
    },

    resetForm() {
      this.form = { name: '', email: '', phone: '', subject: '', message: '' }
      this.errors = { name: '', email: '', subject: '', message: '' }
      this.formSent = false
    },
  },
}
</script>

<style scoped>
.contact-page { padding: 3rem 0 4rem; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 3rem;
  align-items: start;
}

/* ===== INFO ===== */
.contact-info h1 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.subtitle { color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem; }

.info-cards { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
}

.info-icon { font-size: 1.5rem; flex-shrink: 0; }
.info-card strong { display: block; font-size: 0.88rem; font-weight: 700; }
.info-card p { font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.15rem; }

.hours-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.25rem;
}

.hours-box h4 { font-size: 0.88rem; font-weight: 700; margin-bottom: 0.75rem; }
.hours-box ul { list-style: none; }
.hours-box li { font-size: 0.85rem; color: var(--color-text-muted); padding: 0.25rem 0; border-bottom: 1px solid var(--color-border); }
.hours-box li:last-child { border-bottom: none; }

/* ===== FORM ===== */
.contact-form-wrap {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.contact-form-wrap h2 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

input.error, select.error, textarea.error {
  border-color: var(--color-error);
}

textarea { resize: vertical; min-height: 120px; }

.char-count {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  text-align: right;
  margin-top: 0.3rem;
}

.char-count.warning { color: var(--color-orange); }

.submit-btn { width: 100%; justify-content: center; padding: 0.8rem; font-size: 1rem; }
.submit-btn:disabled { opacity: 0.6; pointer-events: none; }

/* Sucesso */
.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem 0;
}

.form-success span { font-size: 3rem; }
.form-success strong { display: block; font-size: 1.1rem; margin-bottom: 0.25rem; }
.form-success p { color: var(--color-text-muted); font-size: 0.88rem; }

/* ===== RESPONSIVO ===== */
@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
}
</style>
