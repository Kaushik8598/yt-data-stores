# Project Development Rules & Coding Standards

> **YT Data Stores** adheres to strict architectural patterns and code standards. All development, refactoring, and additions MUST strictly follow these 12 golden rules.

---

### 1. TypeScript Across All Code
- Every file must be written in TypeScript (`.ts` or `.tsx`).
- Strict typing is mandatory. Avoid loose `any` types; define clean interfaces and types for models, API payloads, and component props.

### 2. Icons with Lucide React
- All icons must come from `lucide-react`.
- When passing icons to common components (like `CommonButton`), pass them as rendered JSX elements (`leftIcon={<Icon className="size-4" />}`) to ensure compatibility across Server Component (RSC) and Client Component boundaries.

### 3. UI with Shadcn UI
- Utilize `shadcn/ui` components for foundational UI elements (buttons, inputs, cards, dialogs, badges, tables, etc.).
- Maintain consistent theme styling using Tailwind utility classes and CSS variables.

### 4. Next.js Server-Side Rendering (SSR) by Default
- Prioritize Server Components (`RSC`) for layouts, static sections, and server data fetching.
- Only introduce `"use client"` when client-side interactivity is necessary (e.g. Formik forms, TanStack Query hooks, interactive modals).

### 5. Supabase Database & Next.js Backend
- Supabase PostgreSQL serves as the primary database with Row Level Security (RLS) enabled.
- Next.js Route Handlers (`app/api/...`) act as the backend API layer for secure database transactions, auth operations, and business logic.
- Standardized API response format via `@/lib/api/response` (`apiSuccess`, `apiError`).

### 6. Client-Side API Fetching with TanStack Query
- Use TanStack Query (`@tanstack/react-query`) for client-side API interaction.
- Encapsulate data fetching into custom hooks (`useQuery` for reads, `useMutation` for writes).
- Always handle cache invalidation (`queryClient.invalidateQueries`) after mutations.

### 7. Centralized Date & Time Formatting with Moment.js
- Always use the shared date utility in `@/lib/utils/date.ts` (`formatDate`, `formatDateTime`, `formatFriendlyDate`, `formatTimeAgo`, `isValidDate`).
- Never use raw `new Date().toLocaleDateString()` directly in UI components.

### 8. Reusable Common Components
- All shared UI elements must be built as reusable components in `@/components/common/`:
  - `CommonButton` (built-in loading spinner, icon slots, accessible styling)
  - `CommonCard` (flexible header, action slot, footer)
  - `CommonModal` (dialog wrapper)
  - `CommonLoader` (inline & full-page spinner)
  - `CommonPageHeader` (title, breadcrumbs, action button slots)
  - `CommonEmptyState` (placeholder with icon, text, and action)
- Avoid copy-pasting duplicated HTML/UI structures across pages.

### 9. Formik & Yup for Form State & Validation
- All forms must use `formik` for form state management.
- Pair forms with `yup` validation schemas.
- Use common form components in `@/components/common/form/` (`FormikInput`, `FormikTextarea`) for automatic error display and touched-state handling.

### 10. Consistent Key-Value Naming (Same Key-Value Rule)
- Maintain identical key names between Database tables, Backend API request/response payloads, and Frontend state/Formik fields (e.g. `channelId`, `email`, `fullName`).
- Use object property shorthand `{ email, password }` when variables match keys.
- Avoid arbitrary key renames (e.g. renaming `user_id` to `account_id` midway) to prevent desynchronization bugs.

### 11. Safe Data Access: No `||` for API Data; Always Use Optional Chaining (`?.`) & Nullish Coalescing (`??`)
- **NEVER** use the loose OR operator (`||`) to access properties or provide fallbacks for fetched/API data.
  - *Why*: `||` incorrectly overwrites valid falsy values like `0`, `""`, or `false`, and crashes if parent objects are undefined.
- **ALWAYS** use **Optional Chaining (`?.`)** when accessing nested properties from API responses or server data (e.g. `response?.data?.user?.email`).
- **ALWAYS** use **Nullish Coalescing (`??`)** for default/fallback values (e.g. `user?.user_metadata?.full_name ?? "User"`).
- *Result*: The website will never crash with `TypeError: Cannot read properties of undefined`.

### 12. Clean Code Hygiene (Zero Unused Code)
- Actively remove unused imports, unused variables (`const`, `let`), unused helper functions, and dead commented code.
- Ensure `npm run lint` and `npm run build` run with **0 errors and 0 warnings**.
