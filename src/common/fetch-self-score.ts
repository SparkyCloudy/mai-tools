import {Difficulty, getDifficultyName} from './difficulties';
import {getChartLevel, getChartType, getSongName} from './fetch-score-util';
import {ChartType} from './song-props';
import {fetchPage} from './util';

export const SELF_SCORE_URLS = new Map([
  [Difficulty.ReMASTER, "/maimai-mobile/record/musicGenre/search/?genre=99&diff=4"],
  [Difficulty.MASTER, "/maimai-mobile/record/musicGenre/search/?genre=99&diff=3"],
  [Difficulty.EXPERT, "/maimai-mobile/record/musicGenre/search/?genre=99&diff=2"],
  [Difficulty.ADVANCED, "/maimai-mobile/record/musicGenre/search/?genre=99&diff=1"],
  [Difficulty.BASIC, "/maimai-mobile/record/musicGenre/search/?genre=99&diff=0"],
]);

function getAchievement(row: HTMLElement) {
  const ach = row.querySelector(".music_score_block.w_120") as HTMLElement;
  return ach && ach.innerText;
}

function processRow(
  row: HTMLElement,
  difficulty: Difficulty,
  state: {genre: string; scoreList: string[]}
) {
  const isGenreRow = row.classList.contains("screw_block");
  const isScoreRow =
    row.classList.contains("w_450") &&
    row.classList.contains("m_15") &&
    row.classList.contains("p_r") &&
    row.classList.contains("f_0");
  if (isGenreRow) {
    state.genre = row.innerText;
  } else if (isScoreRow) {
    const songName = getSongName(row);
    const level = getChartLevel(row);
    const chartType = getChartType(row) === ChartType.DX ? "DX" : "STANDARD";
    const achievement = getAchievement(row);
    if (!achievement) {
      return;
    }
    state.scoreList.push(
      [songName, state.genre, getDifficultyName(difficulty), level, chartType, achievement].join("\t")
    );
  }
}

export async function fetchScores(
  difficulty: Difficulty,
  scoreList: string[]
): Promise<Document | undefined> {
  const url = SELF_SCORE_URLS.get(difficulty);
  if (!url) {
    return;
  }
  const dom = await fetchPage(url);
  const rows = dom.querySelectorAll(".main_wrapper.t_c .m_15") as NodeListOf<HTMLElement>;
  const state = {genre: "", scoreList: scoreList};
  rows.forEach((row) => processRow(row, difficulty, state));
  return dom;
}
