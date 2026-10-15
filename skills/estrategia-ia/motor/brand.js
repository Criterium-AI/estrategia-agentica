/**
 * Criterium AI — Executive Deck design tokens
 *
 * Single source of truth for the Criterium visual language: teal-primary
 * palette, neutrals, semantic statuses, typography stack, and the 16:9
 * widescreen layout grid.
 *
 * USE: import this module from any pptxgenjs script you write. Never
 * hardcode brand values elsewhere.
 *
 *   const B = require("./brand");
 *   slide.addText("Title", { color: B.TEAL, fontSize: B.SIZE_SLIDE_TITLE });
 *
 * NOTE: hex values are WITHOUT the '#' prefix — pptxgenjs corrupts the
 * file if you include it.
 */

module.exports = {

  // ============================================================
  // PRIMARY — the Criterium signature teal
  // ============================================================

  TEAL:        "00BCD5",   // primary accent — titles, hero numbers, callouts
  TEAL_DARK:   "0099AE",   // pressed/hover analog (rare)
  TEAL_MUTED:  "5BC7D5",   // secondary accent

  // Teal scale — left-to-right progression in funnels and stage cards
  TEAL_50:     "F0FCFC",   // lightest tint
  TEAL_100:    "DFF7F9",
  TEAL_200:    "B2EBF4",
  TEAL_300:    "80DDEC",
  TEAL_400:    "3FCDDB",   // approaches primary

  // ============================================================
  // DARK ACCENT — the McKinsey "alternating dark" approach
  // ============================================================
  //
  // Use NAVY as the background for section dividers, opening slides,
  // and closing recap slides. Creates the "sandwich" rhythm that gives
  // an executive deck its premium feel.

  NAVY:        "0B1B2E",   // dark slide background (section dividers, dark covers)
  NAVY_SOFT:   "1A2B45",   // slightly lighter for accents on dark slides
  TEAL_ON_DARK:"3FCDDB",   // teal that sits well on NAVY backgrounds

  // ============================================================
  // NEUTRALS
  // ============================================================

  WHITE:       "FFFFFF",
  OFF_WHITE:   "FAFAFA",
  BODY:        "1A1A1A",   // primary body text — slightly warm, not pure black
  HEADING:     "0F172A",   // alternate heading tone
  MUTED:       "6B7280",   // captions, footers, sources
  MUTED_LIGHT: "9CA3AF",   // tertiary labels
  BORDER:      "E5E7EB",   // card borders, table rules
  BORDER_DARK: "CBD5E1",   // heavier borders
  DIVIDER:     "F3F4F6",   // alternating row backgrounds, very subtle dividers

  // ============================================================
  // SEMANTIC STATUS COLORS
  // ============================================================
  // Use ONLY in their semantic context: completion badges, status
  // markers, risk callouts. Never as decoration.

  SUCCESS_BG:  "D0FAE4",  SUCCESS_FG:  "10BC84",   // ✓ complete
  WARNING_BG:  "FEF3C7",  WARNING_FG:  "B45309",   // ◐ in progress
  PENDING_BG:  "F3F4F6",  PENDING_FG:  "6B7280",   // ○ pending
  DANGER_BG:   "FEE2E2",  DANGER_FG:   "B91C1C",   // ⚠ risk / blocker
  INFO_BG:     "DBEAFE",  INFO_FG:     "1E40AF",   // ℹ note

  // ============================================================
  // CHART PALETTES
  // ============================================================
  //
  // For data viz. Use SPOTLIGHT for the one series/bar/segment you
  // want the audience to look at. Use GHOST for the rest (everything
  // that provides context but isn't the point).

  SPOTLIGHT:   "00BCD5",   // the one bar/line you want highlighted
  GHOST:       "CBD5E1",   // unhighlighted bars/lines (context only)
  GHOST_LIGHT: "E5E7EB",   // even more recessive

  // Multi-series sequence (use only when 3+ categories truly need distinct colors)
  SERIES_1:    "00BCD5",   // teal (always primary)
  SERIES_2:    "0B1B2E",   // navy
  SERIES_3:    "5BC7D5",   // teal muted
  SERIES_4:    "9CA3AF",   // gray
  SERIES_5:    "B45309",   // amber (use sparingly)

  // ============================================================
  // TABLE CHROME
  // ============================================================

  TABLE_HEADER_BG: "111827",   // near-black header row
  TABLE_HEADER_FG: "FFFFFF",
  ROW_FILL_A:      "FFFFFF",   // odd row
  ROW_FILL_B:      "F9FAFB",   // even row (zebra)

  // ============================================================
  // TYPOGRAPHY
  // ============================================================
  //
  // Two font stacks — pick ONE per deck and commit:
  //   • McKinsey-style: Georgia (titles) + Arial (body) — classic editorial
  //   • Modern-tech:    Calibri throughout — crisper, less formal
  //
  // McKinsey-style is the default for board/CEO/steerco audiences.
  // Calibri-only is fine for internal/working sessions.

  FONT_HEADING_MCKINSEY: "Georgia",
  FONT_BODY_MCKINSEY:    "Arial",

  FONT_HEADING_MODERN:   "Calibri",
  FONT_BODY_MODERN:      "Calibri",

  // Default — choose per deck. McKinsey-style is the recommended default.
  FONT_HEADING:          "Georgia",
  FONT_BODY:             "Arial",

  FONT_MONO:             "Consolas",

  // Font sizes (points)
  //
  // ⚠ HERO NUMBERS ARE EXCEPTIONAL, NOT THE DEFAULT. A deck whose default
  // move is "one big number + one short phrase" reads as a pitch teaser,
  // not a consulting deliverable. Use a hero number AT MOST once or twice
  // per deck, only for the single anchor figure of the recommendation.
  // Everywhere else, prove the number with a populated exhibit.
  SIZE_HERO_NUMBER:      96,   // big numbers are a Criterium signature — use them with pride AND context
  SIZE_HERO_NUMBER_MIN:  80,   // a hero figure lives in the 80-110pt range; never timid
  SIZE_HERO_NUMBER_MAX: 110,   // ceiling only so it still fits with its descriptor
  SIZE_STAT_INLINE:      30,   // the workhorse: a sized number INSIDE a populated exhibit (KPI cell, before/after)
  SIZE_DECK_TITLE:       40,   // cover title
  SIZE_DECK_SUBTITLE:    22,   // cover subtitle / client
  SIZE_ACTION_TITLE:     22,   // McKinsey-style action title (1-2 lines, full sentence)
  SIZE_SLIDE_TITLE:      28,   // shorter topic-style title (when needed)
  SIZE_SECTION_DIVIDER:  44,   // section divider headline on dark background
  SIZE_SUBTITLE:         13,   // slide subtitle / dek
  SIZE_CARD_TITLE:       16,
  SIZE_CARD_SUBTITLE:    12,
  SIZE_LABEL:            10,   // SMALL CAPS labels ("STAGE 1", "OPPORTUNITY")
  SIZE_BODY:             11,
  SIZE_BODY_LARGE:       13,   // for 1-2 paragraph slides
  SIZE_SMALL:            10,
  SIZE_CAPTION:          9,
  SIZE_FOOTER:           9,
  SIZE_SOURCE:           8,    // source/footnote line at slide bottom
  SIZE_BADGE:            10,
  SIZE_LETTER_BADGE:     22,

  // Character spacing (pptxgenjs charSpacing, tenths of a point)
  CHAR_SPACING_LABEL:    3,    // for ALL CAPS labels
  CHAR_SPACING_TIGHT:    0,

  // ============================================================
  // LAYOUT — 16:9 widescreen, all values in inches
  // ============================================================
  //
  // pptxgenjs layout: LAYOUT_WIDE = 13.333" × 7.5"

  SLIDE_W: 13.333,
  SLIDE_H: 7.5,

  // Page margins
  MARGIN_L: 0.5,
  MARGIN_R: 0.5,
  MARGIN_T: 0.35,
  MARGIN_B: 0.4,

  // Action title block (McKinsey anchor — title fixed at the same Y on every slide)
  TITLE_X:     0.5,
  TITLE_Y:     0.45,
  TITLE_W:     10.3,        // leaves room for top-right logo
  TITLE_H:     0.85,        // accommodates 2-line action titles
  SUBTITLE_Y:  1.30,
  SUBTITLE_H:  0.30,

  // Body content region (everything between title block and source line)
  CONTENT_Y_START:   1.75,
  CONTENT_H_DEFAULT: 4.95,

  // Source / footnote line (just above footer)
  SOURCE_Y: 6.85,
  SOURCE_H: 0.20,

  // Footer (page number + confidentiality line)
  FOOTER_Y: 7.18,
  FOOTER_H: 0.22,

  // Logo top-right on every content slide
  LOGO_W: 1.6,
  LOGO_H: 0.38,
  LOGO_X: 11.3,
  LOGO_Y: 0.35,

  // ============================================================
  // SHAPE / CARD GEOMETRY
  // ============================================================

  CARD_RADIUS:         0.08,   // subtle rounded corners (not playful)
  CARD_BORDER_WIDTH:   1,      // pt
  CARD_SHADOW_BLUR:    6,
  CARD_SHADOW_OFFSET:  2,
  CARD_SHADOW_OPACITY: 0.08,   // very subtle
  CARD_PADDING:        0.3,

  // Status pill geometry
  PILL_H:        0.32,
  PILL_RADIUS:   0.05,
  PILL_PAD_X:    0.12,

  // ============================================================
  // ICONOGRAPHY — the McKinsey-style monochrome icon system
  // ============================================================
  //
  // McKinsey ships a bespoke icon set: simple, minimalist, monochromatic,
  // used at consistent size and stroke throughout a deck. Icons must CARRY
  // MEANING (signal a category, a concept, a status) — never decoration.
  // The pattern: replace a bullet wall with an icon + label row when a
  // slide would otherwise be flat text. Reuse the same icon for the same
  // concept across the deck so it becomes a visual mnemonic.
  //
  // Render icons with criterium_icons.js (addIcon / addIconList). Default
  // stroke color is NAVY on white slides; TEAL when the icon marks the
  // one concept you are spotlighting.

  ICON_SIZE:        0.34,   // default diameter/box in inches — keep consistent across the deck
  ICON_SIZE_SM:     0.26,
  ICON_SIZE_LG:     0.5,
  ICON_STROKE_PX:   2,      // line weight in the source 24px viewBox (feather/lucide style)
  ICON_COLOR:       "0B1B2E",   // NAVY — default monochrome icon color on white slides
  ICON_COLOR_SPOT:  "00BCD5",   // TEAL — only for the icon marking the spotlighted concept
  ICON_COLOR_MUTED: "6B7280",   // for secondary / context icons

  // ============================================================
  // DENSITY / CONTENT FLOOR — the anti-sparseness contract
  // ============================================================
  //
  // These are not pixel values; they are the content-richness contract the
  // deck must satisfy. A content slide that holds only a title + a number +
  // a short phrase is INCOMPLETE. See design_system.md "Density & rigor".
  //
  //   • Every content slide carries ONE fully-populated exhibit that proves
  //     its action title (chart, framework, data table, or labeled diagram).
  //   • Every cell / bar / node / quadrant holds a SPECIFIC datum — a number,
  //     a comparison, or a named fact that could not apply to another company.
  //   • Target ≥ 4 distinct, substantive content elements per content slide
  //     (e.g. exhibit + 3 labeled data points; or 6-row table; or 3 columns ×
  //     3 bullets). "Aire" comes from the grid, not from empty space.
  DENSITY_MIN_ELEMENTS: 4,     // content QA gate — flag slides below this
  GRID_GUTTER:          0.15,  // standard gutter between aligned content blocks
};