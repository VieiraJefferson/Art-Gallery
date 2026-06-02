# 🎨 Guia de Implementação - Redesign Pallas Galaxy

## 📋 Visão Geral

Este documento contém todas as instruções para implementar o redesign da galeria de arte "Pallas Galaxy" usando os componentes de referência do 21st.dev e Dribbble.

---

## 🔧 FASE 1: Setup de Dependências

### 1.1 Instalar Tailwind CSS

O projeto atual usa SCSS puro. Precisamos migrar para Tailwind CSS.

```bash
cd art-gallery
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 1.2 Configurar `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["Playfair Display", "Times New Roman", "serif"],
        body: ["Fira Sans Condensed", "Helvetica Neue", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 1.3 Instalar Dependências Necessárias

```bash
# Animações e UI
npm install framer-motion motion
npm install class-variance-authority clsx tailwind-merge
npm install tailwindcss-animate

# Ícones
npm install lucide-react @tabler/icons-react

# Radix UI Primitives (base do shadcn)
npm install @radix-ui/react-slot
npm install @radix-ui/react-label
npm install @radix-ui/react-dialog
npm install @radix-ui/react-tabs

# Carousel (embla)
npm install embla-carousel-react
```

### 1.4 Criar arquivo de utilitários `src/lib/utils.js`

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### 1.5 Adicionar CSS Variables ao `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 10% 3%;
    --foreground: 0 0% 98%;
    --card: 240 10% 7%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 7%;
    --popover-foreground: 0 0% 98%;
    --primary: 340 82% 60%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 10% 15%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 10% 15%;
    --muted-foreground: 240 5% 55%;
    --accent: 340 82% 60%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62% 50%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 10% 20%;
    --input: 240 10% 20%;
    --ring: 340 82% 60%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: "Fira Sans Condensed", sans-serif;
  }
}
```

---

## 🔧 FASE 2: Criar Componentes UI Base (shadcn-style)

### 2.1 Estrutura de Pastas

```
src/
├── components/
│   └── ui/           # Componentes shadcn adaptados
│       ├── button.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── textarea.jsx
│       ├── carousel.jsx
│       └── card.jsx
├── hooks/
│   └── use-mouse-position-ref.js
├── lib/
│   └── utils.js
```

### 2.2 Criar Hook `src/hooks/use-mouse-position-ref.js`

```js
import { useRef, useEffect } from "react";

export function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      positionRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      };
    };

    const handleMouseLeave = () => {
      positionRef.current = { x: 0, y: 0 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  return positionRef;
}
```

---

## 🔧 FASE 3: Adaptar Componentes de Referência

Os componentes de referência estão em: `docs/redesign/component-refs/`

### 3.1 Mapeamento de Componentes → Páginas

| Componente de Ref | Usar em | Descrição |
|-------------------|---------|-----------|
| `Floating.tsx` | HomePage (Hero) | Efeito parallax no background |
| `FooterSection.tsx` | Footer.js | Footer minimalista |
| `Gallery4.tsx` | Gallery.js | Carrossel horizontal de coleções |
| `Menu.tsx` | NavBar.js | Navegação com animação |
| `Button.tsx` | Global | Botões com variantes |
| `ScrollAndSwapText.tsx` | ArtistProfile.js | Textos com scroll |
| `AnimatedText.tsx` | Todos os títulos | Títulos animados |
| `Carousel.tsx` | HomePage, SubColecao | Carrossel 3D de imagens |
| `Contact2.tsx` | Contact.js | Formulário de contato |

### 3.2 Conversões Necessárias

1. **TypeScript → JavaScript**: Remover tipos, interfaces e anotações
2. **Next.js → React Router**: 
   - `Link` do next/link → `Link` do react-router-dom
   - Remover `"use client"` (não necessário no CRA)
3. **Imports de shadcn**: Criar os componentes base primeiro

---

## 🔧 FASE 4: Implementar por Página

### 4.1 HomePage (`src/components/Pages/HomePage.js`)

**Mudanças:**
- [ ] Adicionar `Floating` + `FloatingElement` no Hero section
- [ ] Usar `AnimatedText` para o título principal
- [ ] Substituir `ImageSlider` por `Carousel` 3D
- [ ] Aplicar classes Tailwind

**Estrutura esperada:**
```jsx
<div className="relative min-h-screen">
  <Floating sensitivity={1} easingFactor={0.05}>
    <FloatingElement depth={1}>
      {/* Background image */}
    </FloatingElement>
  </Floating>
  
  <div className="relative z-10">
    <AnimatedText text="Where Surrealism..." />
    <p>...</p>
    <Button variant="primary">Explore Gallery</Button>
  </div>
  
  <Carousel slides={artworks} />
</div>
```

### 4.2 NavBar (`src/components/NavBar.js`)

**Mudanças:**
- [ ] Usar componente `Menu` com animações Framer Motion
- [ ] Manter SideBar para mobile
- [ ] Aplicar classes Tailwind

### 4.3 Gallery (`src/components/Pages/Gallery.js`)

**Mudanças:**
- [ ] Usar `Gallery4` para o carrossel horizontal
- [ ] Adicionar `AnimatedText` para títulos
- [ ] Cards com hover effect

### 4.4 Contact (`src/components/Pages/Contact.js`)

**Mudanças:**
- [ ] Substituir formulário atual por `Contact2`
- [ ] Usar componentes `Input`, `Label`, `Textarea`, `Button`

### 4.5 ArtistProfile (`src/components/Pages/ArtistProfile.js`)

**Mudanças:**
- [ ] Adicionar `ScrollAndSwapText` para efeitos de texto
- [ ] Usar `AnimatedText` para título
- [ ] Layout com Tailwind grid

### 4.6 Footer (`src/components/Footer.js`)

**Mudanças:**
- [ ] Simplificar usando `FooterSection` como base
- [ ] Manter widgets atuais mas com novo estilo
- [ ] Usar Lucide icons

---

## 🎨 FASE 5: Tokens de Design (Já Criados)

Os tokens já estão em `src/styles/design-system/`:
- `_tokens.scss` - Variáveis CSS
- `_typography.scss` - Tipografia
- `_utilities.scss` - Classes utilitárias
- `index.scss` - Arquivo principal

**NOTA:** Após migração para Tailwind, esses arquivos SCSS podem ser removidos ou convertidos para CSS puro com variáveis.

---

## 📦 Dependências Finais (package.json)

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-label": "^2.x",
    "@radix-ui/react-slot": "^1.x",
    "@radix-ui/react-tabs": "^1.x",
    "@tabler/icons-react": "^3.x",
    "class-variance-authority": "^0.7.x",
    "clsx": "^2.x",
    "embla-carousel-react": "^8.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.x",
    "motion": "^11.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "tailwindcss": "^3.x",
    "tailwindcss-animate": "^1.x"
  }
}
```

---

## ✅ Checklist de Implementação

### Setup
- [ ] Instalar Tailwind CSS e configurar
- [ ] Instalar todas as dependências
- [ ] Criar `src/lib/utils.js`
- [ ] Criar `src/hooks/use-mouse-position-ref.js`
- [ ] Adicionar CSS variables ao index.css
- [ ] Adicionar fontes (Playfair Display, Fira Sans Condensed) ao HTML

### Componentes UI Base
- [ ] Criar `src/components/ui/button.jsx`
- [ ] Criar `src/components/ui/input.jsx`
- [ ] Criar `src/components/ui/label.jsx`
- [ ] Criar `src/components/ui/textarea.jsx`
- [ ] Criar `src/components/ui/carousel.jsx`

### Componentes Especiais
- [ ] Adaptar `Floating.tsx` → `src/components/effects/Floating.jsx`
- [ ] Adaptar `AnimatedText.tsx` → `src/components/effects/AnimatedText.jsx`
- [ ] Adaptar `ScrollAndSwapText.tsx` → `src/components/effects/ScrollAndSwapText.jsx`
- [ ] Adaptar `Menu.tsx` → `src/components/ui/Menu.jsx`

### Páginas
- [ ] Refatorar `HomePage.js`
- [ ] Refatorar `NavBar.js`
- [ ] Refatorar `Gallery.js`
- [ ] Refatorar `Contact.js`
- [ ] Refatorar `ArtistProfile.js`
- [ ] Refatorar `Footer.js`
- [ ] Refatorar `SubColecao.js`

### Cleanup
- [ ] Remover arquivos SCSS antigos (após migração completa)
- [ ] Remover dependências não utilizadas
- [ ] Testar responsividade
- [ ] Testar animações
- [ ] Otimizar performance

---

## 🚨 Notas Importantes

1. **Não quebrar funcionalidades existentes** - Manter rotas, dados e lógica
2. **Migração gradual** - Pode manter SCSS temporariamente enquanto migra
3. **Testar mobile** - Todos os componentes de referência são responsivos
4. **Performance** - Framer Motion pode ser pesado, usar `lazy` e `Suspense`
5. **Imagens** - Manter URLs do Cloudinary existentes

---

## 📁 Arquivos de Referência

Todos os componentes de referência estão em:
```
docs/redesign/component-refs/
├── AnimatedText.tsx
├── Button.tsx
├── Carousel.tsx
├── Contact2.tsx
├── Floating.tsx
├── FooterSection.tsx
├── Gallery4.tsx
├── Menu.tsx
└── ScrollAndSwapText.tsx
```

Use estes como base para criar as versões JavaScript adaptadas para o projeto.
