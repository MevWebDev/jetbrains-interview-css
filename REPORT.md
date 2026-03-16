# CSS Source Tracing Investigation

## Overview

I built a small React app with a single element that gets its styles from five different CSS sources at once: a media query, a CSS variable, two cascade rules, a specificity override, and a hover pseudo-class. The goal was to use Chrome DevTools to trace each computed style back to where it comes from in the source CSS file.

**General source map limitation:** Across all properties, clicking the source map link in the Styles panel navigates to the selector block in the CSS file, but never to the specific property line within that block. The generated CSS location is only available at the block level (file + selector start), not at the individual property level.

---

## Property Findings

### 1. Background Color — Media Query

The background color is set to red when the viewport is narrower than 400px, via an `@media` rule.

- **Computed tab:** Shows `rgb(255, 0, 0)` when the window is small enough.
- **Styles tab:** The default color is crossed out and the active rule is shown inside the media query block.
- **Source map:** Navigates to the `@media` block in the file, but stops at the selector level — not the `background-color` line itself.
- **Issue:** The generated CSS location is block-level only. You can see the file, but not which line within the block the property is on.

---

### 2. Color — CSS Variable

The text color is defined as a CSS custom property (`--trace-text-color`) in `:root`.

- **Computed tab:** Shows the resolved value `rgb(79, 70, 229)`.
- **Styles tab:** Displays `color: var(--trace-text-color)` — the variable name, not the actual color. Clicking the variable name does link to where it's defined.
- **Source map:** Takes me to the `.trace-element` block where the variable is consumed, not to the `:root` block where it's declared. As with all properties, it links to the selector block, not the specific `color:` line.
- **Issue:** Two layers of indirection — first the block vs. property-line gap, then the variable definition isn't traced at all.

---

### 3. Padding — Cascade

Padding is declared twice on `.trace-element`: once as `10px`, and later in the same file as `32px 64px`. Both rules have the same specificity, so the later one wins.

- **Computed tab:** Breaks the shorthand down into four individual properties (`padding-top`, `padding-right`, etc.).
- **Styles tab:** Shows both rules — the first one crossed out, the second one active.
- **Source map:** Clicking one of the individual padding values in the Computed tab does navigate to the correct CSS rule in the Styles tab. However, the rule in the source shows `padding: 32px 64px` — a shorthand — while the Computed tab listed it as four separate properties. There's no direct name match between what you clicked and what you see in the source.
- **Issue:** The source map takes you to the _first_ declaration of `.trace-element`, not the cascade override lower down that is actually applying the style. Separately, the property name mismatch between computed sub-properties and shorthand in the source makes it unclear which authored line corresponds to which computed value.

---

### 4. Font Size — Specificity Override

Font size starts at `14px` in `.trace-element`, but a more specific selector (`.trace-demo-container .trace-element`) overrides it with `18px`.

- **Computed tab:** Shows `18px`.
- **Styles tab:** The base `14px` is crossed out; the active rule under the more specific selector is shown.
- **Source map:** Takes me to the correct overriding selector block. Like all cases, it points to the start of the block, not the `font-size` line specifically.
- **Issue:** None — this one works perfectly.

---

### 5. Cursor — Hover Pseudo-class

Cursor is changed to `pointer` on hover via `.trace-element:hover`.

- **Computed tab:** The `cursor` property doesn't appear at all unless the element is hovered.
- **Styles tab:** The hover rule is hidden unless hover is active.
- **Source map:** After forcing hover state via DevTools, clicking the link correctly points to the `:hover` block.
- **Issue:** You can't inspect or trace hover styles without first emulating the state in DevTools. It's easy to miss entirely.

---

## Where Source Mapping Breaks Down

These are the four cases where tracing from the computed value back to the source gets unreliable or confusing:

1. **Cascade sends you to the wrong rule.** When two rules share the same selector and only differ by order, the source map links to the first one in the file — not the active override.

2. **Shorthand/sub-property mismatch.** The Computed tab expands shorthand properties like `padding` into individual sub-properties (`padding-top`, `padding-right`, etc.). Clicking one does navigate to the correct CSS rule, but the source only contains the shorthand `padding` — not the individual property you came from. There's no exact name match, so you have to infer the connection yourself.

3. **Hover styles are hidden until emulated.** Any style tied to `:hover` (or similar pseudo-classes) is completely absent from both the Computed and Styles tabs by default. Unless you already know to enable state emulation in DevTools, you won't even know these styles exist.

4. **CSS variables hide where values come from.** When a color or other value comes from a variable, the Computed tab resolves it correctly, but the source map takes you to where the variable is _used_, not where it is _defined_. Finding the actual source of the value takes an extra manual step.
