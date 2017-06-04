(function(window, chrome) {

    function waitForToolBar (callback) {
        var toolBar = document.querySelector(".ei-header-secondary div");

        if (toolBar) {
            return callback && callback(null, toolBar);
        }

        setTimeout(function() {
            waitForToolBar(callback);
        }, 250);

    }

    waitForToolBar(function(err, toolBar) {
        var btn = document.createElement("div");
        btn.className = "ei-header-button-container";
        btn.innerHTML = '<a class="ei-header-btn"><span>Create Jira Issue</span></a>';

        var gotoJira = document.createElement("a");
        gotoJira.className = "ei-header-button-container ei-header-btn";


        toolBar.prepend(btn);


        btn.onclick = function() {

            var component = document.querySelector(".header-button-application__text").textContent.trim();
            var summary = document.querySelector(".ei-header-title").textContent.trim();

            var stackTrace = Array.prototype.slice.call(document.querySelectorAll(".js-stacktrace-container-region .js-stacktrace-info-text")).map(function(l) {
                return l.textContent
            }).join("");


            var description = [
                "See " + window.location.href  + " for full details",
                "{code}\n" + stackTrace + "\n{code}"
            ].map(function(s) {
                return s || "";
            }).join("\n\n");

            chrome.runtime.sendMessage({
                    component: component,
                    summary: summary,
                    description: description
                },
                function(response) {

                    debugger;

                    if (response) {
                        try {
                            response = JSON.parse(response);
                        } catch (e) {
                        }
                    }

                    if (response && !response.error) {
                        btn.parentNode.removeChild(btn);
                        toolBar.prepend(gotoJira);
                        gotoJira.href = "https://jira.spreadomat.net/browse/" + response.key;
                        gotoJira.textContent = response.key;
                    } else if (!response.showSettings) {
                        alert(response ? response.error : "unknown error");
                    }
                });

        };

    });

})(window, chrome);