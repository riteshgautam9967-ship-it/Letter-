# Implementation Plan: Visual PDF Generation Progress Indicator for Resignation Letter Export [COMPLETED]

Build an engaging, reliable visual progress indicator inside the `ExportModal` when the user exports their official resignation letter as a PDF. The export specifically targets the pure resignation letter document in high-grade executive layout, displaying clear real-time progression milestones before launching the print/save dialogue.

---

## User Review Required

> [!NOTE]
> Based on your response ("only regination letter"), the PDF generation will isolate and render the official resignation letter document only (omitting portfolio cards or other sections), giving HR and leadership a pristine letter.

- **Progress Timeline Duration**: The simulated generation sequence runs through authentic rendering phases over ~1.8 seconds with realistic step transitions:
  1. `0% - 25%`: Parsing resignation letter text & metadata
  2. `25% - 60%`: Embedding digital signature & timestamp verification
  3. `60% - 90%`: Compiling executive print stylesheet & layout
  4. `90% - 100%`: Finalizing PDF document & launching print dialog
- **Completion Action**: Once 100% is reached, the browser's native print/PDF save dialog automatically launches, and a "PDF Generated Successfully" status badge with a "Re-download / Print Again" button is shown.

---

## Proposed Changes

### 1. Update `src/components/ExportModal.tsx`

- **Visual Progress Indicator Component**:
  - Add state `pdfStatus`: `'idle' | 'generating' | 'completed' | 'error'`.
  - Add state `progressPercent` (0 to 100) and `currentStageText` (e.g., "Structuring letter typography...", "Embedding digital signature...", "Finalizing document for print...").
  - Render an animated progress bar with:
    - Percentage label (`tabular-nums font-mono-code`)
    - Dynamic status message
    - Milestone indicators with checkmarks
    - Animated shimmer / pulse bar in tasteful neutral/stone tones (`bg-stone-900`)
- **Pristine Resignation Letter Container**:
  - Ensure the exported document strictly contains the formal letterhead:
    - Company and department header
    - Formal submission date & reference number
    - Addressee (Manager name, title, company)
    - Formal subject line
    - Dynamic letter body based on selected tone or custom text
    - Cryptographic timestamp verification
    - Handwritten digital signature block
- **Interactive Controls**:
  - "Generate PDF Letter" button triggers the progress sequence.
  - Cancel / Abort button if user wants to stop during generation.
  - Re-trigger / print button once completed.
  - Fast-copy options for email and markdown remain accessible as secondary actions.

### 2. Print Stylesheet Refinement in `src/index.css`

- Ensure only the formal resignation letter print container is visible when printing from the modal or page, cleanly hiding backdrop scrims, dialog buttons, and navigation elements.

---

## Verification Plan

### Automated Build & Lint Verification
1. Run `lint_applet` (`tsc --noEmit`) to verify strict TypeScript adherence with zero type errors.
2. Run `compile_applet` to confirm successful Vite production compilation.

### User Interaction Testing
1. Click **"Export Letter"** in the top navigation bar or from the Resignation Letter section.
2. Click **"Print / Save Clean PDF"** inside the `ExportModal`.
3. Verify that the visual progress indicator animates smoothly from 0% to 100%, updating the milestone labels at each stage.
4. Verify that at 100%, the completion state appears and the print dialog opens with only the resignation letter displayed.
5. Test the "Print Again / Re-download" button to ensure repeatability.
