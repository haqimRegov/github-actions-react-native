/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
const sonarqubeScanner = require("sonarqube-scanner");
const { version } = require("./package.json");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.sources": ".",
      "sonar.inclusions": "src/**",
      "sonar.exclusions": "src/mocks/**, src/graphql/**, src/store/**, src/icons/**",
      "sonar.projectVersion": version,
      "sonar.tests": "__tests__",
      "sonar.testExecutionReportPaths": "test-report.xml",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.scm.disabled": "false",
    },
  },
  () => {},
);
