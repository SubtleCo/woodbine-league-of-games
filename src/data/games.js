/*
  Source of truth for store games.
  Add a new object for every game you carry.
  The slug controls the URL: /stuffwelike/<slug>
*/
export const games = [
  {
    slug: 'moonrakers',
    name: 'Moonrakers',
    shortDescription: 'Deckbuilding + negotiation in a contract-racing space adventure.',
    heroPhoto: 'IMG_3339.png',
    detailParagraphs: [
      'Moonrakers rewards flexible planning. Players can recruit one another into missions and negotiate reward shares to make difficult contracts viable.',
      'We like carrying it because table talk matters as much as card optimization, which makes each play feel social and strategic at once.'
    ]
  },
  {
    slug: 'catan',
    name: 'Catan',
    shortDescription: 'A classic trade-and-expand game that still teaches core strategy skills.',
    heroPhoto: 'IMG_2826.png',
    detailParagraphs: [
      'Catan remains one of the most approachable strategy games for mixed groups. Trading resources keeps every player engaged between turns.',
      'We carry it because it is often the game that bridges casual game nights into regular board game groups.'
    ]
  },
  {
    slug: 'wingspan',
    name: 'Wingspan',
    shortDescription: 'A polished engine builder with smooth pacing and high replay value.',
    heroPhoto: 'IMG_3310.png',
    detailParagraphs: [
      'Wingspan gives players meaningful decisions each turn while maintaining a calm and accessible pace.',
      'We carry it because it supports both new and experienced players, and it rewards repeated play without becoming punishing.'
    ]
  }
];

export const gameBySlug = Object.fromEntries(games.map((game) => [game.slug, game]));
