import {getRankDefinitions} from './rank-functions.js';

export function calculateRatingRange(innerLv, rank, isDxPlus) {
  const rankDefs = getRankDefinitions(isDxPlus);
  const idx = rankDefs.indexOf(rank);
  const maxAchv = idx >= 1 ? rankDefs[idx - 1].th - 0.0001: rank.th;
  const minRating = Math.floor(innerLv * rank.th * rank.factor / 100);
  const maxRating = Math.floor(innerLv * maxAchv * rank.factor / 100);
  return [minRating, maxRating];
}
