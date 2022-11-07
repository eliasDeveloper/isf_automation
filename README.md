# Automated Testing
Siren Automated Testing

# Clone the project
git clone https://github.com/sirenanalytics/automated_testing.git

# Setup your Github branch
git checkout develop
git branch -c your-branch-name
git checkout branch-name
git pull
git add .
git commit -m "my first commit"
git push origin HEAD

# Setup WebdriverIO configuration
npm install @wdio/cli
npx wdio config --yes

# Run all your test files
npx wdio run ./wdio.conf.js

# Run one specific test file
npx wdio run ./wdio.conf.js --spec file-name.js

# Naming conventions
# Directories naming convention
- In pageobjects and utilities directory, all sub-directories should be declared using small caps, and if it consists of two or more words a "-" should be used between ex: Map-Page
JavaScript files in the utilities directory should be declared in small caps, and if it consists of two or more words a "-" should be used between ex: helper-functions.js
JavaScript files in the pageobjects directory should be written with a .page.js extension ex: login.page.js or main.map.page.js 
-In the specs directory all directories and JavaScript files should  be declared in big caps and if it consists of two or more words a "-" should be placed in between ex: Incident-Test-Suites  Create-New-Incident.js

# Variables naming convention
if a variable consist of one word then the variable should be written in small caps ex: name
else if a variable consists of two or more word then each word after the initial one should start with a big cap ex: firstName, lastName 
