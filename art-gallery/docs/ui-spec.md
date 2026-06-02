# 🎨 Design System - Pallas Galaxy Art Gallery

## Overview

Este documento define o Design System completo para o site Pallas Galaxy Art Gallery.

---

## 🎨 Paleta de Cores

### Cores Principais

| Nome | Hex | Uso |
|------|-----|-----|
| **White** | `#FFFFFF` | Primary / Botões principais / Texto |
| **Black** | `#0B090A` | Background principal |
| **Red** | `#A4161A` | Accent / Detalhes / Hover effects |

### Configuração Tailwind

```js
colors: {
  background: "#0B090A",      // Fundo principal
  foreground: "#FFFFFF",      // Texto principal
  
  primary: {
    DEFAULT: "#FFFFFF",       // Botões brancos
    foreground: "#0B090A",    // Texto em botões brancos
  },
  
  accent: {
    DEFAULT: "#A4161A",       // Detalhes em vermelho
    foreground: "#FFFFFF",
    light: "#c41e22",         // Vermelho claro (hover)
    dark: "#8a1216",          // Vermelho escuro
  },
  
  card: "#121010",            // Cards
  secondary: "#1a1617",       // Elementos secundários
  muted: {
    DEFAULT: "#2a2628",       // Elementos discretos
    foreground: "#a0a0a0",    // Texto muted
  },
  border: "#2a2628",          // Bordas
}
```

---

## 📝 Tipografia

### Fontes

| Tipo | Família | Uso |
|------|---------|-----|
| **Display** | Playfair Display | Títulos, Headers |
| **Body** | Fira Sans Condensed | Texto, UI |

---

## 🧩 Componentes

### Button Variants

- `primary` - Branco com texto escuro
- `accent` - Vermelho para ações de destaque
- `outline` - Borda branca
- `outline-accent` - Borda vermelha
- `ghost` - Transparente
- `link` - Texto com underline

### Uso de Cores

- **Vermelho (`accent`)**: Links, hovers, detalhes decorativos, badges, indicadores ativos
- **Branco (`primary`)**: Botões principais, texto, logo
- **Preto (`background`)**: Fundos, cards

---

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── ui/              # button, input, label, textarea, carousel, skeleton
│   ├── effects/         # Floating, AnimatedText, FadeIn
│   ├── Pages/           # HomePage, Gallery, ArtistProfile, Contact, SubColecao
│   ├── NavBar.js        
│   └── Footer.js        
├── hooks/               # use-mouse-position-ref
├── lib/                 # utils.js
└── index.css            # Tailwind config
```

---

**Última atualização**: Fevereiro 2026
