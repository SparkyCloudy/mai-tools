const THRESHOLD_TO_PLUS = 0.6;
const OFFICIAL_LEVELS = [];
for (let i = 14; i >= 1; i--) {
  OFFICIAL_LEVELS.push(i + "+");
  OFFICIAL_LEVELS.push(i.toString());
}

const RANK_THRESHOLDS = new Map([
  [100.50, "SSS+"],
  [100.00, "SSS"],
  [99.50, "SS+"],
  [99.00, "SS"],
  [98.00, "S+"],
  [97.00, "S"],
  [94.00, "AAA"],
  [90.00, "AA"],
  [80.00, "A"],
  [75.00, "BBB"],
  [70.00, "BB"],
  [60.00, "B"],
  [50.00, "C"],
]);

const LEVEL_RANK_CELL_BASE_CLASSNAME = "levelRankCell";
const LEVEL_RANK_CELL_CLASSNAMES = ["officialLevelCell"];
const DIFF_RANK_CELL_BASE_CLASSNAME = "diffRankCell";
const DIFF_RANK_TOP_LEFT_CELL_CLASSNAME = "difficultyRankDistHead";
const LAST_CELL_CLASSNAME = "totalCell";

function getOfficialLevel(innerLv) {
  const baseLevel = Math.floor(innerLv);
  const minorLevel = innerLv - baseLevel;
  return minorLevel > THRESHOLD_TO_PLUS ? baseLevel + "+" : baseLevel.toString();
}

function getRankText(achievement) {
  for (const [minAc, rankText] of RANK_THRESHOLDS) {
    if (achievement >= minAc) {
      return rankText;
    }
  }
  return "C";
}

function getRankDistribution(scoreList) {
  const countPerRank = new Map();
  for (const rank of RANK_THRESHOLDS.values()) {
    countPerRank.set(rank, 0);
  }
  scoreList.forEach((record) => {
    const rankText = getRankText(record.achievement);
    const rankCount = countPerRank.get(rankText);
    countPerRank.set(rankText, rankCount + 1);
  });
  return countPerRank;
}

function _renderRankDistributionRowHelper(
  values, isHeading, showTotal, rowClassname, baseCellClassname, perColumnClassnames
) {
  const tr = document.createElement("tr");
  if (rowClassname) {
    tr.classList.add(rowClassname);
  }
  let cell;
  values.forEach((v, index) => {
    const tagName = (isHeading || index === 0) ? "th" : "td"
    cell = document.createElement(tagName);
    cell.innerText = v;
    cell.classList.add(baseCellClassname);
    if (index < perColumnClassnames.length) {
      cell.classList.add(perColumnClassnames[index]);
    }
    tr.appendChild(cell);
  });
  if (showTotal) {
    cell.classList.add(LAST_CELL_CLASSNAME);
  }
  return tr;
}

function renderRankDistributionHeadRow(
  minRank, showTotal, baseCellClassname, perColumnClassnames
) {
  const values = [""];
  for (const [minAc, rank] of RANK_THRESHOLDS) {
    values.push(rank);
    if (rank === minRank) {
      break;
    }
  }
  if (showTotal) {
    values.push("TOTAL");
  }
  return _renderRankDistributionRowHelper(
    values, true, showTotal, "", baseCellClassname, perColumnClassnames
  );
}

function renderRankDistributionRow(
  rowHead, rankDist, minRank, showTotal, rowClassname, baseCellClassname, perColumnClassnames
) {
  const values = [rowHead];
  let totalCount = 0;
  for (const [rank, count] of rankDist) {
    values.push(count);
    totalCount += count;
    if (rank === minRank) {
      break;
    }
  }
  if (showTotal) {
    values.push(totalCount);
  }
  return _renderRankDistributionRowHelper(
    values, false, showTotal, rowClassname, baseCellClassname, perColumnClassnames
  );
}

function renderRankDistributionPerLevel(scoreList, thead, tbody) {
  thead.innerHTML = "";
  tbody.innerHTML = "";
  
  const scoresPerLevel = new Map();
  OFFICIAL_LEVELS.forEach((level) => {
    scoresPerLevel.set(level, []);
  });
  scoreList.forEach((record) => {
    const officialLv = record.level || getOfficialLevel(record.innerLv);
    const levelScores = scoresPerLevel.get(officialLv);
    levelScores.push(record);
  });
  
  const overallRankDistribution = getRankDistribution(scoreList);
  let minRank;
  for (const [rank, count] of overallRankDistribution) {
    if (count > 0) {
      minRank = rank;
    }
  }
  thead.appendChild(renderRankDistributionHeadRow(
    minRank,
    false,
    LEVEL_RANK_CELL_BASE_CLASSNAME,
    LEVEL_RANK_CELL_CLASSNAMES
  ));
  for (const [level, levelScores] of scoresPerLevel) {
    if (levelScores.length > 0) {
      const rankDistribution = getRankDistribution(levelScores);
      tbody.appendChild(renderRankDistributionRow(
        level,
        rankDistribution,
        minRank,
        false,
        "",
        LEVEL_RANK_CELL_BASE_CLASSNAME,
        LEVEL_RANK_CELL_CLASSNAMES
      ));
    }
  }
}

function renderRankDistributionPerDifficulty(scoreList, thead, tbody) {
  thead.innerHTML = "";
  tbody.innerHTML = "";
  
  const scoresPerDifficulty = new Map();
  const difficultiesFromHardest = [].concat(DIFFICULTIES);
  difficultiesFromHardest.reverse();
  difficultiesFromHardest.forEach((d) => {
    scoresPerDifficulty.set(d, []);
  });
  scoreList.forEach((record) => {
    const scores = scoresPerDifficulty.get(record.difficulty);
    scores.push(record);
  });
  
  const overallRankDistribution = getRankDistribution(scoreList);
  let minRank;
  for (const [rank, count] of overallRankDistribution) {
    if (count > 0) {
      minRank = rank;
    }
  }
  thead.appendChild(renderRankDistributionHeadRow(
    minRank,
    true,
    DIFF_RANK_CELL_BASE_CLASSNAME,
    [DIFF_RANK_TOP_LEFT_CELL_CLASSNAME]
  ));
  for (const [d, scores] of scoresPerDifficulty) {
    if (scores.length > 0) {
      const rankDistribution = getRankDistribution(scores);
      tbody.appendChild(renderRankDistributionRow(
        d,
        rankDistribution,
        minRank,
        true,
        DIFFICULTY_CLASSNAME_MAP.get(d),
        DIFF_RANK_CELL_BASE_CLASSNAME,
        []
      ));
    }
  }
}
