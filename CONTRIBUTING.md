## CONTRIBUTING

Prior to completion, contributions to this project are limited to Grocery team members only. This includes:

    * Aaron Cronin
    * Michael Del Casino
    * Francisco Pardo
    * Heorhii Skovorodnikov

## Git Workflow

We will follow [this style of feature branching](https://knowledge.kitchen/Feature_branch_version_control_workflow)

    1. Create new branch for each issue/feature to be worked on using the example linked herein.
    2. Checkout branch locally to ensure changes made to that branch.
    3. Add, commit, push changes to feature branch.
    4. Issue a pull request to have your changes queued for merge into the trunk.

## Our Team Expectations & Norms

    * Complete work in a timely manner.
    * Communicate effectively with team members.
    * Ask teammates for help when you feel it is needed.
    * Help teammates when necessary.
    * Check Slack on a regular basis.
    * Standups on Mondays and Wednesdays at 1:47pm

## Conflict Resolution

    * Majority rules.

## Values

The Grocery Team pledges to abide by the [NYU Student Conduct Policy](https://www.nyu.edu/about/policies-guidelines-compliance/policies-and-guidelines/university-student-conduct-policy.html) and the Team Expecations & Norms listed above. The team will foster an environment that allows for and encourages team members to share opinions on the project to ensure that everyone's voice is heard evenly. Additionally, for emphasis, the team expects all members to reguraly check Slack to ensure that issues are resolved promptly. 

## Building/Running (AWS)
* For the sake of the professor testing our code, we were able to get our repo running on AWS. This facilitates the 
building/running a whole lot. To run and test our code, all you would need to do is:

- Create a Telegram account if you do not already have one
 - Add `@BuyStuffBot` as a contact 
 - Once the bot is running, text it `/start` to start the bot
 - Text the bot `/help` to see the list of commands and their formats


## Building/Running (Without AWS)
* This would be the method to build/run the program on your own personal machine.

 - Install node 
 - Change the token string on line 25 of `bot/src/index.js` to the title of [issue #154](https://github.com/nyu-software-engineering/fall-2019-groceries/issues/154) in the repo. Current token: 708748902:AAGVilrBBpoXWlAt3c_hvAAvQ61hN-8PeYA. 
 - Start the Telegram bot in it's own process/terminal with `cd bot/src; node index.js`
 - Start the Mongo server in it's own process/terminal with `cd backend; nodemon server`
 - If either of the above steps fail due to dependency issues, run the following package installs (from our `.travis.yml`):
 
 ```
 - npm install --save-dev nyc mocha nodemon sinon mongoose request
 - cd backend; npm install --save-dev nodemon
 - cd ../productSearch; npm install --save-dev nyc mocha xmlhttprequest
 - cd ../productOrder; npm install --save-dev nyc mocha xmlhttprequest
 - cd ../bot; npm install --save-dev nyc mocha node-telegram-bot-api xmlhttprequest
 ```
 
 - Create a Telegram account if you do not already have one
 - Add `@BuyStuffBot` as a contact 
 - Once the bot is running, text it `/start` to start the bot
 - Text the bot `/help` to see the list of commands and their formats
