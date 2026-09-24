# Project Development Rules & Standards

These rules are mandatory and MUST be strictly followed across the entire project:

1. **TypeScript Usage**:
   - TypeScript is mandatory for all code (`.ts`, `.tsx`). No plain JavaScript allowed.
   - Strict typing must be maintained without unwarranted `any` types.

2. **Icons**:
   - Always use `lucide-react` library for all icons.
   - Consistent sizing and styling using Tailwind utility classes (e.g., `size-4`, `size-5`).

3. **UI Component Library**:
   - Use `shadcn/ui` for foundational UI elements.
   - All custom components must align with the theme and styling configured in shadcn.

4. **Next.js Server-Side Rendering (SSR)**:
   - Prefer Server Components (`RSC`) by default for pages, layouts, and data rendering for maximum performance and SEO.
   - Only add `"use client"` when necessary (e.g., Formik forms, TanStack Query client interactions, browser event listeners).

5. **Backend Architecture & Database**:
   - Next.js Route Handlers (`app/api/...`) or Server Actions serve as the backend layer.
   - All persistent data must be stored in the database through Next.js backend endpoints.

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
