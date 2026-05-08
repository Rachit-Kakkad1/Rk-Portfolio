export const TILE_SIZE = 16;

// Tile type constants
export const T = {
  AIR: 0, GROUND: 1, BRICK: 2, QUESTION: 3,
  USED: 4, PIPE_TOP_L: 5, PIPE_TOP_R: 6,
  PIPE_L: 7, PIPE_R: 8,
} as const;

// Question block contents indexed by tileX_tileY
export const BLOCK_CONTENTS: Record<string, 'coin'|'mushroom'|'star'|'stat'> = {
  '16_4': 'stat',
  '21_8': 'stat', '23_8': 'stat',
  '78_12': 'coin', '83_8': 'stat',
  '107_8': 'stat', '112_12': 'stat',
};

export const STAT_LABELS: Record<string, { label: string, value: string }> = {
  '16_4': { label: 'Commits', value: '1.6k+' },
  '21_8': { label: 'Repos', value: '45+' },
  '23_8': { label: 'PRs', value: '24+' },
  '83_8': { label: 'Merged %', value: '83.33%' },
  '107_8': { label: 'Streak', value: '50 Days' },
  '112_12': { label: 'Followers', value: '100+' },
};

// Ground segments [startX, endX] in tiles
export const GROUND_SEGMENTS = [
  [0, 68], [71, 81], [86, 200]
];

// Pipes [tileX, heightInTiles]
export const PIPES = [
  [28, 2], [38, 3], [46, 4], [57, 4]
];

// Brick block positions [tileX, tileY]
export const BRICKS: [number,number][] = [
  [16,8],[20,8],[22,8],[24,8],
  [78,4],[80,4],[82,4],
  [80,8],[82,8],
  [91,8],[92,8],[93,8],[94,8],[95,8],
  [107,8],[109,8],
  [125,8],[126,8],[127,8],[128,8]
];

// Question block positions [tileX, tileY]
export const QUESTION_BLOCKS: [number,number][] = [
  [16,4],[21,8],[23,8],
  [78,12],[83,8],
  [107,8],[112,12]
];

// Goomba spawn positions [tileX]
export const GOOMBA_SPAWNS = [22,37,50,63,78,90,112,128,150];

// Staircase to flagpole
export const STAIRS_X = 196;
export const STAIRS_HEIGHTS = [1,2,3,4,5,6,7,8];

// Flagpole
export const FLAG_POLE_X = 212;
export const FLAG_POLE_TOP_Y = 2;
export const CASTLE_X = 215;

// Background decoration
export const CLOUDS = [
  {x:8,y:2,size:'sm'},{x:24,y:1,size:'lg'},
  {x:56,y:2,size:'sm'},{x:88,y:1,size:'lg'},
  {x:120,y:2,size:'sm'},{x:160,y:1,size:'lg'}
];
export const HILLS = [
  {x:0,w:6,peakY:10},{x:48,w:9,peakY:9},{x:100,w:6,peakY:10}
];
export const BUSHES = [12,32,60,84,108,140];
