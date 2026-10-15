/**
 * Criterium Deck Composer — brand chrome primitives.
 *
 * These are the ONLY pre-built pieces: the invariant brand chrome (cover,
 * section divider, action title, logo, footer, source line). They guarantee
 * the look and the discipline; they impose NO body format. Everything inside
 * a slide's body you compose yourself (see references/composition-method.md).
 *
 *   const pptxgen = require("pptxgenjs");
 *   const B = require("./brand");
 *   const P = require("./primitives");
 *   P.addCover(slide, { ... }); P.addActionTitle(slide, "..."); P.addSourceLine(slide, "...");
 *
 * Hex values carry no '#'. Layout is 16:9 widescreen (13.333in x 7.5in).
 */

const fs   = require("fs");
const path = require("path");
const B    = require("./brand");

function addCover(slide, opts) {
  const {
    title,
    subtitle,
    client,
    date,
    confidentiality = "CONFIDENCIAL",
    assetDir,
    heroImage,
    layout = "full_bleed",
  } = opts;

  const heroPath = heroImage
    ? (path.isAbsolute(heroImage) ? heroImage : path.join(assetDir, heroImage))
    : path.join(assetDir, "hero_bg.jpg");

  if (layout === "full_bleed") {
    // Full-bleed dark hero with white logo top-right
    slide.background = fs.existsSync(heroPath)
      ? { path: heroPath }
      : { color: B.NAVY };

    // Dark gradient scrim at the bottom for text legibility
    slide.addShape("rect", {
      x: 0, y: 4.0, w: B.SLIDE_W, h: 3.5,
      fill: { color: "000000", transparency: 55 },
      line: { color: "000000", width: 0 },
    });

    // White logo top-right
    addLogo(slide, assetDir, "white");

    // Small caps client label
    if (client) {
      slide.addText(client.toUpperCase(), {
        x: B.MARGIN_L, y: 4.55, w: 11, h: 0.3,
        fontFace: B.FONT_BODY, fontSize: B.SIZE_LABEL, bold: true,
        color: B.TEAL, charSpacing: B.CHAR_SPACING_LABEL,
        valign: "top", margin: 0,
      });
    }

    // Title (large, white)
    slide.addText(title, {
      x: B.MARGIN_L, y: 4.95, w: 11, h: 1.3,
      fontFace: B.FONT_HEADING, fontSize: B.SIZE_DECK_TITLE, bold: true,
      color: B.WHITE, valign: "top", margin: 0,
    });

    // Subtitle (lighter, smaller)
    if (subtitle) {
      slide.addText(subtitle, {
        x: B.MARGIN_L, y: 6.30, w: 11, h: 0.45,
        fontFace: B.FONT_BODY, fontSize: B.SIZE_DECK_SUBTITLE,
        color: B.WHITE, valign: "top", margin: 0,
        transparency: 15,
      });
    }

    // Stacked CONFIDENCIAL / CRITERIUM AI / date block bottom-right
    const bottomY = 6.95;
    slide.addText(confidentiality, {
      x: B.SLIDE_W - 3.5, y: bottomY, w: 3, h: 0.2,
      fontFace: B.FONT_BODY, fontSize: B.SIZE_FOOTER, bold: true,
      color: B.WHITE, charSpacing: B.CHAR_SPACING_LABEL,
      align: "right", valign: "middle", margin: 0,
    });
    if (date) {
      slide.addText(date, {
        x: B.SLIDE_W - 3.5, y: bottomY + 0.2, w: 3, h: 0.2,
        fontFace: B.FONT_BODY, fontSize: B.SIZE_FOOTER,
        color: B.WHITE, align: "right", valign: "middle", margin: 0,
        transparency: 25,
      });
    }
  } else {
    // "band" layout: hero image as a band, white background below
    slide.background = { color: B.WHITE };

    if (fs.existsSync(heroPath)) {
      slide.addImage({
        path: heroPath, x: 0, y: 0, w: B.SLIDE_W, h: 3.5,
        sizing: { type: "cover", w: B.SLIDE_W, h: 3.5 },
      });
    } else {
      slide.addShape("rect", {
        x: 0, y: 0, w: B.SLIDE_W, h: 3.5,
        fill: { color: B.NAVY }, line: { color: B.NAVY, width: 0 },
      });
    }

    addLogo(slide, assetDir, "white");

    if (client) {
      slide.addText(client.toUpperCase(), {
        x: B.MARGIN_L, y: 4.0, w: 11, h: 0.3,
        fontFace: B.FONT_BODY, fontSize: B.SIZE_LABEL, bold: true,
        color: B.TEAL, charSpacing: B.CHAR_SPACING_LABEL,
        valign: "top", margin: 0,
      });
    }
    slide.addText(title, {
      x: B.MARGIN_L, y: 4.4, w: 11, h: 1.3,
      fontFace: B.FONT_HEADING, fontSize: B.SIZE_DECK_TITLE, bold: true,
      color: B.BODY, valign: "top", margin: 0,
    });
    if (subtitle) {
      slide.addText(subtitle, {
        x: B.MARGIN_L, y: 5.75, w: 11, h: 0.5,
        fontFace: B.FONT_BODY, fontSize: B.SIZE_DECK_SUBTITLE,
        color: B.MUTED, valign: "top", margin: 0,
      });
    }
    const bottomY = 6.95;
    slide.addText(confidentiality, {
      x: B.SLIDE_W - 3.5, y: bottomY, w: 3, h: 0.2,
      fontFace: B.FONT_BODY, fontSize: B.SIZE_FOOTER, bold: true,
      color: B.MUTED, charSpacing: B.CHAR_SPACING_LABEL,
      align: "right", valign: "middle", margin: 0,
    });
    if (date) {
      slide.addText(date, {
        x: B.SLIDE_W - 3.5, y: bottomY + 0.2, w: 3, h: 0.2,
        fontFace: B.FONT_BODY, fontSize: B.SIZE_FOOTER,
        color: B.MUTED, align: "right", valign: "middle", margin: 0,
      });
    }
  }
}

// ============================================================
// LOGO — top-right on every content slide
// ============================================================

/**
 * Add the Criterium logo at the top-right anchor.
 *
 * @param {Slide}  slide
 * @param {string} assetDir  Absolute path to the assets folder
 * @param {string} [variant="gray"]  "gray" for white backgrounds, "white" for dark
 */
function addLogo(slide, assetDir, variant = "gray") {
  const filename = variant === "white"
    ? "criterium_logo_white.png"
    : "criterium_logo_gray.png";
  const logoPath = path.join(assetDir, filename);
  if (!fs.existsSync(logoPath)) {
    console.warn(`[criterium] logo not found at ${logoPath} — skipping`);
    return;
  }
  slide.addImage({
    path: logoPath,
    x: B.LOGO_X, y: B.LOGO_Y,
    w: B.LOGO_W, h: B.LOGO_H,
  });
}

// ============================================================
// FOOTER — page number + confidentiality line
// ============================================================

/**
 * Add the standard Criterium footer.
 *
 * @param {Slide}  slide
 * @param {Object} opts
 * @param {string} opts.client
 * @param {string} [opts.confidentiality="CONFIDENCIAL"]
 * @param {number} opts.page
 * @param {number} [opts.total]
 * @param {boolean} [opts.dark=false]  use light text for dark slides
 */
function addFooter(slide, opts) {
  const { client, confidentiality = "CONFIDENCIAL", page, total, dark = false } = opts;
  const color = dark ? B.MUTED_LIGHT : B.MUTED;

  const left = `CRITERIUM AI  |  ${client}  |  ${confidentiality}`;
  slide.addText(left, {
    x: B.MARGIN_L, y: B.FOOTER_Y, w: 10, h: B.FOOTER_H,
    fontFace: B.FONT_BODY, fontSize: B.SIZE_FOOTER,
    color, valign: "middle", margin: 0,
  });

  const pageText = total ? `${page} / ${total}` : String(page);
  slide.addText(pageText, {
    x: B.SLIDE_W - B.MARGIN_R - 0.7, y: B.FOOTER_Y, w: 0.6, h: B.FOOTER_H,
    fontFace: B.FONT_BODY, fontSize: B.SIZE_FOOTER,
    color, align: "right", valign: "middle", margin: 0,
  });
}

// ============================================================
// ACTION TITLE — McKinsey-style full-sentence headline
// ============================================================

/**
 * Add a McKinsey-style action title — a complete sentence stating the
 * slide's takeaway, anchored at the same Y on every slide.
 *
 * Use this INSTEAD of topic-style titles like "Q3 Performance".
 * Good action title: "Q3 revenue grew 14% driven by APAC expansion"
 *
 * @param {Slide}  slide
 * @param {string} title           The action title (1-2 lines)
 * @param {Object} [opts]
 * @param {string} [opts.subtitle] Optional dek/subhead beneath the title
 * @param {boolean} [opts.dark=false]  light text for dark backgrounds
 */
function addActionTitle(slide, title, opts = {}) {
  const { subtitle, dark = false } = opts;
  const titleColor = dark ? B.WHITE : B.BODY;
  const subtitleColor = dark ? B.MUTED_LIGHT : B.MUTED;

  slide.addText(title, {
    x: B.TITLE_X, y: B.TITLE_Y, w: B.TITLE_W, h: B.TITLE_H,
    fontFace: B.FONT_HEADING, fontSize: B.SIZE_ACTION_TITLE, bold: true,
    color: titleColor, valign: "top", margin: 0,
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: B.TITLE_X, y: B.SUBTITLE_Y, w: B.TITLE_W, h: B.SUBTITLE_H,
      fontFace: B.FONT_BODY, fontSize: B.SIZE_SUBTITLE, italic: true,
      color: subtitleColor, valign: "top", margin: 0,
    });
  }
}

// ============================================================
// SOURCE LINE — McKinsey-style citation at slide bottom
// ============================================================

/**
 * Add the source/notes line just above the footer. Critical for any
 * slide with data — McKinsey decks cite every number.
 *
 *   addSourceLine(slide, "Source: Company filings; CRITERIUM analysis")
 *   addSourceLine(slide, ["Note: 2026 figures are projections.", "Source: BANXICO"])
 *
 * @param {Slide}  slide
 * @param {string|string[]} text
 * @param {Object} [opts]
 * @param {boolean} [opts.dark=false]
 */
function addSourceLine(slide, text, opts = {}) {
  const { dark = false } = opts;
  const lines = Array.isArray(text) ? text.join("   |   ") : text;
  slide.addText(lines, {
    x: B.MARGIN_L, y: B.SOURCE_Y, w: B.SLIDE_W - B.MARGIN_L - B.MARGIN_R,
    h: B.SOURCE_H,
    fontFace: B.FONT_BODY, fontSize: B.SIZE_SOURCE, italic: true,
    color: dark ? B.MUTED_LIGHT : B.MUTED,
    valign: "middle", margin: 0,
  });
}

// ============================================================
// SECTION DIVIDER — dark navy background, large headline
// ============================================================

/**
 * Add a section divider slide — dark navy background, large white headline,
 * optional teal eyebrow, optional section number. Use to break a deck into
 * acts and create the "sandwich" rhythm that gives executive decks weight.
 *
 * Replaces the slide's background; assumes a fresh slide.
 *
 * @param {Slide}  slide
 * @param {Object} opts
 * @param {string} opts.headline       The section title
 * @param {string} [opts.eyebrow]      Small teal label above headline ("PARTE 2 — DIAGNÓSTICO")
 * @param {string} [opts.subtitle]     Optional sentence under the headline
 * @param {string} opts.assetDir
 */
function addSectionDivider(slide, opts) {
  const { headline, eyebrow, subtitle, assetDir } = opts;
  slide.background = { color: B.NAVY };

  // NOTE: no left-edge accent stripe. An edge color bar is a hallmark of
  // AI-generated slides; the divider earns its weight from the navy field,
  // the teal eyebrow, and the large headline — not from a sidebar rule.

  // White logo top-right
  if (assetDir) addLogo(slide, assetDir, "white");

  let y = 3.0;
  if (eyebrow) {
    slide.addText(eyebrow.toUpperCase(), {
      x: 1.2, y, w: 11, h: 0.35,
      fontFace: B.FONT_BODY, fontSize: B.SIZE_LABEL, bold: true,
      color: B.TEAL_ON_DARK, charSpacing: B.CHAR_SPACING_LABEL,
      valign: "top", margin: 0,
    });
    y += 0.5;
  }

  slide.addText(headline, {
    x: 1.2, y, w: 11, h: 1.5,
    fontFace: B.FONT_HEADING, fontSize: B.SIZE_SECTION_DIVIDER, bold: true,
    color: B.WHITE, valign: "top", margin: 0,
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 1.2, y: y + 1.6, w: 10.5, h: 0.7,
      fontFace: B.FONT_BODY, fontSize: B.SIZE_BODY_LARGE,
      color: B.MUTED_LIGHT, valign: "top", margin: 0,
    });
  }
}

// ============================================================
// CALLOUT — the "so what" / takeaway band
// ============================================================

/**
 * Add a callout band carrying the slide's takeaway, or the tension the
 * exhibit resolves ("LA CUÑA", "EL REPARTO", "COMPUERTA DE ARRANQUE").
 *
 * Treatment: soft tint fill + a hairline border + the label as a teal
 * eyebrow INSIDE the band. There is deliberately NO left-edge accent
 * stripe — a colored edge bar down one side of a box is one of the clearest
 * tells of an AI-generated slide. Set the band apart with the tint, not a
 * stripe. Keep the text a real sentence with a specific noun or number in
 * it; a callout that only restates the title in vaguer words is wasted ink.
 *
 * @param {Slide}  slide
 * @param {Object} opts
 * @param {number} opts.x  @param {number} opts.y  @param {number} opts.w  @param {number} opts.h
 * @param {string} [opts.label]            short eyebrow, e.g. "LA CUÑA"
 * @param {string} opts.text               the takeaway sentence(s)
 * @param {boolean} [opts.spotlight=true]  teal tint when true; neutral when false
 */
function addCallout(slide, opts) {
  const { x, y, w, h, label, text, spotlight = true } = opts;
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: spotlight ? B.TEAL_50 : B.OFF_WHITE },
    line: { color: spotlight ? B.TEAL_200 : B.BORDER, width: 0.75 },
  });
  const padX = 0.22;
  let ty = y + 0.14;
  if (label) {
    slide.addText(label.toUpperCase(), {
      x: x + padX, y: ty, w: w - padX * 2, h: 0.22,
      fontFace: B.FONT_BODY, fontSize: B.SIZE_LABEL, bold: true,
      color: B.TEAL_DARK, charSpacing: B.CHAR_SPACING_LABEL,
      valign: "top", margin: 0,
    });
    ty += 0.27;
  }
  slide.addText(text, {
    x: x + padX, y: ty, w: w - padX * 2, h: h - (ty - y) - 0.12,
    fontFace: B.FONT_BODY, fontSize: B.SIZE_BODY_LARGE,
    color: B.BODY, valign: "top", margin: 0, lineSpacingMultiple: 1.05,
  });
}

module.exports = {
  addCover,
  addLogo,
  addFooter,
  addActionTitle,
  addSourceLine,
  addSectionDivider,
  addCallout,
};
