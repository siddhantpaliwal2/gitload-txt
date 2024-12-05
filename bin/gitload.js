#!/usr/bin/env node

const { generateRepoSummary } = require('../src/repoProcessor');

const repoUrl = process.argv[2];

if (!repoUrl) {
    console.error('Please provide a GitHub repository URL');
    console.error('Usage: gitload https://github.com/user/repo');
    process.exit(1);
}

// Using async IIFE to properly handle the promise
(async () => {
    try {
        await generateRepoSummary(repoUrl);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
})(); 