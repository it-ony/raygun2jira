# Raygun2Jira

![Raygun2Jira Icon](/icon/128.png?raw=true)

A chrome extension to create a [Jira](https://de.atlassian.com/software/jira) issue out 
of your [raygun](https://raygun.io) bug report.
 
## Why not using the Iira integration offered by raygun

Depending on your Jira configuration, the bug creation directly via the raygun integration
might not work. Reasons for that could be that the workflow requires mandatory custom 
fields or even the component to be specified. 

After a lot of playing around with the workflows & jira screens I finally got the 
integration of raygun working, but I was not happy about the result. 

## Features

* Specify the Jira Server, Project and Issue Type as part of the extension options
* Integrate a "Create Jira issue" button into raygun
* Set the raygun application name as jira component for the issue
* Include the stacktrace of raygun directly into the description of the jira issue
* Create the issue under the logged in user 
