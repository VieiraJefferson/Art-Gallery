# 🤖 PROMPT PARA AGENTE IMPLEMENTADOR

Copie e cole este prompt completo para o agente que vai implementar:

---

## PROMPT:

```
Você é o agente "Implementador de Redesign".

## Contexto do Projeto
- App React de galeria de arte (Pallas Galaxy) existente em `/art-gallery`
- Projeto usa Create React App com React 19
- Atualmente usa SCSS para estilos
- Precisa migrar para Tailwind CSS + shadcn/ui style components
- Componentes de referência já salvos em `/docs/redesign/component-refs/`

## Sua Missão
Implementar o redesign completo seguindo o guia em `/docs/redesign/IMPLEMENTATION-GUIDE.md`

## FASE 1: Setup (FAZER PRIMEIRO)

1. Instalar Tailwind CSS:
   ```bash
   cd art-gallery
   npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
   npx tailwindcss init -p
   ```

2. Instalar dependências de animação e UI:
   ```bash
   npm install framer-motion motion class-variance-authority clsx tailwind-merge
   npm install lucide-react @tabler/icons-react
   npm install @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-dialog
   npm install embla-carousel-react
   ```

3. Criar/configurar arquivos:
   - `tailwind.config.js` (config completa no IMPLEMENTATION-GUIDE.md)
   - `src/lib/utils.js` (função cn para classes)
   - `src/hooks/use-mouse-position-ref.js` (hook para efeito parallax)
   - Atualizar `src/index.css` com Tailwind + CSS variables

4. Adicionar fontes ao `public/index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Fira+Sans+Condensed:wght@300;400;500;600&display=swap" rel="stylesheet">
   ```

## FASE 2: Criar Componentes UI Base

Criar em `src/components/ui/`:
- `button.jsx` - Baseado em `/docs/redesign/component-refs/Button.tsx` (converter para JS)
- `input.jsx` - Input com estilos shadcn
- `label.jsx` - Label do Radix
- `textarea.jsx` - Textarea estilizado
- `carousel.jsx` - Usando embla-carousel

## FASE 3: Adaptar Componentes de Referência

Converter TypeScript → JavaScript e Next.js → React Router:

1. `Floating.tsx` → `src/components/effects/Floating.jsx`
   - Remover types, usar PropTypes ou JSDoc se necessário
   - Usa: framer-motion, hook useMousePositionRef

2. `AnimatedText.tsx` → `src/components/effects/AnimatedText.jsx`
   - Para títulos principais das páginas
   - Usa: framer-motion

3. `Menu.tsx` → `src/components/ui/Menu.jsx`
   - Trocar `Link` de next/link por react-router-dom
   - Usa: framer-motion

4. `Carousel.tsx` → `src/components/ui/Carousel3D.jsx`
   - Carrossel 3D com efeito de perspectiva
   - Trocar @tabler/icons-react por lucide-react se preferir

5. `Gallery4.tsx` → `src/components/ui/GalleryCarousel.jsx`
   - Carrossel horizontal para galeria

6. `Contact2.tsx` → `src/components/ui/ContactForm.jsx`
   - Formulário de contato

7. `FooterSection.tsx` → Base para refatorar Footer.js

## FASE 4: Refatorar Páginas (uma por vez)

### Ordem recomendada:

1. **NavBar.js** - Aplicar novo Menu com animações
2. **Footer.js** - Simplificar usando FooterSection como base
3. **HomePage.js** - Hero com Floating + AnimatedText + Carousel3D
4. **Gallery.js** - Usar GalleryCarousel
5. **Contact.js** - Usar ContactForm
6. **ArtistProfile.js** - Adicionar ScrollAndSwapText
7. **SubColecao.js** - Aplicar novo estilo

### Para cada página:
- Manter lógica e dados existentes
- Substituir classes SCSS por Tailwind
- Adicionar componentes animados
- Testar responsividade

## FASE 5: Cleanup

1. Remover arquivos SCSS não utilizados após migração
2. Remover dependências antigas (se não usadas)
3. Testar todas as rotas
4. Verificar console por erros
5. Testar em mobile

## Regras Importantes

1. **NÃO quebrar funcionalidades existentes**
2. **Manter todas as rotas funcionando**
3. **Preservar dados e imagens do Cloudinary**
4. **Commits incrementais** - uma feature por vez
5. **Testar após cada mudança**

## Arquivos de Referência

- Guia completo: `/docs/redesign/IMPLEMENTATION-GUIDE.md`
- Componentes de ref: `/docs/redesign/component-refs/*.tsx`
- Design tokens (SCSS): `/src/styles/design-system/` (usar como referência de cores)
- Conteúdo: `/docs/redesign/content.md`

## Paleta de Cores (manter)

- Background: #060608 (escuro)
- Primary/Accent: #ff347f (magenta/rosa)
- Text: #fcefed (claro)
- Muted: #6b6a69

## Comece por:

1. Ler o IMPLEMENTATION-GUIDE.md completo
2. Executar comandos de instalação
3. Configurar Tailwind
4. Criar utils.js e hook
5. Depois seguir as fases em ordem

Boa sorte! 🎨
```

---

## Resumo dos Componentes de Referência Salvos

| Arquivo | Propósito | Dependências |
|---------|-----------|--------------|
| `Floating.tsx` | Efeito parallax no Hero | framer-motion, hook customizado |
| `FooterSection.tsx` | Footer minimalista | lucide-react |
| `Gallery4.tsx` | Carrossel de galeria | embla-carousel, lucide-react |
| `Menu.tsx` | Navegação animada | framer-motion |
| `Button.tsx` | Botões com variantes | class-variance-authority, radix-ui |
| `ScrollAndSwapText.tsx` | Texto com scroll | framer-motion |
| `AnimatedText.tsx` | Títulos animados | framer-motion |
| `Carousel.tsx` | Carrossel 3D | @tabler/icons-react |
| `Contact2.tsx` | Formulário de contato | shadcn components |

---

## Estimativa de Tempo

- **Fase 1 (Setup):** 30-60 min
- **Fase 2 (Componentes UI):** 1-2 horas
- **Fase 3 (Adaptar refs):** 2-3 horas
- **Fase 4 (Refatorar páginas):** 3-5 horas
- **Fase 5 (Cleanup/testes):** 1 hora

**Total estimado:** 8-12 horas de trabalho

---

## Pronto para Implementação! ✅
