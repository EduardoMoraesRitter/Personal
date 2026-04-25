---
name: astro-frontend
description: Astro framework architecture, layout, and frontend best practices. Use this skill when building UI components, pages, or layouts in the Astro framework to ensure high performance, maintainability, and proper use of Astro's Island architecture.
license: MIT
---

# Astro Frontend & Layout Guidelines

This skill guides the AI to build fast, scalable, and modern frontend interfaces using the Astro framework. When asked to create or modify Astro components (`.astro`), pages, or layouts, strictly adhere to the following principles.

## 1. Architectural Principles
- **Static-First Approach:** Always prioritize Static Site Generation (SSG). Astro generates HTML at build time by default.
- **Component Islands (Partial Hydration):** Only use client-side JavaScript when absolutely necessary for interactivity. Use hydration directives sparingly (`client:load`, `client:visible`, `client:idle`, or `client:media`). If a component doesn't need interactivity, let it render as static HTML.
- **Separation of Concerns:** Keep server-side logic (data fetching, imports) inside the frontmatter (the `---` fence at the top of the `.astro` file) and the UI layout in the template below it.

## 2. File Structure & Routing
- **Pages:** Place route components in `src/pages/`. Use file-based routing.
- **Layouts:** Use `src/layouts/` for shared page structures (e.g., `BaseLayout.astro`). Wrap page contents in these layouts using `<slot />`.
- **Components:** Place reusable UI elements in `src/components/`.
- **Dynamic Routing:** Use `getStaticPaths()` for generating dynamic routes at build time.

## 3. Styling & UI Layout
- **Scoped CSS:** Take advantage of Astro's built-in scoped styles. Use `<style>` tags directly inside `.astro` files to keep CSS modular and prevent global side-effects.
- **Global Styles:** For global resets or utility classes, import a global CSS file in the main layout.
- **Responsive Layouts:** Always design with a mobile-first mindset. Use CSS Grid and Flexbox for structural layouts.
- **Aesthetic Alignment:** If working alongside the `frontend-design` skill, ensure that the layout supports bold, unique visual decisions. Avoid generic component templates.

## 4. Performance & Assets
- **Image Optimization:** Always use Astro's built-in image optimization (`<Image />` or `<Picture />` from `astro:assets`) instead of standard `<img>` tags for local and external images.
- **Web Vitals:** Keep the Core Web Vitals (LCP, CLS, INP) in mind. Avoid large JavaScript payloads blocking the main thread.

## 5. Content & Data
- **Content Collections:** Use `astro:content` to manage Markdown/MDX files. This provides type safety and better developer experience when working with content-heavy sites (like blogs or documentation).
- **Type Safety:** Use TypeScript in the frontmatter (`Props` interface) to strongly type component properties.

## Example Astro Component Structure
```astro
---
// Server-side logic and imports
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.png';

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Default description" } = Astro.props;
---

<!-- HTML Template -->
<article class="card">
  <h2>{title}</h2>
  <p>{description}</p>
  <Image src={myImage} alt="A descriptive text" width={400} />
  <slot /> <!-- Children rendered here -->
</article>

<style>
  /* Scoped styles */
  .card {
    padding: 1.5rem;
    border-radius: 8px;
    background-color: var(--theme-surface);
  }
  h2 {
    color: var(--theme-primary);
  }
</style>
```

**CRITICAL INSTRUCTION:** When developing frontend layouts in Astro, avoid turning everything into a React/Vue/Svelte component unless it requires complex client-side state. Stick to `.astro` components for structure, styling, and static content.
