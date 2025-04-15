# doke-cli

A command-line interface tool for generating and managing doke API documentation UI.

## Overview

doke-cli is a powerful command-line tool that helps you generate and manage the UI for your doke API documentation. It simplifies the process of setting up the doke UI by providing intuitive commands to clone, configure, and deploy the documentation interface either locally or with Docker.

## Usage

Make sure you have an `api-docs` folder in your current directory (generated with doke-nest) before running the CLI.

```bash
# Using npx (recommended)
npx doke-cli generate-ui

# If installed globally
doke-cli generate-ui
```

When you run the command, you'll be prompted to choose your environment:

```
generate doke ui
? Which environment do you want to run your project? › - Use arrow-keys. Return to submit.
❯   Generate local environment
    Generate docker environment
```

### Local Environment

If you select "Generate local environment":

1. A `doke-ui` folder will be created in your project root
2. Next.js standalone build files will be generated
3. The UI server will automatically start
4. The documentation will be available at http://localhost:3001

To start the server again later:

```bash
doke-cli start
```

### Docker Environment

If you select "Generate docker environment":

1. A Docker image will be built based on Next.js standalone version
2. No `doke-ui` folder will be created in your project
3. You can run the Docker image to start the server

## Prerequisites

- Node.js 14 or later
- API documentation generated with doke-nest (`api-docs` folder)
- Git installed on your system
- Docker (optional, for Docker deployment)

## Installation

While using `npx doke-cli` is recommended, you can also install it globally:

```bash
# Using npm
npm install -g doke-cli

# Using yarn
yarn global add doke-cli
```

## Commands

### generate-ui

Generate a doke UI from your API documentation:

```bash
doke-cli generate-ui
```

### start

Start an existing doke UI:

```bash
doke-cli start
```

This command starts the doke UI server, assuming a `doke-ui` folder exists in your current directory.

## Troubleshooting

- If you encounter errors with missing `api-docs` folder, make sure you've generated your API documentation using doke-nest first.
- For permission issues, try running the commands with administrator privileges.

## License

MIT License - See the [LICENSE](../LICENSE) file for details.
