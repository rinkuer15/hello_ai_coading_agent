# Hello AI Coding Agent

A minimal scaffold for experimenting with AI-assisted coding agents.

## Setup

```bash
npm install
```

## Usage

```bash
# Print stdout oracle (default)
npm start
# or: node src/index.js

# Start static file server (serves public/ directory)
node src/index.js --serve
# Defaults to port 3000. Override with PORT env variable:
PORT=8080 node src/index.js --serve
```

## Running Tests

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes with a clear message
4. Open a pull request against `main`
