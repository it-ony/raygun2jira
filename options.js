var serverElement   = document.querySelector('#server'),
    projectsElement = document.querySelector('#projects'),
    issueTypeElement = document.querySelector('#issueTypes'),
    save = document.querySelector('#save'),
    projects;

serverElement.addEventListener('blur', refreshProjects);
save.addEventListener('click', saveSettings);
document.addEventListener('DOMContentLoaded', loadSettings);
projectsElement.addEventListener('change', updateIssueTypes);

function clearSelect(select) {
    while (select.childNodes.length) {
        select.removeChild(select.childNodes[0]);
    }
}

function updateIssueTypes() {
    clearSelect(issueTypeElement);

    var project = projects[projectsElement.selectedOptions[0].value];
    project && project.issuetypes.forEach(issueType => {
        var option = document.createElement('option');
        option.value = issueType.id;
        option.innerText = issueType.name;

        issueTypeElement.appendChild(option);
    });
}

function saveSettings() {
    chrome.storage.sync.set({
        server: serverElement.value,
        projectId: (projectsElement.selectedOptions[0] || {}).value,
        issueTypeId: (issueTypeElement.selectedOptions[0] || {}).value
    }, function() {
        save.textContent = 'Saved!';

        setTimeout(function() {
            save.textContent = 'Save';
        }, 1000);
    });
}

function loadSettings() {
    chrome.storage.sync.get({
        server: '',
        projectId: null,
        issueTypeId: null
    }, function(data) {

        serverElement.value = data.server;

        if (data.server) {
            refreshProjects(() => {
                projectsElement.value = data.projectId;
                updateIssueTypes();
                issueTypeElement.value = data.issueTypeId;
            });
        }

    });
}


function refreshProjects(callback) {

    var server = serverElement.value;
    var url = server.replace(/\/$/, '') + '/rest/api/2/issue/createmeta';

    clearSelect(projectsElement);

    fetch(new Request(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        cache: 'default'
    }))
    .then(response => {
        return response.json();
    })
    .then(meta => {

        var option = document.createElement('option');
        option.innerText = '(select project)';
        projectsElement.appendChild(option);

        projects = {};

        meta.projects.forEach(project => {
            var option = document.createElement('option');
            option.value = project.key;
            option.innerText = project.name;

            projects[project.key] = project;
            projectsElement.appendChild(option);
        });

        callback instanceof Function && callback(null);

    })
    .catch(e => callback instanceof Function && callback(e));

}