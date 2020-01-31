class Animation {

    displayFail(failCount) {
        $("#dot" + String(failCount)).css("background-color", "#201626").bind(this);
    }

    displayFailReset() {
        for (let i = 1; i < 5; i++)
            $("#dot" + String(i)).css("background-color", "#f2f2f2").bind(this);
    }

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