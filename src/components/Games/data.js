import { v4 as uuidv4 } from 'uuid';

import bars from '@/assets/bars.jpg';
import cards from '@/assets/cards.jpg';
import jackpot from '@/assets/jackpot.jpg';
import poker from '@/assets/poker.jpg';
import roulette from '@/assets/roulette.jpg';
import slot from '@/assets/slot.jpg';

import { CATEGORIES,PROVIDERS } from '../../common/constants';

const GAMES = [{
  id: uuidv4(),
  title: 'Bars',
  provider: PROVIDERS.AMUSNET_INTERACTIVE_LTD,
  categories: [CATEGORIES.CLASSIC_SLOTS],
  description: `These types of games come in different versions to suit
      varying needs. A sloty is usually a computerized version of a classic
      fruit machine that you can find in a typical land-based casino.
      The online versions usually come with additional symbols such as scatter
      symbols, wild symbols, and interactive bonus rounds.`,
  imageSrc: bars
}, {
  id: uuidv4(),
  title: 'Cards',
  provider: PROVIDERS.BETSOFT,
  categories: [CATEGORIES.TABLE_GAMES, CATEGORIES.KENO],
  description: `It is a strategy game, as every decision you make on a single
      hand will affect the final outcome. You must understand the rules of the
      game. However, learning a strategy is the best approach if you want to
      come out as a winner. In a typical blackjack game, the dealer and the
      player receive two cards each at the game's start. The house usually
      has the upper hand as there several rules that favor the house.`,
  imageSrc: cards
}, {
  id: uuidv4(),
  title: 'Jackpot',
  provider: PROVIDERS.ELK_STUDIOS,
  categories: [CATEGORIES.CLASSIC_SLOTS, CATEGORIES.VR_SLOTS],
  description: `Thanks to new high-paying features and innovative gameplay,
      the best games at slots sites nowadays have millions of fans.
      Aside from 3-reel classics, modern slots using engines such as Megaways
      feature hundreds of thousands of titles that almost guarantee wins.
      Many of these slots also have an enticing bonus round with
      a sky-high payback percentage.`,
  imageSrc: jackpot
}, {
  id: uuidv4(),
  title: 'Poker',
  provider: PROVIDERS.PLAYTECH,
  categories: [CATEGORIES.TABLE_GAMES, CATEGORIES.POKER],
  description: ` A typical video poker game does not involve a live dealer,
      and the player does not interact with other players. It is a game of
      skill, and the players have to make decisions that will affect the
      results/ outcome. The odds in a typical video poker machine rival in
      those you can find on other casino games if you are skillful.`,
  imageSrc: poker
}, {
  id: uuidv4(),
  title: 'Roulette',
  provider: PROVIDERS.GENESIS_GAMING_SOLUTIONS,
  categories: [CATEGORIES.TABLE_GAMES, CATEGORIES.WHEEL_OF_FORTUNE],
  description: `It is one of the oldest casino games that are still popular
      in the modern world. It is a computer program that selects some sequences
      randomly. These numbers must correspond to elements or symbols of a slot
      machine or casino game. A typical roulette game over the internet has
      a live dealer, a real ball, a real layout, and a real wheel.
      There have been changes to the rules, but the basic ones have
      remained the same over the years.`,
  imageSrc: roulette
}, {
  id: uuidv4(),
  title: 'Slot',
  provider: PROVIDERS.NEXT_GEN_GAMING,
  categories: [
    CATEGORIES.CLASSIC_SLOTS,
    CATEGORIES.SLOT_GAMES,
    CATEGORIES.VR_SLOTS],
  description: `The player must line up winning symbols for a payout to occur.
      The number of pay lines will vary from one game to the other.
      They can be 25 or 50, where certain combinations will trigger a payout.
      A player gets high returns when he or she hits high-value symbols.`,
  imageSrc: slot
}];

export default GAMES;
