---
name: Orval codegen pitfalls
description: Known failure modes of the OpenAPI → orval → zod/react-query codegen in this workspace
---

- **`format: email` breaks the build.** Orval emits `zod.email()` (Zod v4 syntax) but the workspace pins Zod v3, so `typecheck:libs` fails with "Property 'email' does not exist". Use plain `type: string` (optionally `minLength`) in the spec and validate email shape server-side if needed.
  **How to apply:** never use `format: email` in `lib/api-spec/openapi.yaml`.

- **Boolean query params coerce wrongly.** Generated `ListXQueryParams` uses `zod.coerce.boolean()`, which turns the string `"false"` into `true`. Routes must parse boolean query params from the raw `req.query` string (`"true"`/`"false"`, reject anything else with 400) instead of trusting the parsed zod value.
  **Why:** Express query params arrive as strings; `Boolean("false") === true`.
