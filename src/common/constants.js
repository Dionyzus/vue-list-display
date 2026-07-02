import bars from '@/assets/bars.jpg';
import cards from '@/assets/cards.jpg';
import jackpot from '@/assets/jackpot.jpg';
import poker from '@/assets/poker.jpg';
import roulette from '@/assets/roulette.jpg';
import slot from '@/assets/slot.jpg';

export const GAME_CATALOG_ANCHOR_ID = 'game-catalog';
export const APP_HEADER_SCROLL_OFFSET = '4rem';
export const APP_HEADER_SCROLL_OFFSET_MOBILE = '3rem';

export const HERO_BANNER_HEADLINE = 'Online Casino';
export const HERO_BANNER_SUPPORTING = 'Browse our game catalog';
export const HERO_BANNER_CTA_LABEL = 'Browse games';

export const IMAGE_SOURCES = [bars, cards, jackpot, poker, roulette, slot];
export const RTP_VALUES = ['85%', '90%', '95%', '92%', '97%'];

export const PROVIDERS = {
  PLAYTECH: 'Playtech',
  BETSOFT: 'Betsoft',
  YGGDRASIL_GAMING_LTD: 'Yggdrasil Gaming Ltd',
  HACKSAW_GAMING: 'Hacksaw Gaming',
  NET_ENT_AB: 'NetEnt AB',
  PLAY_N_GO: 'Play\'n GO',
  ELK_STUDIOS: 'ELK Studios',
  AMUSNET_INTERACTIVE_LTD: 'Amusnet Interactive Ltd',
  LIGHT_AND_WONDER: 'Light & Wonder',
  BLUEPRINT_GAMING_INC: 'Blueprint Gaming Inc',
  NEXT_GEN_GAMING: 'NextGen Gaming',
  GENESIS_GAMING_SOLUTIONS: 'Genesis Gaming Solutions'
};

export const CATEGORIES = {
  TABLE_GAMES: 'Table Games',
  BLACKJACK: 'Blackjack',
  SLOT_GAMES: 'Slot Games',
  CLASSIC_SLOTS: 'Classic Slots',
  BINGO: 'Bingo',
  KENO: 'Keno',
  WHEEL_OF_FORTUNE: 'Wheel of Fortune',
  VIDEO_SLOTS: 'Video Slots',
  VR_SLOTS: 'VR Slots',
  POKER: 'Poker'
};

export const VOLATILITIES = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High'
};