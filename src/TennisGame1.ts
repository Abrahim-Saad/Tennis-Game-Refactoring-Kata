import { TennisGame } from './TennisGame';
import { ScoreEnums } from './ScoreEnums';

export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }


  wonPoint(playerName: string): void {
    const PLAYER_1: string = 'player1';
    if (playerName === PLAYER_1)
      this.m_score1 += 1;
    else
      this.m_score2 += 1;
  }

  
  getScore(): string {
    return this.calculateScore(this.m_score1, this.m_score2);
  }


  calculateScore(m_score1: number, m_score2: number): string {
    let score: string = '';
    let tempScore: number = 0;
    const players = [{ FIRST_PLAYER: 1 }, { SECOND_PLAYER: 2 }];

    if (this.bothScoresAreEqual(m_score1, m_score2)) return this.calculateScoreWhenBothScoresAreEqual(m_score1);

    if (this.oneScoreIsAtLeast4(m_score1, m_score2)) return this.calculateScoreWhenOneScoreIsAtLeast4(m_score1, m_score2);

    players.forEach((player) => {
      if (player.FIRST_PLAYER) tempScore = m_score1;
      else { score += '-'; tempScore = m_score2; }
      score += this.mapTempScoreToTerm(tempScore);
    });
    return score;
  }


  bothScoresAreEqual(m_score1: number, m_score2: number): boolean {
    return m_score1 === m_score2;
  }


  oneScoreIsAtLeast4(m_score1: number, m_score2: number): boolean {
    return m_score1 >= 4 || m_score2 >= 4;
  }


  calculateScoreWhenBothScoresAreEqual(m_score: number): string {
    let scoreTerm = this.mapScoreToTermWhenBothScoresAreEqual(m_score);
    if (!scoreTerm) scoreTerm = ScoreEnums.DEUCE;
    return scoreTerm;
  }


  calculateScoreWhenOneScoreIsAtLeast4(m_score1: number, m_score2: number): string {
    const minusResult: number = m_score1 - m_score2;
    if (minusResult === 1) return ScoreEnums.ADVANTAGE_PLAYER1;
    if (minusResult === -1) return ScoreEnums.ADVANTAGE_PLAYER2;
    if (minusResult >= 2) return ScoreEnums.WIN_FOR_PLAYER1;
    return ScoreEnums.WIN_FOR_PLAYER2;
  }


  mapScoreToTermWhenBothScoresAreEqual(score: number): string {
    const scoreTerms: { [scoreValue: number]: string } = {
      0: ScoreEnums.LOVE_ALL,
      1: ScoreEnums.FIFTEEN_ALL,
      2: ScoreEnums.THIRTY_ALL,
      3: ScoreEnums.DEUCE
    };
    return scoreTerms[score];
  }


  mapTempScoreToTerm(tempScore: number): string {
    const scoreTerms: { [scoreValue: number]: string } = {
      0: ScoreEnums.LOVE,
      1: ScoreEnums.FIFTEEN,
      2: ScoreEnums.THIRTY,
      3: ScoreEnums.FORTY
    };
    return scoreTerms[tempScore];
  }
}