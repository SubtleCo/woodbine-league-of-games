/*
  Source of truth for store games.
  Add a new object for every game you carry.
  The slug controls the URL: /stuffwelike/<slug>
*/
export const games = [
  {
    slug: 'ahoy',
    name: 'Ahoy',
    shortDescription: 'Swashbuckling dice placement and cargo delivery on the high seas.',
    heroPhoto: 'IMG_2834.png',
    detailParagraphs: [
      'You are swashbucklers and soldiers on the high seas. Each round, you roll and place dice to take the unique actions of your faction.',
      'As you control regions and deliver cargo, you gain Fame. The player with the most Fame wins.'
    ]
  },
  {
    slug: 'root',
    name: 'Root',
    shortDescription: 'Asymmetric woodland strategy where every faction plays differently.',
    heroPhoto: 'root.png',
    detailParagraphs: [
      'Root is a game of woodland might and right where factions fight for control in very different ways.',
      'We carry it because it rewards repeat play, table strategy, and deep faction mastery.'
    ]
  },
  {
    slug: 'root-landmarks-pack',
    name: 'Root: Landmarks Pack',
    parentSlug: 'root',
    shortDescription: 'Adds tactical landmarks that change map priorities and flow.',
    heroPhoto: 'root_2.png',
    detailParagraphs: [
      'The Landmarks Pack brings the Woodland to life with strategic landmarks for Root maps.',
      'It includes the Black Market, the Lost City, the Legendary Forge, and the Elder Treetop.'
    ]
  },
  {
    slug: 'root-riverfolk-expansion',
    name: 'Root: Riverfolk Expansion',
    parentSlug: 'root',
    shortDescription: 'New factions, vagabonds, and game modes for Root.',
    heroPhoto: 'root_2.png',
    detailParagraphs: [
      'The Riverfolk Expansion adds two new factions: the Riverfolk and the Lizard Cultists.',
      'It also adds new vagabonds and additional game modes to expand table variety.'
    ]
  },
  {
    slug: 'root-marauder-expansion',
    name: 'Root: The Marauder Expansion',
    parentSlug: 'root',
    shortDescription: 'Adds two factions and hirelings for larger Root matchups.',
    heroPhoto: 'root_2.png',
    detailParagraphs: [
      'The Marauder Expansion adds the Lord of the Hundreds and the Keepers in Iron.',
      'It also adds hirelings, opening up more options for high-player-count games.'
    ]
  },
  {
    slug: 'root-underworld-expansion',
    name: 'Root: The Underworld Expansion',
    parentSlug: 'root',
    shortDescription: 'Two factions and two new maps for Root.',
    heroPhoto: 'root_2.png',
    detailParagraphs: [
      'The Underworld Expansion adds the Underground Duchy and the Corvid Conspiracy.',
      'It also includes two new maps that change positioning and movement strategy.'
    ]
  },
  {
    slug: 'root-vagabond-pack',
    name: 'Root: The Vagabond Pack',
    parentSlug: 'root',
    shortDescription: 'Custom meeples plus three new Vagabond characters.',
    heroPhoto: 'root_2.png',
    detailParagraphs: [
      'The Vagabond Pack upgrades Root with seven custom Vagabond meeples.',
      'It includes three new Vagabond character cards: the Ronin, the Adventurer, and the Harrier.'
    ]
  },
  {
    slug: 'moonrakers',
    name: 'Moonrakers',
    shortDescription: 'Deckbuilding + negotiation in a contract-racing space adventure.',
    heroPhoto: 'moonrakers.png',
    detailParagraphs: [
      'Moonrakers rewards flexible planning. Players can recruit one another into missions and negotiate reward shares to make difficult contracts viable.',
      'We like carrying it because table talk matters as much as card optimization, which makes each play feel social and strategic at once.'
    ]
  },
  {
    slug: 'veiled-fate',
    name: 'Veiled Fate',
    shortDescription: 'Hidden influence and deduction around a shifting council.',
    heroPhoto: 'veiled_fate.png',
    detailParagraphs: [
      'Veiled Fate blends hidden information and influence play, with players steering outcomes while masking their true interests.',
      'We carry it because it creates high interaction and dramatic reveals without losing strategic depth.'
    ]
  },
  {
    slug: 'brink',
    name: 'Brink',
    shortDescription: 'A tense strategic showdown with momentum swings and table pressure.',
    heroPhoto: 'brink.png',
    detailParagraphs: [
      'Brink rewards careful timing, risk management, and reading your opponents.',
      'We carry it as part of our IV Studio lineup for groups that want tactical conflict and high replayability.'
    ]
  },
  {
    slug: 'silverfrost',
    name: 'Silverfrost',
    shortDescription: 'A high-stakes strategy experience with layered decision making.',
    heroPhoto: 'silverfrost.png',
    detailParagraphs: [
      'Silverfrost is a strategic title that rewards planning over multiple turns while reacting to changing board state.',
      'We carry it in the IV Studio lineup for players who want deeper tactical puzzles and table interaction.'
    ]
  },
  {
    slug: 'time-to-panic',
    name: 'Time to Panic',
    shortDescription: 'Fast pressure-driven gameplay with sharp tactical turns.',
    heroPhoto: 'time_to_panic.png',
    detailParagraphs: [
      'Time to Panic pushes players to make efficient choices while the table state shifts quickly.',
      'It works well for groups that want shorter, energetic sessions without losing strategic decisions.'
    ]
  },
  {
    slug: 'tend',
    name: 'Tend',
    shortDescription: 'A thoughtful strategy game centered on growth and timing.',
    heroPhoto: 'tend.png',
    detailParagraphs: [
      'Tend emphasizes engine development and careful action sequencing across the game arc.',
      'We carry it for players who like medium-weight strategy with clean turns and long-term planning.'
    ]
  }
];

export const gameBySlug = Object.fromEntries(games.map((game) => [game.slug, game]));
export const topLevelGames = games.filter((game) => !game.parentSlug);
export const childGamesByParent = games.reduce((acc, game) => {
  if (!game.parentSlug) return acc;
  if (!acc[game.parentSlug]) acc[game.parentSlug] = [];
  acc[game.parentSlug].push(game);
  return acc;
}, {});
