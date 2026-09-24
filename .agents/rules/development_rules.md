# Project Development Rules & Standards

These rules are mandatory and MUST be strictly followed across the entire project:

1. **TypeScript Usage**:
   - TypeScript is mandatory for all code (`.ts`, `.tsx`). No plain JavaScript allowed.
   - Strict typing must be maintained without unwarranted `any` types.

2. **Icons**:
   - Always use `lucide-react` library for all icons.
   - Pass icons to components as rendered JSX elements (e.g. `leftIcon={<Icon className="size-4" />}`) to support RSC boundary compatibility.

3. **UI Component Library**:
   - Use `shadcn/ui` for foundational UI elements.
   - All custom components must align with the theme and styling configured in shadcn.

4. **Next.js Server-Side Rendering (SSR)**:
   - Prefer Server Components (`RSC`) by default for pages, layouts, and data rendering for maximum performance and SEO.
   - Only add `"use client"` when necessary (e.g., Formik forms, TanStack Query client interactions, browser event listeners).

5. **Backend Architecture & Database**:
   - Supabase PostgreSQL serves as the primary database with Row Level Security (RLS) enabled.
   - Next.js Route Handlers (`app/api/...`) act as the backend API layer for secure database transactions, auth operations, and business logic.
   - Standardized API response format via `@/lib/api/response` (`apiSuccess`, `apiError`).

6. **Client-Side Data Fetching**:
   - Use TanStack Query (`@tanstack/react-query`) for client-side API requests, caching, polling, and mutations.
   - Use `useQuery` for queries and `useMutation` for POST/PUT/PATCH/DELETE calls with appropriate cache invalidation (`queryClient.invalidateQueries`).

7. **Date & Time Formatting**:
   - Always use `moment` via the shared utility function in `@/lib/utils/date` (`formatDate`, `formatDateTime`, `formatTimeAgo`, etc.).
   - Do NOT use raw native `new Date().toLocaleDateString()` directly in UI components.

8. **Common / Reusable Components**:
   - Always build and reuse common components located in `@/components/common/` (`CommonButton`, `CommonCard`, `CommonModal`, `CommonLoader`, `CommonPageHeader`, `CommonEmptyState`, etc.).
   - Avoid duplicating UI patterns across different pages.

9. **Form Handling & Validation**:
   - Always use `formik` for forms.
   - Pair Formik with `yup` for schema validation.
   - Utilize common Formik components from `@/components/common/form` (`FormikInput`, `FormikTextarea`, etc.) for consistent error handling and touched state management.

10. **Consistent Key-Value Naming (Same Key-Value Rule)**:
    - Maintain identical key names between Database tables, Backend API request/response payloads, and Frontend types/Formik fields (e.g., `channelId`, `email`, `fullName`).
    - Use object property shorthand `{ email, password }` when variables match keys.
    - Do not invent arbitrary key aliases across layers.

11. **Safe Data Access (No `||` on API Data, Always Use Optional Chaining `?.` & Nullish Coalescing `??`)**:
    - NEVER use `||` (OR) fallback for API/fetched data access because falsy values like `0`, `""`, or `false` get incorrectly overridden, and unhandled nested properties crash when `undefined`.
    - ALWAYS use Optional Chaining (`?.`) when accessing fetched/nested data (e.g., `data?.user?.email`, `response?.data?.items?.[0]`).
    - Use Nullish Coalescing (`??`) for fallbacks (e.g., `user?.user_metadata?.full_name ?? "User"`).
    - Guarantees the website will never break or throw unhandled `Cannot read properties of undefined` errors.

12. **Clean Code Hygiene (No Unused Code)**:
    - Immediately remove unused imports, unused variables (`const`, `let`), unused functions, and dead code.
    - Ensure `npm run lint` and `npm run build` pass with 0 errors and 0 warnings at all times.
