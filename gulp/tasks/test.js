const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  camelize: true
});
// const assign = require('lodash/object/assign');
const config = require('../config');
const path = require('path');
const Server = require('karma').Server;

const test = module.exports.test = function (files) {
  // if (process.env.user === 'jenkins' || process.env.USER === 'jenkins') {
  //   config.mocha = assign(config.mocha, {
  //     reporter: 'mocha-jenkins-reporter',
  //     reporterOptions: {
  //       'junit_report_name': 'Tests',
  //       'junit_report_path': 'report.xml',
  //       'junit_report.stack': 1
  //     }
  //   });
  // }

  return gulp.src(files, { read: false })
    .pipe($.mocha(config.mocha));
};

gulp.task('test', ['lint', 'lint-test'], function (done) {
  new Server({
    configFile: path.join(__dirname, '..', '..', 'test', 'karma.conf.js'),
    singleRun: true
  }, function () {
    done();
    process.exit(0);
  }).start();
});

gulp.task('e2e', ['lint', 'lint-test'], function (done) {
  new Server({
    singleRun: true,
    configFile: path.join(__dirname, '..', '..', 'test', 'karma.conf-ci.js'),
  }, function () {
    done();
    process.exit(0);
  }).start();
});

gulp.task('test-store', ['lint', 'lint-test-store'], function () {
  require('babel-register');
  return test(['test/setup.js', 'test/specs/store.spec.js']);
});

// Lint and run legacy tests
gulp.task('test-legacy', ['lint', 'lint-test-legacy'], function () {
  require('babel-register');
  return test(['test/setup.js', config.files.testLegacy]);
});

gulp.task('test-legacy-acl', ['lint', 'lint-test-legacy-acl'], function () {
  require('babel-register');
  return test(['test/setup.js', 'test/legacy/acl.spec.js']);
});

gulp.task('test-legacy-datastore', ['lint', 'lint-test-legacy-datastore'], function () {
  require('babel-register');
  return test(['test/setup.js', 'test/legacy/datastore.spec.js']);
});

gulp.task('test-legacy-file', ['lint', 'lint-test-legacy-file'], function () {
  require('babel-register');
  return test(['test/setup.js', 'test/legacy/file.spec.js']);
});

gulp.task('test-legacy-user', ['lint', 'lint-test-legacy-user'], function () {
  require('babel-register');
  return test(['test/setup.js', 'test/legacy/user.spec.js']);
});