# MCP for Desktop CLI

This repository provides a solution for remotely executing commands on an Ubuntu system through Claude's Model Context Protocol (MCP). It consists of two main components:

- **Ubuntu Client** - A Node.js Express server running on the Ubuntu system that executes shell commands.
- **MCP Server** - A server that integrates with Claude's MCP framework to process commands and communicate with the Ubuntu client.

## Architecture Overview

```
           ┌─────────────┐             ┌──────────────┐
           │             │ HTTP API    │              │
Claude ───►│  MCP Server │────────────►│ Ubuntu Client│────►Execute Commands
           │             │             │              │
           └─────────────┘             └──────────────┘
```

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- Ubuntu system for the client
- Windows/Mac/Linux for the MCP server

## Repository Structure

```
mcp-for-desktop-cli/
├── ubuntu-client/
│   ├── package.json
│   └── server.js
└── mcp_server/
    ├── package.json
    ├── server.js
    └── claude_desktop_config.json
```

## Installation

### Ubuntu Client

Clone this repository on your Ubuntu system:
```bash
git clone https://github.com/yourusername/mcp-for-desktop-cli.git
cd mcp-for-desktop-cli/ubuntu-client
```

Install dependencies:
```bash
npm install
```

Configure the API key:

- Open `server.js`
- Replace `'your_secret_key'` with a secure API key of your choice

Start the server:
```bash
node server.js
```
The server will be running on port `3020`.

### MCP Server

Clone this repository on your local system:
```bash
git clone https://github.com/yourusername/mcp-for-desktop-cli.git
cd mcp-for-desktop-cli/mcp_server
```

Install dependencies:
```bash
npm install
```

Configure the connection:

- Open `server.js`
- Replace `'your_secret_key'` with the same API key used in the Ubuntu client.
- Replace `"http://your_public_ip_address/execute"` with your Ubuntu system's public IP address (e.g., `"http://192.168.1.100:3020/execute"`).

Update the MCP registration file path:

- Open `claude_desktop_config.json`
- Update the path to match your actual file location:

```json
"args": ["path/to/your/server.js"]
```

## Usage

1. Ensure your Ubuntu client is running.
2. Start the MCP server.
3. Configure Claude desktop to use your MCP server.
4. You can now send commands to your Ubuntu system through Claude.

### Example conversation with Claude:

**User:** Can you check the disk space on my Ubuntu system?

**Claude:** I'll check the disk space on your Ubuntu system.

**Command:** `df -h`

**Output:**
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        98G   45G   48G  49% /
tmpfs           3.9G     0  3.9G   0% /dev/shm
...
```

## Security Considerations

The current implementation uses a simple API key for authentication. Consider implementing additional security measures for production use:

- HTTPS instead of HTTP
- IP whitelisting
- Command whitelisting to restrict allowed commands
- User authentication
- Request rate limiting

## Contact Us

- **X (Twitter):** [x.com/shivamsahu_tech](https://x.com/shivamsahu_tech)
- **LinkedIn:** [linkedin.com/in/shsax](https://linkedin.com/in/shsax)
- **Discord:** shivamsahu_tech
- **Email:** shivamsahu.tech@gmail.com
