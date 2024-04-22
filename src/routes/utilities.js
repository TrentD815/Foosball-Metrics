export function calculateStats(gameResults) {
  const teams = {};
  let totalGoals = 0

  gameResults.forEach(result => {
    const scores = result.score.split("-");
    const team1 = result.team1.trim();
    const team2 = result.team2.trim();
    const score1 = parseInt(scores[0]);
    const score2 = parseInt(scores[1]);
    const differential1 = score1 - score2
    const differential2 = score2 - score1
    teams[team1] = (teams[team1] || 0) + score1;
    teams[team2] = (teams[team2] || 0) + score2;
    totalGoals += score1 + score2;
    teams[team1 + "GamesPlayed"] = (teams[team1 + "GamesPlayed"] || 0) + 1;
    teams[team2 + "GamesPlayed"] = (teams[team2 + "GamesPlayed"] || 0) + 1;
    teams[team1 + "Differential1"] = (teams[team1 + "Differential1"] || 0) + differential1;
    teams[team2 + "Differential2"] = (teams[team2 + "Differential2"] || 0) + differential2;

    (team1 === result?.winner)
      ? teams[team1 + "Wins"] = (teams[team1 + "Wins"] || 0) + 1
      : teams[team2 + "Wins"] = (teams[team2 + "Wins"] || 0) + 1

  });

  const teamsArray = Object.keys(teams)
    .filter(key => !key.includes("GamesPlayed") || !key.includes("Differential1") || !key.includes("Differential2") || !key.includes("Wins"))
    .map(team => ({
      team: team,
      goalsScored: teams[team],
      gamesPlayed: teams[team + "GamesPlayed"] || 0,
      goalsPerGame: teams[team] / teams[team + "GamesPlayed"],
      differential: (teams[team + "Differential1"] || 0) + (teams[team + "Differential2"] || 0),
      wins: teams[team + "Wins"] || 0,
      losses: teams[team + "GamesPlayed"] - teams[team + "Wins"],
      winPercentage: (teams[team + "Wins"] / teams[team + "GamesPlayed"]) * 100
  }));
  teamsArray.push({ team: "All Teams", goalsScored: totalGoals, goalsPerGame: 0 });
  teamsArray.sort((a, b) => b.goalsScored - a.goalsScored)

  return teamsArray;
}

export function getTimeDifference(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const difference = end - start
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25
  const yearsDifference = difference / millisecondsInYear
  return Math.round(yearsDifference * 100) / 100
}

export function findSpecialGames(gameResults) {
  let shutouts = []
  let overtimes = []
  gameResults.forEach(game => {
    const scores = game.score.split("-")
    const score1 = parseInt(scores[0])
    const score2 = parseInt(scores[1])
    if (score1 > 10 || score2 > 10) {
      overtimes.push(game)
    }
    if (score1 === 0 || score2 === 0) {
      shutouts.push(game)
    }
  })
  return { shutouts, overtimes }
}
