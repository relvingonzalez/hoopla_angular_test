# hoopla_angular_test

This is a sample Angular project that you can use as the basis for your Hoopla interview project.

Your task is to make a web app that interacts with the Hoopla API in order to display a list of Metrics and allow values to be changed.

This app should start by fetching and displaying the list of configured metrics. Clicking on an item in the metrics list should take you to a page where metric values are listed for all the users in the organization (even if the user does not have a value set). Clicking a user row should enable the metric value to be edited. There should be a mechanism to save the value or cancel. After the value is saved, the user list should be redisplayed, showing the updated value. There should be a way to return to the metric list.

The code around OAuth token handling is already done for you, as is a first basic model, controller, and view to fetch and display the list of metrics.

A functioning app is a requirement, but you can get style points for an app that really works well from a UX perspective, has good test coverage, and is generally easy for another programmer to understand.

## Instructions

### Hoopla setup
1. Sign up for an account at https://app.hoopla.net/
1. After confirming your email and setting your password, be sure to enable the Jumpstart data to make things easier.
1. Go to the Settings page (https://app.hoopla.net/configuration/settings) and provision an API Key. Make note of the Client ID and Secret.

### Now to the code...
1. Fork this repo and clone it onto your local machine.
1. Edit the file src/app/index.js and fill in your Client ID and Secret values.
1. Install node.js (https://nodejs.org/)
1. Run `npm install`
1. Run `bower install`
1. Run `gulp serve`
1. A browser window should open after the web server starts and you should see your app. If the list of metrics does not appear, check the javascript console.
1. Add the necessary models, views, and controllers to the project to complete the task. The Hoopla API docs may be found at https://developer.hoopla.net/.
1. Get in touch with your contact at Hoopla once you're done so we can review it and set up a followup conversation.

Happy hacking!
