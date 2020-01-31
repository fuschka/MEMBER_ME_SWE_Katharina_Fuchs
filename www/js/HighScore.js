/**
 * Class gives you a HighScore object.
 * You can read the highscore and update it.
 * The class uses localStorage. 
 */
class HighScore {

    /**
     * Reads the currentHighScore from localStorage
     * 
     * @param {String} highscoreTagName id of HTML-tag holding the highscore
     */
    constructor(highscoreTagName) {
        this.highscoreTagName = highscoreTagName;
        this.currentHighScore = localStorage.getItem("Highscore");
    }

    /**
     * Compares currentHighScore to the score achieved in the most recently lost game
     * and decides which one is higher. The higher Value will be the new currentHighScore
     * in localStorage
     * 
     * @param {number} gameScore The score achieved in the most recently lost game
     */
    updateHighScore(gameScore) {
        if (gameScore > this.currentHighScore) {
            this.currentHighScore = gameScore;
            localStorage.setItem("Highscore", String(this.currentHighScore));
        }
    }

    /**
     * Manipulates HTML through highscoreTagName to display the highscore
     * from localStorage.
     */
    displayHighScore() {
        if (localStorage.length == 0) {
            $("#" + String(this.highscoreTagName)).html(String(0));
        }
        else {
            $("#" + String(this.highscoreTagName)).html(localStorage.getItem("Highscore"));
        }
    }
}