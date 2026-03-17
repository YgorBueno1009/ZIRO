// ─────────────────────────────────────
//  ZIRO Design Tokens
//  Altere aqui para mudar toda a UI
// ─────────────────────────────────────

export const colors = {
  // backgrounds
  bg:        '#0A0A0A',
  surface:   '#111111',
  surface2:  '#181818',
  surface3:  '#1F1F1F',

  // borders
  border:    '#2A2A2A',
  border2:   '#333333',

  // brand
  accent:    '#FF4D1C',
  accent2:   '#FF7A50',
  glow:      'rgba(255,77,28,0.18)',

  // status
  blue:      '#3B82F6',
  green:     '#22C55E',
  yellow:    '#F59E0B',
  red:       '#EF4444',
  purple:    '#A855F7',

  // text
  text:      '#F0EDE8',
  text2:     '#A0A0A0',
  text3:     '#555555',
};

export const fonts = {
  display: "'Syne', sans-serif",
  mono:    "'DM Mono', monospace",
  sans:    "'DM Sans', sans-serif",
};

// Pre-built CSS variable string injected into <style>
export const cssVariables = `
  --bg:       ${colors.bg};
  --surface:  ${colors.surface};
  --surface2: ${colors.surface2};
  --surface3: ${colors.surface3};
  --border:   ${colors.border};
  --border2:  ${colors.border2};
  --accent:   ${colors.accent};
  --accent2:  ${colors.accent2};
  --glow:     ${colors.glow};
  --blue:     ${colors.blue};
  --green:    ${colors.green};
  --yellow:   ${colors.yellow};
  --red:      ${colors.red};
  --purple:   ${colors.purple};
  --text:     ${colors.text};
  --text2:    ${colors.text2};
  --text3:    ${colors.text3};
  --mono:     ${fonts.mono};
  --sans:     ${fonts.sans};
  --display:  ${fonts.display};
`;
