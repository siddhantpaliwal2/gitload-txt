# gitload-txt

Download .txt summaries of GitHub Repos, use for context with Cursor and other AI IDEs.

[![npm version](https://img.shields.io/npm/v/gitload-txt.svg)](https://www.npmjs.com/package/gitload-txt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 📦 Download any public GitHub repository as an enriched text summary
- 🔍 Smart filtering of relevant code and documentation
- 📝 Includes key architectural decisions and patterns
- 🏷️ Auto-generated tags for better organization
- 🚀 Compatible with popular AI coding assistants
- 💻 Simple CLI interface

## Installation

```bash
npm install gitload-txt
```

## Usage

Basic usage:
```bash
gitload https://github.com/username/repository
```

This will create a `repository-name.txt` file in a repos folder in your current directory with an enriched summary of the repository.

### Output Format

The generated text file includes:

1. Repository Overview
   - Basic information
   - Main technologies used
   - Architecture overview
   - Dependencies

2. Code Structure
   - Directory layout
   - Key files and their purposes
   - Important patterns and conventions

3. Documentation Summary
   - README highlights
   - API documentation
   - Contributing guidelines
   - License information

4. Auto-generated Tags (when --tags is used)
   - Technology stack
   - Programming paradigms
   - Architecture patterns
   - Domain categories

## Example Output

```
Repository: awesome-project
URL: https://github.com/username/awesome-project
Generated: 2024-12-04

OVERVIEW
========
A Node.js backend service using Express.js and MongoDB...

ARCHITECTURE
============
- Microservices architecture
- REST API endpoints
- JWT authentication
- Redis caching layer

KEY COMPONENTS
=============
/src
  /routes - API endpoint definitions
  /controllers - Business logic
  /models - MongoDB schemas
  /middleware - Auth and validation
  /utils - Helper functions

[... continues with more detailed information ...]

TAGS
====
#nodejs #express #mongodb #microservices #jwt #redis
```

## Using with AI IDEs

### Cursor
1. Import the generated text file into your Cursor workspace
2. Use @repository-name.txt to query the summary
3. Generate code based on the repository

### Other AI IDEs
The generated summaries are compatible with most AI-powered development tools that accept context in text format.

## Configuration

Create a `.gitloadrc` file in your home directory to set default options:

```json
{
  "outputDir": "./summaries",
  "defaultDepth": "detailed",
  "includeTags": true,
  "excludePatterns": ["*.test.js", "*.spec.js"],
  "maxFileSize": "10mb"
}
```

## API Usage

You can also use gitload-txt programmatically in your Node.js applications:

```javascript
const { generateSummary } = require('gitload-txt');

async function getSummary() {
  try {
    const summary = await generateSummary('https://github.com/username/repository', {
      depth: 'detailed',
      includeTags: true
    });
    console.log(summary);
  } catch (error) {
    console.error('Error generating summary:', error);
  }
}
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/username/gitload-txt

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Created and maintained by [Siddhant Paliwal](https://github.com/siddhantpaliwal2)

## Support

- 📫 For bugs and feature requests, please [create an issue](https://github.com/username/gitload-txt/issues)
- 💬 For questions and discussions, please [email me](mailto:paliwal.siddhant@gmail.com)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and migration guides.

## Roadmap

- [ ] Custom summary templates
- [ ] pip package
- [ ] Enhanced code analysis features