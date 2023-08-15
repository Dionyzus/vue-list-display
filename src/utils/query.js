import availableGames from "../components/Games/data";

export const findGamesByProvider = (provider) => {
  return availableGames.filter(game => game.provider === provider);
};