# OMNI KIB

### Built With

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Amplify](https://docs.amplify.aws/)
- [GraphQL](https://graphql.org/)

### Environment Setup

1. Install [Homebrew](https://brew.sh/)
   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install [Node](https://nodejs.org/en/)

   ```sh
   brew install node
   ```

   If you have already installed Node on your system, make sure it is Node 12 or newer.

   **Recommended:** Use Yarn over NPM.
   Install [Yarn](https://yarnpkg.com/)

   ```sh
   npm install -g yarn
   ```

3. Install [Watchman](https://facebook.github.io/watchman/)
   ```sh
   brew install watchman
   ```
4. Install [Xcode](https://developer.apple.com/xcode/)
   You can download it from [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12).

   **Command Line Tools**
   Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

5. Install [Cocoapods](https://cocoapods.org/)
   ```sh
   sudo gem install cocoapods
   ```

## Running the App

1. Clone the repo

   ```sh
   git clone https://github.com/regovtech/omni-onboarding-tablet.git
   ```

2. Install NPM packages

   ```sh
   yarn
   ```

3. Install pods

   ```
   yarn install:pods
   ```

   #### You will see all the scripts [here](#scripts).

4. Run the app

   ```
   yarn ios
   ```

## Git Branches

| Branch                 | Description                                                                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| master                 | This branch contains the Production code                                                                                                                                                                                              |
| develop                | This branch contains the SIT code                                                                                                                                                                                                     |
| staging                | This branch contains the Staging code                                                                                                                                                                                                 |
| pre-production         | This branch contains the Production code. All updates needed for **master** branch should be done here                                                                                                                                |
| release/vX.X.X-sit     | This branch contains the build for SIT, it branches out of develop                                                                                                                                                                    |
| release/vX.X.X-uat     | This branch contains the build for UAT, it branches out of the corresponding version of SIT                                                                                                                                           |
| release/vX.X.X-staging | This branch contains the build for Staging or Non-Production. All staging releases should have the ATS NSAllowsArbitraryLoads set to false and NSExceptionDomains set to empty                                                        |
| release/vX.X.X         | This branch contains the build for Production. All production releases should have the ATS NSAllowsArbitraryLoads set to false and NSExceptionDomains set to empty                                                                    |
| feature/               | This branch contains all the updates needed for a specific branch. Your feature branch must branch out of the branch that you are working on. Pushing directly to the main branches are strictly prohibited unless definitely needed. |

## Installing & Configuring the Amplify

1. Install AWS Amplify CLI
   ```sh
   sudo npm install -g @aws-amplify/cli
   ```
2. Configure Amplify

   ```sh
   amplify configure
   ```

   It is required to have an AWS Account. Skip the web sign-in and continue with the CLI

   ```sh
   # Specify the AWS Region
   region: (ap-southeast-1)

   # Specify the username of the new IAM user:
   user name: [skip this step and skip the sign-in again]

   # Enter the access key of the newly created user:
   accessKeyId: [your access key]
   secretAccessKey: [your secret key]

   # This would update/create the AWS Profile in your local machine
   Profile Name: [enter your desired name]

   ```

3. Initialize Amplify

   ```sh
   amplify init
   ```

   When you first initialize Amplify you'll be prompted for some information about the app:

   ```sh
   Enter a name for the project (omni-onboarding-tablet)

   # List of available environments: dev, sit, uat, staging, and production
   Enter a name for the environment (dev)

   # Sometimes the CLI will prompt you to edit a file, it will use this editor to open those files.
   Choose your default editor (vscode)

   # Amplify supports JavaScript (Web & React Native), iOS, and Android apps
   Choose the type of app that you are building (typescript)

   What JavaScript framework are you using (react)

   Source directory path (src)

   Distribution directory path (build)

   Build command (npm run build)

   Start command (npm start)

   # This is the profile you created with the `amplify configure` command in the introduction step.
   ```

   When you already initialized Amplify but want to use a new or existing environment

   ```sh
   # Do you want to use an existing environment? (Y/n)
   Yes - Choose the environment you would like to use
   No - Enter a name for the environment

   # If you haven't used the environment before, you will need to be authenticated
   # Select the authentication method you want to use: (Use arrow keys)
   AWS profile - If you have not setup your AWS profile. Make sure you have your correct access and secret keys.
   AWS access keys - Please choose the profile you want to use.
   ```

## Switching Environments

1. Check out to your desired [branch](#git-branches). We will be switching to SIT for this example.

   ```sh
   git checkout develop
   ```

   Make sure you have the latest code.

2. Run the script to change to your desired environment. Make sure you have properly configured your AWS profile.

   ```sh
   yarn env:change:sit
   ```

   #### You will see all the scripts [here](#scripts).

   After successfully adding the AppSync Backend, you will be asked for some information

   ```sh
   # Choose the code generation language target (Use arrow keys)
   typescript

   # Enter the file name pattern of graphql queries, mutations and subscriptions
   [remove the default name and press enter]

   # Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions (Y/n)
   n

   # Enter the file name for the generated code
   [remove the default name and press enter]

   # Do you want to generate code for your newly created GraphQL API (Y/n)
   n
   ```

   From all the files generated, we only need the **schema.json**. Delete all other files like mutations, queries, and subscriptions. We are using our own GraphQL query strings which can be found in `src/integrations/graphql`

## Pulling the Backend Schema

1. Make sure you are in the correct branch and amplify environment.

   To check for the current environment:

   ```sh
   amplify env list
   ```

   To get the latest AppSync schema from backend

   ```sh
   amplify codegen
   ```

   From all the files generated, we only need the **schema.json**. Delete all other files like mutations, queries, and subscriptions. We are using our own GraphQL query strings which can be found in `src/integrations/graphql`

## Updating the Version

We are using [Semantic Versioning](https://semver.org/) for our version number. Updating the version is important when creating a new build since it is being used as one of its identifier.

Our `bump` scripts are working but only if the version in the `package.json` are all numbers. Since we are now using `-sit`, `-uat`, `-staging`, and `-dev` as our pre-release labels, we need to manually update the version number.

After manually updating the version number using [Semantic Versioning](https://semver.org/) principles, we need to run the following script:

```sh
yarn bump-manual
```

## Creating a Build

To create an iOS build, we will be using [Xcode](https://developer.apple.com/xcode/) and its native process of build creation.

1. Open the project's xcworkspace in Xcode and wait for the `Indexing` to finish

2. Clean Build Folder

3. Make sure the Build Confirmation for Archive is **Release**

   To check for the Build Configuration go to `Product > Scheme > Edit Scheme > Archive`

4. You need to make sure that the **NSAllowsArbitraryLoads** is set to `false` and there is no **NSExceptionDomains**. You can find this in `Project > Info > App Transport Security Settings`. This is a must for Staging and Production Build but optional for the others.

5. Archive project

   To archive the project, go to `Product > Archive`

6. Once archiving has finished, distribute the app
7. Select Ad Hoc as method of distribution then click Next
8. Make sure your distribution certificate and profile are correct before proceed
9. Wait for the distribution to finish

## Scripts

We have created scripts to make your lives easier.

**Scripts for installation, cleaning and building**
| Script | Command |
| ------ | ------ |
| `clean:ios` | `npm run clean:pods && cd ios && rm -rf build` |
| `clean:modules` | `rm -rf node_modules && yarn` |
| `format_all` | `prettier --write \"{src,tests}/**/*.{tsx,ts,json,js,jsx}\"` |
| `install:pods` | `cd ios && pod install` |
| `remove:ios:build` | `cd ios && rm -rf build` |

**Scripts for running the app**
| Script | Command |
| ------ | ------ |
|`ios` | `react-native run-ios --simulator=\"iPad (7th generation)\"`|
|`ios:7` | `react-native run-ios --simulator=\"iPad (7th generation)\"`|
|`ios:8` | `react-native run-ios --simulator=\"iPad (8th generation)\"`|
|`ios:15` | `react-native run-ios --simulator=\"iPad (9th generation)\"`|
|`ios:air:3` | `react-native run-ios --simulator=\"iPad Air (3rd generation)\"`|
|`ios:air:4` | `react-native run-ios --simulator=\"iPad Air (4th generation)\"`|
|`ios:pro:9` | `react-native run-ios --simulator=\"iPad Pro (9.7-inch)\"`|
|`ios:pro:10` | `react-native run-ios --simulator=\"iPad Pro (10.5-inch)\"`|
|`ios:pro:11:2` | `react-native run-ios --simulator=\"iPad Pro (11-inch) (2nd generation)\"`|
|`ios:pro:12` | `react-native run-ios --simulator=\"iPad Pro (12.9-inch) (4th generation)\"`|
|`ios:device` | `react-native run-ios --device`|

_Notes:_

_\*Make sure that the simulator you are trying to run has the same name as the command._

_\*\*You have to install [ios-deploy](https://www.npmjs.com/package/ios-deploy) to run the app on your device from the CLI._

**Scripts for fixes**
| Script | Command |
| ------ | ------ |
|`fix:collapsible:js` | `cp ./fixes/react-native-collapsible--collapsible ./node_modules/react-native-collapsible/Collapsible.js`|
|`fix:collapsible:accordion` | `cp ./fixes/react-native-collapsible--accordion ./node_modules/react-native-collapsible/Accordion. js`|
|`fix:collapsible` | `npm run fix:collapsible:js && npm run fix:collapsible:accordion`|
|`fix:react-native-image` | `npx react-native-fix-image`|
|`fix:modules` | `npm run fix:react-native-image && npm run fix:collapsible`|
|`postinstall` | `npm run fix:modules`|

_Notes:_

_\*Our packages are using specific versions so the fixes were made for the version that we are using. The Package Contributors or React Native Team may have fixed these issues in their newer versions._

_\*\*Fixes are being run using_ `npm run fix:modules` _every time you install the packages using_ `postinstall`.

**Scripts for versioning**
| Script | Command |
| ------ | ------ |
|`bump-patch`| `npm version patch --no-git-tag-version && bundle exec fastlane bump`|
|`bump-minor`| `npm version minor --no-git-tag-version && bundle exec fastlane bump`|
|`bump-major`| `npm version major --no-git-tag-version && bundle exec fastlane bump`|
|`bump-manual`| `bundle exec fastlane bump`|

**Scripts for changing environment**
| Script | Command |
| ------ | ------ |
|`amplify:remove` |`amplify codegen remove`|
|`amplify:change:dev` |`amplify codegen remove && amplify env checkout dev`|
|`amplify:change:prod` |`amplify codegen remove && amplify env checkout prod`|
|`amplify:change:sit` |`amplify codegen remove && amplify env checkout sit`|
|`amplify:change:staging` |`amplify codegen remove && amplify env checkout staging`|
|`amplify:change:uat` |`amplify codegen remove && amplify env checkout uat`|
|`amplify:set:dev` |`amplify add codegen --apiId rywhnkwdhfadriy4tzrfiv65xu`|
|`amplify:set:prod` |`amplify add codegen --apiId 23maelras5b6zosa23ejo4gr24`|
|`amplify:set:sit` |`amplify add codegen --apiId u4agpiyz7vd27lhuveaynighre`|
|`amplify:set:staging` |`amplify add codegen --apiId vzxzoyijenh73djnfdyabbyeqm`|
|`amplify:set:uat` |`amplify add codegen --apiId 3cyv3st2r5gm5ely5cfdyzretu`|
|`env:set:dev` |`dot-json package.json environment \"dev\"`|
|`env:set:prod` |`dot-json package.json environment \"prod\"`|
|`env:set:sit` |`dot-json package.json environment \"sit\"`|
|`env:set:staging` |`dot-json package.json environment \"staging\"`|
|`env:set:uat` |`dot-json package.json environment \"uat\"`|
|`env:change:dev` |`npm run env:set:dev && npm run amplify:change:dev && npm run amplify:set:dev`|
|`env:change:prod` |`npm run env:set:prod && npm run amplify:change:prod && npm run amplify:set:prod`|
|`env:change:sit` |`npm run env:set:sit && npm run amplify:change:sit && npm run amplify:set:sit`|
|`env:change:staging` |`npm run env:set:staging && npm run amplify:change:staging && npm run amplify:set:staging`|
|`env:change:uat` |`npm run env:set:uat && npm run amplify:change:uat && npm run amplify:set:uat`|

## VSCode Extensions

**To have the same VSCode settings across all developers, it is recommended to have the following extensions:**

1. Better Comments
2. Bracket Pair Colorizer
3. Code Spell Checker
4. ES7 React/Redux/GraphQL/React-Native snippets
5. ESLint
6. GitLens — Git supercharged
7. JavaScript (ES6) code snippets
8. Node.js Modules Intellisense
9. Path Autocomplete
10. Path Intellisense
11. Prettier - Code formatter
12. React Native Snippet
13. React-Native/React/Redux snippets for es6/es7
14. Simple React Snippets
15. TODO Highlight
16. TSLint
17. TypeScript Hero
