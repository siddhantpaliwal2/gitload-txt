#!/usr/bin/env node

const { generateRepoSummary } = require('../src/repoProcessor');

const repoUrl = process.argv[2];

if (!repoUrl) {
    console.error('Please provide a GitHub repository URL');
    console.error('Usage: repo-summarize https://github.com/user/repo');
    process.exit(1);
}

generateRepoSummary(repoUrl)
    .then(summary => {
        console.log(summary);
    })
    .catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
    }); 