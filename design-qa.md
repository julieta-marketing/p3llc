# Design QA — Borderless Network Lists

- Source visual truth: `/var/folders/m0/vwxv4dhn7vxc0mjfsjz8mcj00000gn/T/codex-clipboard-6c9dd939-36bf-4f66-b130-b00611a26110.png`
- Implementation screenshot: `/Volumes/Untitled/p3 llc/network-lists-borderless-final.png`
- Desktop viewport: 1280 × 720 CSS px, device density 1×
- Mobile viewport tested: 390 × 844 CSS px, device density 1×
- Source pixels: 972 × 301 px
- Implementation pixels: 1265 × 712 px
- State: Home page, Our Network section, both lists visible

## Full-view comparison evidence

The implementation retains the reference's heading plus two simple bullet-list groups while adapting the colors and typography to the existing P3 site. The latest revision removes every horizontal rule, vertical divider, outline, and card boundary.

## Focused comparison evidence

Computed styles confirm the list container and both list groups have zero-width borders on every side. A 102.4 px desktop column gap creates separation through whitespace only. Mobile uses one column with a 3.5 rem gap and no separator.

## Required fidelity surfaces

- Fonts and typography: Existing P3 typography remains unchanged and readable; headings and list items do not truncate. Passed.
- Spacing and layout rhythm: Two balanced desktop groups are separated only by generous whitespace; mobile groups stack without divider lines. Passed.
- Colors and visual tokens: Existing white and cyan type treatment is retained on the brand dark background. Passed.
- Image quality and asset fidelity: No imagery or custom icons belong to this component. Not applicable.
- Copy and content: Both sector headings and all eleven list items remain unchanged. Passed.

## Findings

No actionable P0, P1, or P2 mismatches remain.

## Comparison history

1. The first simple-list revision still used top, bottom, center, and mobile divider rules, which made the section feel like a table (P1).
2. Removed all four rule treatments and reduced group padding.
3. Increased the desktop column gap to 102.4 px and the mobile group gap to 3.5 rem so hierarchy now comes from whitespace rather than borders.
4. Desktop and mobile computed-style checks confirm zero borders and no horizontal overflow; the browser console has no errors.

## Implementation checklist

- [x] No horizontal lines.
- [x] No vertical divider.
- [x] No borders or card outlines.
- [x] Two simple bullet lists preserved.
- [x] Mobile version remains borderless.
- [x] Existing copy preserved.

## Follow-up polish

No remaining P3 items identified.

final result: passed

---

# Leadership Card Width, Color, and Portrait Refinement — 2026-08-05

## Target and evidence

- Source visual truth: the user-supplied reference layout at `/Users/xuningyi/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9/a97c3b6db388a408d526bc7bc3a84a47/Message/MessageTemp/9e20f478899dc29eb19741386f9343c8/Image/16071785973402_.pic.jpg`, the immediately preceding Leadership implementation, and the user's explicit direction to center John, widen both cards, increase their gap, use different darker colors, and enlarge the text.
- Implementation screenshots: `/Volumes/Untitled/p3 llc/product-design-qa/leadership-refined-desktop-top.png`, `/Volumes/Untitled/p3 llc/product-design-qa/leadership-refined-desktop-body.png`, and `/Volumes/Untitled/p3 llc/product-design-qa/leadership-refined-mobile.png`.
- Combined comparison inputs: `/Volumes/Untitled/p3 llc/product-design-qa/leadership-refinement-comparison-top.png` and `/Volumes/Untitled/p3 llc/product-design-qa/leadership-refinement-comparison-body.png`.
- Browser CSS viewports: desktop 1280 × 720 px and mobile 390 × 844 px at device density 1×.
- State: home page Leadership section after the reveal and achievement-count animations completed.

## Full-view and focused comparison evidence

- The two desktop cards now measure approximately 612 px each, expand to the page edges without document overflow, and use an approximately 43 px center gap instead of the preceding 25 px gap.
- Jeff's card uses `rgb(3, 42, 56)` and John's uses `rgb(7, 31, 53)`, providing distinct dark P3 surfaces while maintaining the existing site palette.
- John's portrait uses a controlled 1.07 scale and -2.5% horizontal correction, visibly recentering his face and upper body in the image frame.
- Biography text renders at 20 px on desktop and 17.6 px on mobile; display names render at approximately 69 px on desktop. Text remains untruncated.
- Desktop document client width and scroll width are both 1265 px. At 390 px, cards stack at 335 px wide with no horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Names, role labels, metrics, biographies, and actions are enlarged as one coordinated hierarchy with readable wrapping. Passed.
- Spacing and layout rhythm: Wider cards, larger internal padding, and a 43 px center gap improve balance and separation while retaining aligned geometry. Passed.
- Colors and visual tokens: Two intentionally different dark P3-blue card fills preserve contrast and brand consistency. Passed.
- Image quality and asset fidelity: Both real portraits remain sharp; John's crop is corrected through image positioning rather than asset replacement. Passed.
- Copy and content: Existing names, roles, biographies, achievements, email links, and LinkedIn links remain unchanged. Passed.

## Findings and comparison history

1. Earlier comparison found John's subject visually right-shifted, identical card colors flattening the pair, a tight 25 px center gap, and 18 px biography text that remained less readable than requested (P2).
2. Expanded both desktop cards to approximately 612 px, increased the gap to approximately 43 px, assigned two deeper P3-blue surfaces, and raised body copy to 20 px.
3. Repositioned and slightly enlarged John's image, then rechecked desktop and mobile rendered states.
4. Post-fix comparison found no actionable P0, P1, or P2 issues.

## Primary interactions and runtime checks

- Achievement animations completed at their intended values: Jeff `20+` and `$6B+`; John `20+`.
- Email and LinkedIn actions remain present on both cards.
- Browser console errors checked: none. Existing unrelated Next Image quality configuration warnings remain elsewhere on the page.
- `git diff --check` passes for `app/globals.css` and `components/sections/team.tsx`.

## Implementation checklist

- [x] John portrait visually centered.
- [x] Both cards widened.
- [x] Center gap increased.
- [x] Two distinct darker card colors applied.
- [x] Desktop and mobile typography enlarged.
- [x] Responsive stacking and links preserved.
- [x] No horizontal overflow or browser runtime errors.

final result: passed

---

# Leadership Readability and Edge Background Follow-up

## Target and evidence

- Source visual truth: `/Users/xuningyi/Desktop/Screenshot 2026-08-05 at 12.55.33 PM.png`.
- Final implementation screenshots: `/Volumes/Untitled/p3 llc/p3-leadership-enlarge.mScBK2/qa/leadership-jeff-desktop-final.png` and `/Volumes/Untitled/p3 llc/p3-leadership-enlarge.mScBK2/qa/leadership-john-desktop-final.png`.
- Combined comparison input: `/Volumes/Untitled/p3 llc/p3-leadership-enlarge.mScBK2/qa/leadership-reference-comparison-final.png`.
- Source pixels: 1070 × 899 px.
- Implementation pixels and viewport: 1280 × 720 px at 1280 × 720 CSS px, device density 1×.
- State: home page Leadership section with each profile centered, entrance transitions complete, and achievement counts complete.

## Full-view comparison evidence

The final comparison preserves the reference's alternating editorial composition while making both profile groups materially easier to read. Jeff remains anchored to the left and John to the right. Their architecture groups now sit against the opposite viewport edges as low-opacity background texture instead of competing foreground illustrations.

## Focused comparison evidence

- Both content bodies measure 682 px wide at the tested desktop viewport and use seven grid columns instead of five.
- Portraits render at 192 × 169 px; names at 57.6 px; role labels at 12.48 px; achievement labels at approximately 12.2–12.5 px; bios at 16 px; and action links at 11.84 px.
- Achievement rows have equal client and scroll widths, so neither profile clips or horizontally overflows.
- Architecture layers render at 0.16 opacity. Jeff's layer is pushed to the far right and John's to the far left, leaving the primary reading column dominant.
- The document client and scroll widths are equal at 1265 px, confirming no horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Profile hierarchy, small labels, body copy, and actions are all larger; line lengths and wrapping remain controlled. Passed.
- Spacing and layout rhythm: Wider seven-column content bodies and taller profile stages create a more readable editorial rhythm without adding cards or panels. Passed.
- Colors and visual tokens: Existing P3 navy, blue, cyan, and white tokens are preserved; architecture opacity is reduced from 0.42 to 0.16. Passed.
- Image quality and asset fidelity: The two native 1672 × 941 transparent PNG line-art assets remain sharp and are repositioned without blur, masking, or raster enlargement. Passed.
- Copy and content: Names, titles, achievements, biographies, email links, and LinkedIn links remain unchanged. Passed.

## Findings

No actionable P0, P1, or P2 differences remain for the requested desktop Leadership revision.

## Comparison history

1. Earlier implementation used five-column content bodies, a 38 rem width cap, smaller portraits and text, and 0.42-opacity architecture inset from the page edges (P2 readability and hierarchy drift).
2. Expanded both bodies to seven columns and 46 rem, raised all visible type sizes, enlarged portraits, and increased vertical breathing room.
3. Reduced architecture opacity to 0.16 and moved Jeff's line art to the right viewport edge and John's to the left viewport edge.
4. Final combined comparison confirms the two profiles are readable, cardless, edge-balanced, and visually subordinate to the content. No browser console errors are related to this section, and the production build passes.

## Implementation checklist

- [x] Both Leadership content groups enlarged.
- [x] Achievement count animation retained.
- [x] Architecture line art uses transparent PNG assets with no base color.
- [x] Jeff architecture moved to the far right background.
- [x] John architecture moved to the far left background.
- [x] Architecture opacity reduced.
- [x] Desktop overflow and production build verified.

## Follow-up polish

- P3: A dedicated narrow mobile browser capture can be added if a future revision targets phone-specific composition; the current responsive rules already reduce architecture opacity to 0.075 and push both assets farther outside the reading column.

final result: passed

---

# Leadership Wireframe Quality Follow-up

## Target and verification

- Source reference: `Screenshot 2026-08-05 at 12.55.33 PM.png`.
- Desktop comparison viewport: 1070 × 899.
- Mobile verification viewport: 390 × 844.
- The reference and final desktop implementation were inspected together in one comparison image.

## Final pass

- Replaced the low-effective-resolution combined sprite with two independent 1672 × 941 RGBA assets: one for Jeff's skyscraper cluster and one for John's twin towers.
- Each architecture group now uses most of its own source canvas, so the browser downscales from native resolution instead of enlarging a small crop.
- Removed the 285% background enlargement and the soft alpha mask that previously reduced line sharpness.
- Increased native line weight, alpha contrast, and display opacity while retaining the P3 blue color and transparent background.
- Desktop and mobile screenshots show clean facade grids, sharp podium edges, complete rooflines, and zero horizontal overflow.
- Browser console contains no errors and the production build completed successfully.

final result: passed

---

# Leadership Text-Priority Balance Follow-up

## Target and evidence

- Source visual truth: `/Users/xuningyi/Desktop/Screenshot 2026-08-05 at 12.55.33 PM.png`.
- Final implementation screenshots: `/Volumes/Untitled/p3 llc/p3-leadership-balance.g1nSOc/qa/leadership-jeff-balanced.png` and `/Volumes/Untitled/p3 llc/p3-leadership-balance.g1nSOc/qa/leadership-john-balanced.png`.
- Combined comparison input: `/Volumes/Untitled/p3 llc/p3-leadership-balance.g1nSOc/qa/leadership-balance-comparison.png`.
- Source pixels: 1070 × 899 px.
- Implementation pixels and viewport: 1280 × 720 px at 1280 × 720 CSS px, device density 1×.
- State: each Leadership profile centered after the entrance and achievement-count animations completed.

## Full-view comparison evidence

The final composition restores the people and text as the visual focus. Both content groups are moved inward from the viewport edges and sit on equal six-column tracks. Architecture is reduced in scale and contrast, remains pinned to the opposite edge, and no longer occupies the primary reading column.

## Focused comparison evidence

- Jeff's content begins at x=90 px and John's at x=674 px in the 1265 px browser content area, producing nearly equal outer margins and a balanced alternating rhythm.
- Each content body measures 585 px wide; achievement rows measure 479 px and 517 px respectively, so neither clips or overflows.
- Each architecture layer is 640 × 588 px at 0.085 opacity. Jeff's begins at x=713 px and exits through the right edge; John's begins at x=-87 px and exits through the left edge.
- Document client and scroll widths are both 1265 px, confirming no horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Previously enlarged portrait, name, role, achievement, biography, and link sizes are preserved; text remains the strongest contrast and hierarchy. Passed.
- Spacing and layout rhythm: Six-column content tracks and a controlled inward translation create balanced outer margins without introducing cards or panels. Passed.
- Colors and visual tokens: Existing P3 palette is unchanged; architecture opacity is intentionally lowered from 0.16 to 0.085. Passed.
- Image quality and asset fidelity: Native transparent PNG line art remains sharp while becoming clearly decorative through smaller display scale and lower opacity. Passed.
- Copy and content: All Leadership copy, contact links, and animated achievement values remain unchanged. Passed.

## Findings

No actionable P0, P1, or P2 issues remain for the requested text-priority composition.

## Comparison history

1. Prior revision enlarged the content but used seven-column bodies beginning at x=48 px and x=535 px, while 870 px-wide architecture at 0.16 opacity still pulled the overall composition left and competed with the text (P2 visual hierarchy and balance).
2. Reduced content tracks to six columns, shifted both profiles inward, and kept all readable type sizes unchanged.
3. Reduced architecture from 870 × 674 px to 640 × 588 px and opacity from 0.16 to 0.085, retaining opposite-edge placement.
4. Final combined comparison shows text-first hierarchy, balanced margins, unobstructed biographies and achievement rows, and purely decorative edge line art.

## Implementation checklist

- [x] Text is the primary visual focus.
- [x] Both content groups moved inward and balanced.
- [x] Large readable typography retained.
- [x] Architecture scale and opacity reduced.
- [x] Architecture remains at the outer edges.
- [x] Achievement animation retained.
- [x] No horizontal overflow or browser errors.
- [x] Production build passes.

## Follow-up polish

No remaining P3 items identified for the requested desktop composition.

final result: passed

---

# Leadership Annotated Reference Match

## Target and evidence

- Source visual truth: `/var/folders/m0/vwxv4dhn7vxc0mjfsjz8mcj00000gn/T/codex-clipboard-e4a3f293-fc3e-4455-b225-4da3edbf4991.png`.
- Final implementation screenshots: `/Volumes/Untitled/p3 llc/p3-leadership-reference.KSKmSW/qa/leadership-jeff-reference-final.png` and `/Volumes/Untitled/p3 llc/p3-leadership-reference.KSKmSW/qa/leadership-john-reference-final.png`.
- Combined comparison input: `/Volumes/Untitled/p3 llc/p3-leadership-reference.KSKmSW/qa/leadership-new-reference-comparison.png`.
- Source pixels: 1006 × 851 px.
- Implementation pixels and viewport: 1280 × 720 px at 1280 × 720 CSS px, device density 1×.
- State: home page Leadership section, Jeff and John views captured after entrance and count animations completed.
- Annotation interpretation: the purple rectangle is treated as a scope marker around Jeff's information block, not as a visible UI border.

## Full-view comparison evidence

The implementation now matches the supplied annotated composition: Jeff occupies the upper-left content block, his architecture fills the upper-right edge, John's portrait begins before the Jeff row fully ends, John's information continues on the lower right, and the twin-tower architecture fills the lower-left edge. The two rows overlap intentionally instead of reading as separate stacked cards.

## Focused comparison evidence

- Section height is 1055.98 px at the tested 1280 px viewport, closely preserving the reference's overall width-to-height proportion.
- Jeff's content begins at x=112 px and y=64 px; John's begins at x=696.5 px and y=460.9 px.
- Both content columns are 496 px wide. Jeff displays two animated achievement pills; John displays the single animated `20+ Years of government experience` pill shown in the reference.
- Each architecture layer is 640 × 440.8 px. Jeff's exits through the right edge and John's begins at x=-87.5 px, reproducing the opposing corner placement.
- Grayscale filtering and 0.44 opacity produce the stronger black architectural linework shown in the source without adding a background color.
- The document client and scroll widths are equal, so the edge artwork creates no horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Display names, uppercase roles, achievement pills, biographies, and compact links follow the reference hierarchy and wrapping while remaining readable. Passed.
- Spacing and layout rhythm: Shorter profile stages, intentional negative row overlap, narrower 31 rem information columns, and aligned insets reproduce the source proportions. Passed.
- Colors and visual tokens: Existing P3 navy, blue, cyan, white, and gray tokens are retained. The purple annotation border was correctly excluded from production UI. Passed.
- Image quality and asset fidelity: Existing portrait assets and the native transparent architecture PNGs are used; linework is grayscale, sharp, uncropped, and edge-aligned. Passed.
- Copy and content: Names, roles, biographies, contact links, Jeff's two metrics, and John's reference-visible metric are present. Passed.

## Findings

No actionable P0, P1, or P2 differences remain for the supplied annotated layout target.

## Comparison history

1. The prior text-priority version used two tall 717 px stages with a 51 px gap-equivalent overlap; John began too low and both rows felt like separate sections (P1 composition mismatch).
2. Reduced each stage to a responsive 448–544 px range, compacted the content block, and introduced a responsive 112–160 px overlap.
3. Shifted both information columns inward to the exact alternating positions, limited them to 31 rem, and changed John's visible achievements from two pills to the single reference pill.
4. First post-fix comparison matched geometry but the linework remained lighter than the source (P2 asset contrast mismatch).
5. Increased final grayscale linework opacity from 0.32 to 0.44. The second combined comparison shows matching opposing-corner weight, intentional Jeff/John overlap, and text blocks free of architectural interference.

## Implementation checklist

- [x] Jeff upper-left and John lower-right placement matched.
- [x] Right-top and left-bottom architecture placement matched.
- [x] Intentional vertical overlap matched.
- [x] Purple annotation border excluded.
- [x] John's single reference metric retained with count animation.
- [x] Architecture remains transparent PNG line art with no base color.
- [x] No horizontal overflow or browser errors.
- [x] Production build passes.

## Follow-up polish

No remaining P3 items identified for this desktop reference.

final result: passed

---

# Leadership Paired Cards Follow-up

## Target and evidence

- Source visual truth: the immediately preceding Leadership implementation captured in `/Volumes/Untitled/p3 llc/p3-leadership-reference.KSKmSW/qa/leadership-jeff-reference-final.png` and `/Volumes/Untitled/p3 llc/p3-leadership-reference.KSKmSW/qa/leadership-john-reference-final.png`, plus the user requirement to remove all line art and use two side-by-side cards without changing content.
- Final implementation screenshots: `/Volumes/Untitled/p3 llc/p3-leadership-cards.cwBc2u/qa/leadership-cards-top.png` and `/Volumes/Untitled/p3 llc/p3-leadership-cards.cwBc2u/qa/leadership-cards-bottom.png`.
- Combined comparison input: `/Volumes/Untitled/p3 llc/p3-leadership-cards.cwBc2u/qa/leadership-cards-comparison.png`.
- Source and implementation pixels: 1280 × 720 px captures.
- CSS viewport: 1280 × 720 px at device density 1×.
- State: home page Leadership section with both cards visible after the entrance and count animations completed.

## Full-view comparison evidence

The final layout replaces the alternating architectural composition with two equal-width, equal-height cards. Jeff remains on the left and John on the right. Both cards use the same portrait, type hierarchy, metrics, biography, and contact actions from the preceding version, while all architectural imagery is removed.

## Focused comparison evidence

- The cards measure 565 × 605 px at x=48 px and x=652 px, with a consistent 39 px gap.
- Both cards use a 24 px radius, a 1 px low-contrast P3-blue border, white fill, and matched shadows on the soft section background.
- Card bottoms and Email/LinkedIn actions align despite different biography lengths.
- The rendered DOM contains zero `.leadership-profile__architecture` elements.
- Document client and scroll widths are equal at 1265 px, confirming no horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Existing names, roles, metric labels, biographies, and actions retain their hierarchy and readable wrapping. Passed.
- Spacing and layout rhythm: Equal card dimensions, matched padding, aligned portraits, and bottom-aligned actions produce a balanced two-column layout. Passed.
- Colors and visual tokens: Cards use the existing P3 white, navy, blue, cyan, and soft neutral palette. Passed.
- Image quality and asset fidelity: Original portraits remain sharp and correctly cropped. Decorative line-art elements are absent from the DOM and no replacement imagery was introduced. Passed.
- Copy and content: All content visible in the preceding implementation remains unchanged, including Jeff's two animated metrics and John's single animated metric. Passed.

## Findings

No actionable P0, P1, or P2 issues remain for the requested two-card layout.

## Comparison history

1. Prior implementation used large right-top and left-bottom line-art PNGs and an overlapping diagonal composition, which no longer matched the user's card requirement (P1 layout mismatch).
2. Removed the architecture element from the component, replaced the paired stage with a two-column grid, and placed each profile in an equal-height card.
3. Aligned contact actions at the card bottoms, preserved every visible content item and animation, and added a single-column responsive fallback below 1024 px.
4. Final browser comparison confirms zero architecture elements, equal card geometry, no overflow, and no console errors.

## Implementation checklist

- [x] All architectural line art removed.
- [x] Two side-by-side desktop cards created.
- [x] Cards are equal width and height.
- [x] Existing visible content preserved.
- [x] Achievement count animation preserved.
- [x] Contact actions aligned.
- [x] Responsive single-column fallback included.
- [x] No overflow or browser errors.
- [x] Production build passes.

## Follow-up polish

No remaining P3 items identified for this request.

final result: passed

---

# Leadership Enlarged Dark Cards Follow-up

## Target and evidence

- Source visual truth: the immediately preceding white-card implementation captured in `/Volumes/Untitled/p3 llc/p3-leadership-cards.cwBc2u/qa/leadership-cards-top.png` and `/Volumes/Untitled/p3 llc/p3-leadership-cards.cwBc2u/qa/leadership-cards-bottom.png`, plus the user direction to make the cards larger and replace the white card surface with a more attractive non-white treatment.
- Final implementation screenshots: `/Volumes/Untitled/p3 llc/p3-leadership-dark-cards.bYa6xR/qa/leadership-dark-top.png` and `/Volumes/Untitled/p3 llc/p3-leadership-dark-cards.bYa6xR/qa/leadership-dark-bottom.png`.
- Combined comparison input: `/Volumes/Untitled/p3 llc/p3-leadership-dark-cards.bYa6xR/qa/leadership-dark-comparison.png`.
- Source and implementation pixels: 1280 × 720 px captures.
- CSS viewport: 1280 × 720 px at device density 1×.
- State: home page Leadership section with both cards visible after the entrance and achievement-count animations completed.

## Full-view comparison evidence

The new layout retains the two-card composition while increasing each card's footprint and visual weight. Both cards now use a solid P3 deep-blue surface against a soft gray-blue section background, making the portraits, names, achievements, biographies, and contact actions read as one deliberate branded system rather than two generic white panels.

## Focused comparison evidence

- The previous cards measured 565 × 605 px; the revised cards measure approximately 596 × 704 px at the same viewport.
- Revised card positions are x=24 px and x=645.3 px with equal height, a consistent gap, 28 px radii, and aligned bottom contact actions.
- Portraits increase from 160 px to 179.2 px at the tested viewport, display names render at 57.6 px, and biography text renders at 16 px with 1.8 line height.
- Card fill is `rgb(11, 59, 77)` with white primary text, cyan role text, 74% white body copy, and P3 blue achievement pills.
- Document client and scroll widths are both 1265 px, confirming that the wider layout introduces no horizontal overflow.
- The rendered DOM still contains zero architectural line-art elements.

## Required fidelity surfaces

- Fonts and typography: Names, roles, metrics, body copy, and links were enlarged as a coordinated hierarchy; wrapping remains clean and no text is truncated. Passed.
- Spacing and layout rhythm: Larger matched cards, increased internal padding, larger portraits, tighter inter-card gap, and bottom-aligned actions improve visual weight without crowding. Passed.
- Colors and visual tokens: Deep navy, P3 blue, cyan, white, and gray-blue surfaces form a brand-consistent high-contrast palette with no gradients or decorative substitutes. Passed.
- Image quality and asset fidelity: Existing portraits remain sharp at their increased rendered size, with preserved crop and aspect ratio. No new image or line-art assets were introduced. Passed.
- Copy and content: All previously visible names, roles, biographies, actions, and animated achievement metrics remain unchanged. Passed.
- Accessibility and behavior: Semantic article/link structure, portrait alt text, reduced-motion handling, visible focus styling, and responsive one-column fallback remain in place. Achievement animation was exercised in the browser. Passed.

## Findings

No actionable P0, P1, or P2 issues remain for the requested enlargement and non-white card treatment.

## Comparison history

1. The preceding implementation used 565 × 605 px white cards on a very light section, which the user identified as too small and visually generic (P2 surface and hierarchy issue).
2. Enlarged both cards to approximately 596 × 704 px, increased portraits and type, widened the desktop card pair, and preserved equal geometry.
3. Replaced the white card fill with a solid P3 deep-blue surface, moved the section to a soft gray-blue neutral, and remapped text, role, metric, link, border, and focus colors for contrast.
4. Browser-rendered comparison confirms the larger geometry, balanced two-column placement, aligned contact actions, preserved count animation, zero architecture elements, and no horizontal overflow.

## Primary interactions and runtime checks

- Scrolled directly to the Leadership section and observed both entrance reveals and achievement-count animations complete.
- Verified both email and LinkedIn actions remain present for each leader and keep their existing semantic links.
- Browser console errors checked: none. Existing unrelated Next Image quality configuration warnings remain elsewhere on the page.
- Production build: passed.

## Implementation checklist

- [x] Both desktop cards enlarged.
- [x] Portraits, names, body copy, and metric pills enlarged proportionally.
- [x] White card backgrounds replaced with a solid deep-blue brand surface.
- [x] Section background changed to a soft gray-blue neutral.
- [x] Content and achievement animations preserved.
- [x] Equal card geometry and bottom action alignment preserved.
- [x] Responsive one-column fallback preserved below 1024 px.
- [x] No horizontal overflow or browser console errors.
- [x] Production build passes.

## Follow-up polish

No remaining P3 items identified for this request. Mobile styling is implemented through the existing one-column breakpoint; the target comparison for this pass is the supplied desktop state.

final result: passed

---

# Global Surface System — Unified Background Ladder — 2026-08-14

## Target and evidence

- User direction: every section background felt unpolished; asked for a global
  pass so scrolling reads smoother, more professional, more mature.
- Chosen options: unify the ladder while keeping the existing section rhythm;
  cool blue-grey temperature; fold the contact page into the same dark.
- Audit method: every `#rrggbb` in `app/` and `components/` parsed to CIELAB
  L*, HSL hue and saturation, grouped by role.

## What the audit found

- 42 distinct light surface values and 21 distinct darks across the site.
- Most were separated by less than 0.5 L* — `#f5f7f7` vs `#f4f7f7` is 0.1 L*,
  `#fbfcfc` vs `#ffffff` is 1.1 L*. Too close to read as a deliberate step,
  close enough to read as inconsistency.
- Hues ranged 100°–210°. The News band `#f3f5f2` sat at hue 100° (green) inside
  an otherwise cyan-grey page. The delivery-suite mid stop `#dfecef` carried
  33% saturation, noticeably heavier than its neighbours.
- The contact page ran L* 2.5–5.5 against a site whose darks sat at L* 8–11, so
  it read as a different product.

## Change

- One ladder in `:root`: `--surface-0..4` (L* 100 / 98.6 / 95.7 / 92.8 / 89.8,
  hue ~205°) and `--surface-dark{,-deep,-lift,-plate}` (L* 8.7 / 6.3 / 11.9 /
  16.0, hue ~199°), plus `--navy-lift`, `--hairline`, `--blue-ink`.
- Every section, card, plate and gradient stop remapped onto a rung. Section
  order and page structure unchanged.
- Seams: dark bands lift one rung at a light boundary and settle over 9–14rem
  (`.hero-band`, `.case-feature-section`, `.site-footer`, `.contact-open`).
- Delivery-suite column rule dropped 8% → 3%, pitch 6rem → 8rem.
- Two inline Tailwind gradients moved to named classes (`.media-scrim`,
  `.contact-open`) so no arbitrary-value edge cases are in play.

## Required fidelity surfaces

- Colors and visual tokens: 63 one-off values → 9 tokens defined in one place.
  Passed.
- Contrast: recomputed for every text/surface pair. Body 12.1–14.6, headings
  11.0–13.1. `--muted-foreground` deepened `#5a7079` → `#576b75` (4.34 → 4.65
  on the darkest light rung). Eyebrows moved to `--blue-ink #0a6a8a` (3.86 →
  5.08); brand `--color-blue` unchanged for rules, dots and graphics. Passed.
- Copy and content: unchanged. Passed.
- Layout and spacing rhythm: untouched. Passed.
- Type check: `tsc --noEmit` clean apart from the pre-existing
  `our-approach.tsx` `tabIndex` error. Passed.

## Findings

No P0/P1 identified. One P2 left open: the transactional email template in
`app/api/contact/route.ts` still carries six one-off surface hexes. Left alone
deliberately — it renders in mail clients, not the site, and CSS variables do
not survive there.

## Not verified

Live browser QA was not possible in this session: the sandbox is linux/arm64
while `node_modules` is darwin-arm64, so `next dev` cannot load SWC, and
neither sandbox nor cloud container has npm egress to install the right binary.
Verification was static — colour maths, contrast maths, brace/variable
validation, type check, and a rendered before/after band comparison. Needs a
`pnpm dev` pass on the Mac to confirm in situ.

final result: passed, pending live browser QA
