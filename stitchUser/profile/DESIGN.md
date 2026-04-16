# Design System Document: The Epicurean Interface

## 1. Overview & Creative North Star: "The Digital Maître D’"

This design system is built to move beyond the transactional nature of a standard loyalty app and into the realm of digital hospitality. Our Creative North Star is **"The Digital Maître D’"**—a philosophy where the interface feels curated, anticipatory, and effortlessly sophisticated.

To break the "template" look common in F&B apps, this system rejects rigid, boxed-in grids. Instead, we embrace **Intentional Asymmetry** and **Editorial Layering**. We treat the screen like a high-end menu or a lifestyle magazine: high-contrast typography scales, food imagery that bleeds off the edges, and overlapping elements that create a sense of physical depth. The goal is to make the user feel like they are being served, not just navigating a database.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule

Our palette is anchored in organic, culinary tones. The greens (`primary`) represent freshness and growth, while ambers (`secondary`) and browns (`tertiary`) evoke the warmth of roasted coffee and aged spirits.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a card utilizing `surface-container-low` should sit directly on a `surface` background. The change in luminance is the divider.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers—like fine stationery stacked on a marble tabletop.
- **Level 0 (Base):** `surface` or `background` (#faf9f8).
- **Level 1 (Sections):** `surface-container-low` for large content blocks.
- **Level 2 (Interactive Elements):** `surface-container-highest` or `surface-container-lowest` for elevated cards.

### The "Glass & Gradient" Rule
To add "soul" to the digital experience:
- **Glassmorphism:** Use semi-transparent versions of `surface` colors with a 20px-40px backdrop-blur for floating navigation bars or modal headers.
- **Signature Textures:** Main CTAs should not be flat. Use a subtle linear gradient transitioning from `primary` (#154212) to `primary-container` (#2d5a27) at a 135-degree angle to provide a satin-like finish.

---

## 3. Typography: The Gourmet Script

We pair a functional, modern sans-serif with an authoritative serif to create an editorial "Gourmet" feel.

*   **Display & Headlines (`notoSerif`):** Used for "The Hook." These should be large, bold, and occasionally use intentional letter-spacing tightening to feel like a premium masthead.
    *   *Role:* Evoking heritage, quality, and the "Chef’s Voice."
*   **Title & Body (`plusJakartaSans`):** Our workhorse. It provides high legibility for menu items, descriptions, and point balances.
    *   *Role:* Modernity, clarity, and the "Concierge’s Voice."

**Hierarchy Note:** Use `display-lg` (3.5rem) sparingly to highlight major rewards or "New For You" sections. This creates a high-contrast visual rhythm that keeps the eye moving.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are often a crutch for poor contrast. This system prioritizes **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. A `surface-container-lowest` card placed on a `surface-container-low` background creates a soft, natural "lift" without a single pixel of shadow.
*   **Ambient Shadows:** When a floating effect is required (e.g., a "Redeem" button), use extra-diffused shadows. 
    *   *Specs:* Blur: 24px, Spread: -4px, Opacity: 6% of `on-surface`.
*   **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., in high-contrast modes), use the `outline-variant` token at **15% opacity**. Never use 100% opaque lines.
*   **Glassmorphism:** Use `surface_bright` at 80% opacity with a heavy backdrop blur to create a "frosted glass" effect for overlays, making the layout feel integrated and airy.

---

## 5. Components: Refined Primitives

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `xl` (1.5rem) rounded corners. Text in `on-primary`.
- **Secondary:** `surface-container-highest` fill with `secondary` text. No border.
- **Tertiary:** Text-only in `primary`, using `title-md` weight.

### Cards & Lists
- **The "No-Divider" Rule:** Forbid the use of line dividers. Use vertical white space (32px or 48px) or a subtle shift from `surface` to `surface-container-low` to separate items. 
- **Imagery:** Cards should feature high-quality photography with a subtle `md` (0.75rem) corner radius.

### Input Fields
- **Styling:** Use a `surface-container-highest` background. No border. On focus, the background transitions to `surface-container-lowest` with a subtle 1px `primary` "Ghost Border" (20% opacity).

### Loyalty Progress Bar
- Use a `secondary_container` background for the track and a `secondary` to `on_secondary_container` gradient for the progress fill. This creates a "liquid gold" effect.

---

## 6. Do’s and Don'ts

### Do:
- **Do** use generous whitespace. "White space is the luxury of the digital age."
- **Do** overlap images with typography. Let a `headline-lg` serif title partially sit over a high-quality food photo to create depth.
- **Do** use `secondary` (Amber) for "Reward" moments to make them feel valuable and warm.

### Don’t:
- **Don’t** use pure black (#000000). Use `on-surface` (#1a1c1c) for better tonal harmony.
- **Don’t** use standard 4px "Material" corners. This system is "Soft Sophistication"—stick to `md` (0.75rem) and `xl` (1.5rem).
- **Don’t** center-align long blocks of text. Keep it left-aligned for an editorial, structured feel.
- **Don’t** ever use a solid 1px divider. If you feel you need a line, use a 24px gap instead.