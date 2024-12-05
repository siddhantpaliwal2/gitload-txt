const fs = require('fs').promises;
const path = require('path');
const { isBinaryFile } = require('isbinaryfile');
const download = require('download-git-repo');
const { promisify } = require('util');
const tmp = require('tmp-promise');

const downloadRepo = promisify(download);

async function generateRepoSummary(repoUrl) {
    // Create temporary directory
    const tmpDir = await tmp.dir({ unsafeCleanup: true });
    
    try {
        // Convert GitHub URL to the format required by download-git-repo
        const repoPath = repoUrl
            .replace('https://github.com/', '')
            .replace('.git', '');

        // Extract repo name from URL
        const repoName = repoPath.split('/').pop();

        // Download the repository
        await downloadRepo(repoPath, tmpDir.path);
        console.log('Repository downloaded successfully');

        let content = `Repository: ${repoUrl}\n\n`;
        const MAX_CHARACTERS = 150000;
        let currentCharCount = content.length;

        async function processDirectory(currentPath, relativePath = '') {
            const entries = await fs.readdir(currentPath, { withFileTypes: true });
            
            entries.sort((a, b) => {
                if (a.name.toLowerCase() === 'readme.md') return -1;
                if (b.name.toLowerCase() === 'readme.md') return 1;
                return 0;
            });

            for (const entry of entries) {
                if (currentCharCount >= MAX_CHARACTERS) break;

                const fullPath = path.join(currentPath, entry.name);
                const entryRelativePath = path.join(relativePath, entry.name);
                
                if (entry.isDirectory()) {
                    if (!['.git', 'node_modules'].includes(entry.name)) {
                        await processDirectory(fullPath, entryRelativePath);
                    }
                } else {
                    try {
                        const isBinary = await isBinaryFile(fullPath);
                        if (!isBinary) {
                            const fileContent = await fs.readFile(fullPath, 'utf8');
                            const fileHeader = `\n--- File: ${entryRelativePath} ---\n\n`;
                            const fileSection = fileHeader + fileContent + '\n\n';
                            
                            if (currentCharCount + fileSection.length <= MAX_CHARACTERS) {
                                content += fileSection;
                                currentCharCount += fileSection.length;
                            } else {
                                const remainingChars = MAX_CHARACTERS - currentCharCount;
                                if (remainingChars > fileHeader.length) {
                                    content += fileHeader;
                                    content += fileContent.slice(0, remainingChars - fileHeader.length);
                                    content += "\n\n--- Content truncated due to character limit ---";
                                }
                                break;
                            }
                        }
                    } catch (error) {
                        console.error(`Error reading file ${fullPath}: ${error.message}`);
                    }
                }
            }
        }

        await processDirectory(tmpDir.path);

        // Create repos directory if it doesn't exist
        const reposDir = path.join(process.cwd(), 'repos');
        try {
            await fs.mkdir(reposDir, { recursive: true });
        } catch (err) {
            if (err.code !== 'EEXIST') throw err;
        }

        // Generate unique filename with timestamp
        const timestamp = Date.now();
        const outputPath = path.join(reposDir, `${repoName}_${timestamp}.txt`);

        // Write the content to file
        await fs.writeFile(outputPath, content, 'utf8');
        console.log(`Repository summary saved to: ${outputPath}`);

        return content;
    } catch (error) {
        throw new Error(`Failed to process repository: ${error.message}`);
    } finally {
        // Cleanup temporary directory
        await tmpDir.cleanup();
    }
}

module.exports = { generateRepoSummary }; 