# Image Optimization and BlurHash Support

## Changes

- **Added **: Integrated for on-demand image optimization and metadata generation.
- **Image Metadata Generation Script**: Created  which uses  and  to pre-generate hashes and dimensions for all project images.
- **Automated Workflow**: Updated  to run the metadata generation before  and .
- ** Component**: New component that shows a BlurHash placeholder while images load, maintaining aspect ratio to prevent layout shift.
- **Data Layer Integration**: Updated  to load the generated metadata and provide it to the UI components.
- **UI Refactoring**: Updated , , and  to use the  component.

## Files Modified

- `vite.config.ts`
- `package.json`
- `src/utils/data.ts`
- `src/components/card.tsx`
- `src/components/project.tsx`
- `src/pages/ProjectDetail.tsx`
- `src/vite-env.d.ts`

## New Files

- `scripts/generate-image-metadata.mjs`
- `src/components/optimized-image.tsx`
- `src/content/image-metadata.json` (Generated)
