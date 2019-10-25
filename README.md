Required Features 🎯
[ ] The user can enter a repository in a search bar, click "search", and see the associated issues. The repository should be of the format owner/repo-name, e.g. facebook/react.
[ ] If the repository does not exist, the user should see a proper error message.
[ ] The user should be able to see the following information for each issue:

       [x] Issue Title * Number of the issue
       [x] Owner of the Issue
       [x] Owner Avatar * How long ago the issue was created in a human-friendly format (e.g. 2 days ago)
       [x] Body of the Issue
       [x] Label - note the color as returned by the API.
       [x] State of Issue (Open/Closed).
        The user should be able to see multiple pages of results, by clicking a pagination control.

[x] The user should be able to see the body of the issue rendered in markdown.
[ ] The user should be able to create a new issue via a modal for the repository, by clicking on a "new issue" button. Clicking on this button will pop open a modal that asks for the requisite fields.
[ ] If there is an error creating the issue (for example, the user not supplying all required parameters), there should be a nice error message to the user.