/**
 * Provides several animations for the game.
 * If desired, change the functions displayFail(failCount), displayFailReset() and lostAnimation() to your own needs.
 */
class Animation {

    /**
     * Not much going on here. 
     * 
     * @param {number} maxFails Maximum number of fails before game is lost
     */

    constructor(maxFails) {
        this.maxFails = maxFails;
    }
    /**
     * Displays a failed move. HTML id is 'dot' + failCount. 
     * 
     * @param {number} failCount number of current failed moves
     */
    displayFail(failCount) {
        $("#dot" + String(failCount)).css("background-color", "#201626").bind(this);
    }

    /**
     * Resets the failed moves animaton to 0. HTML id is 'dot' + failCount.
     */
    displayFailReset() {
        for (let i = 1; i <= this.maxFails; i++)
            $("#dot" + String(i)).css("background-color", "#f2f2f2").bind(this);
    }

    /**
     * An animation that display a message that you've lost the game.
     * id of the HTML tag holding the message is 'lost'.
     */
    lostAnimation() {
        $("#lost").css("z-index", "100");

        $("#lost").fadeTo(500, 1, function () {
            setTimeout(
                function () {
                    $("#lost").fadeTo(50, 0, function () {
                        $("#lost").css("z-index", "-1");
                    });
                }, 950);

        });
    }
}