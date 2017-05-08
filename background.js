chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    chrome.storage.sync.get({
        server: '',
        projectId: null,
        issueTypeId: null
    }, function(data) {
        if (!(data.server && data.projectId && data.issueTypeId)) {

            chrome.runtime.openOptionsPage();

            return sendResponse(JSON.stringify({
                error: 'Server not defined',
                showSettings: true
            }));
        }

        var xhr = new XMLHttpRequest();

        xhr.open('POST', data.server.replace(/\/$/, "") + '/rest/api/2/issue/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status == 201) {
                    sendResponse(xhr.responseText);
                } else {
                    sendResponse(JSON.stringify({
                        error: xhr.responseText || xhr.status || true
                    }));
                }

            }
        };

        xhr.send(JSON.stringify({
            fields: {
                project: {
                    key: data.projectId
                },
                summary: request.summary,
                description: request.description,
                issuetype: {
                    id: data.issueTypeId
                },
                components: [{
                    name: request.component
                }]
            }
        }));
    });



    return true;

});

