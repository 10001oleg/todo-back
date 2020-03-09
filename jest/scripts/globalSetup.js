/* eslint-disable import/no-extraneous-dependencies */
/* Global setup modle.
 **
 ** This module exports an async function that is triggered
 ** once before all test suites.
 **
 */

const chalk = require('chalk');
const path = require('path');
const mongoUnit = require('mongo-unit');
const mongoose = require('mongoose');

// Load dotenv
require('dotenv').config({ path: path.resolve('.env.test') });

module.exports = async function () {
    await mongoUnit.start({
        port:   37173,
        dbName: 'test',
    });

    process.env.DATABASE_URL = mongoUnit.getUrl();
    console.log(chalk.green('λ'));
    global.t = 'hello';
};
