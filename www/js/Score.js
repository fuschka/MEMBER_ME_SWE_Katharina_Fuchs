/**
 * Class gives you a Score object.
 * You can read the score and update it.
 */
class Score {

    /**
     * Initialsize currentScore with 0.
     * 
     *  @param {String} tagId Id for the HTML-tag to display the score.
     */
    constructor(tagId) {
        this.currentScore = 0;
        this.tagId = tagId;
    }

    /**
     * Funciton to update the score.
     * 
     * @param {number} changeType Must be 0 or 1. 0 will reset the score to 0. 1 will increase the score by 1.
     */

    updateScore(changeType) {
        switch (changeType) {
            case 0:
                this.currentScore = 0;
                this.displayScore();
                break;
            case 1:
                this.currentScore++;
                this.displayScore();
                break;
            default: console.log("Error");
        }


    }

    /**
     * Displays the score in an HTML-tag. 
     */
    displayScore() {
        $("#" + String(this.tagId)).html(String(this.currentScore)).bind(this);
    }
}