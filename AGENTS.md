<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Development Rules

See [RULES.md](file:///d:/Project/yt-data-stores/RULES.md) for the complete list of 12 mandatory rules:
1. TypeScript for all code
2. Lucide React for icons (as JSX elements)
3. Shadcn UI components
4. Next.js SSR priority (Server Components by default)
5. Supabase Database & Next.js Route Handlers backend
6. TanStack Query for client-side API calls & caching
7. Moment.js date formatting functions from `@/lib/utils/date`
8. Reusable common components in `@/components/common/`
9. Formik + Yup for form state & validation
10. Consistent Key-Value naming (same key-value rule)
11. Safe Data Access: No `||` for API data; always use Optional Chaining (`?.`) and Nullish Coalescing (`??`)
12. Clean code hygiene: No unused imports, unused consts/variables, or dead code (0 lint warnings)
