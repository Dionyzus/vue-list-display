import GAMES from "../components/Games/data";

export const findGamesByProvider = (provider) => {
  return GAMES.filter(game => game.provider === provider);
};