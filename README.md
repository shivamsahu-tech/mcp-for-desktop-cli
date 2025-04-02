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

**User:** I'm having issues with a Docker container that keeps crashing. Can you help me diagnose the problem?

**Claude:** I'll help you diagnose your Docker container issue. Let me check what containers are running and their status.

**Command:** `docker ps -a`

**Output:**
```
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                      PORTS                    NAMES
3a7d5c2e1f23   nginx:latest   "/docker-entrypoint.…"   5 minutes ago    Exited (1) 2 minutes ago                            web-server
8bce45f98a12   mysql:8.0      "docker-entrypoint.s…"   12 minutes ago   Up 12 minutes               3306/tcp, 33060/tcp      db
f1e2d3c4b5a6   redis:alpine   "docker-entrypoint.s…"   2 hours ago      Up 2 hours                  6379/tcp                 cache
```

**Claude:** I see the nginx container "web-server" has exited with error code 1. Let's check the logs to see what happened.

**Command:** `docker logs 3a7d5c2e1f23`

**Output:**
```
2025/04/02 10:15:42 [emerg] 1#1: cannot load certificate "/etc/nginx/ssl/nginx.crt": BIO_new_file() failed (SSL: error:02001002:system library:fopen:No such file or directory:fopen('/etc/nginx/ssl/nginx.crt','r') error:2006D080:BIO routines:BIO_new_file:no such file)
nginx: [emerg] cannot load certificate "/etc/nginx/ssl/nginx.crt": BIO_new_file() failed (SSL: error:02001002:system library:fopen:No such file or directory:fopen('/etc/nginx/ssl/nginx.crt','r') error:2006D080:BIO routines:BIO_new_file:no such file)
```

**Claude:** I found the issue! Your nginx container is failing because it's trying to load SSL certificates that don't exist. Let me fix that by creating a simple configuration without SSL requirements.

**Command:** `docker run --name web-server -d -p 80:80 nginx:latest`

**Output:**
```
4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z
```

**Claude:** Great! The container should now be running without requiring SSL. Let me verify that it's working properly.

**Command:** `docker ps | grep web-server`

**Output:**
```
4d5e6f7g8h9i   nginx:latest   "/docker-entrypoint.…"   12 seconds ago   Up 10 seconds   0.0.0.0:80->80/tcp   web-server
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
