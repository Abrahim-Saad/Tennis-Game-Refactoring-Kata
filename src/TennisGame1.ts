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
    const player1: string = 'player1';
    if (playerName === player1)
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
    
    if (this.bothScoresAreEqual(m_score1, m_score2)) return this.calculateScoreWhenBothScoresAreEqual(m_score1, score);

    if (this.oneScoreIsAtLeast4(m_score1, m_score2)) return this.calculateScoreWhenOneScoreIsAtLeast4(m_score1, m_score2, score);
    
    for (let i = 1; i < 3; i++) {
      if (i === 1) tempScore = m_score1;
      else { score += '-'; tempScore = m_score2; }
      switch (tempScore) {
        case 0:
          score += 'Love';
          break;
        case 1:
          score += 'Fifteen';
          break;
        case 2:
          score += 'Thirty';
          break;
        case 3:
          score += 'Forty';
          break;
      }
    }

    return score;
  }


  bothScoresAreEqual(m_score1: number, m_score2: number): boolean {
    return m_score1 === m_score2;
  }


  oneScoreIsAtLeast4(m_score1: number, m_score2: number): boolean {
    return m_score1 >= 4 || m_score2 >= 4;
  }


  calculateScoreWhenBothScoresAreEqual(m_score: number, score: string): string {
    switch (m_score) {
      case 0:
        score = ScoreEnums.LOVE_ALL;
        break;
      case 1:
        score = ScoreEnums.FIFTEEN_ALL;
        break;
      case 2:
        score = ScoreEnums.THIRTY_ALL;
        break;
      default:
        score = ScoreEnums.DEUCE;
        break;

    }
    return score;
  }


  calculateScoreWhenOneScoreIsAtLeast4(m_score1: number, m_score2: number, score: string): string {
    const minusResult: number = m_score1 - m_score2;
    if (minusResult === 1) score = 'Advantage player1';
    else if (minusResult === -1) score = 'Advantage player2';
    else if (minusResult >= 2) score = 'Win for player1';
    else score = 'Win for player2';
    return score;
  }


}