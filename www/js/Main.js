/* Create a game */

$(document).ready(function () {

    const maxFails = 4;
    /* Create Array of relative paths to the image sources for card backs*/
    const ImgSources = ["img/cards/01Card.png", "img/cards/02Card.png", "img/cards/03Card.png", "img/cards/04Card.png", "img/cards/05Card.png",
        "img/cards/06Card.png", "img/cards/07Card.png", "img/cards/08Card.png", "img/cards/09Card.png", "img/cards/10Card.png"]

    /* Objects needed by Game*/
    const CA = new CardAssigner(8, ImgSources);
    const HS = new HighScore("Highscore");
    const S = new Score("score");
    const A = new Animation(maxFails);

    /* The Game */
    const myGame = new Game(maxFails, HS, S, CA, A);
});