import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";



const server = new McpServer({
    name: "ubuntu-desktop",
    version: "1.0.0",
    capabilities: {
      resources: {},
      tools: {},
    },
  });



// Helper function for making API requests to execute commands
async function executeCommand(command){
    const API_KEY = "your_secret_key";
    const SERVER_URL = "http://your_public_ip_address/execute"; 
  
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };
    const body = JSON.stringify({ "command" : command });
  
    try {
      const response = await fetch(SERVER_URL, { method: "POST", headers, body });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.output || "No output received";
    } catch (error) {
      console.error("Error executing command:", error);
      return null;
    }
}


// Register weather tools
server.tool(
    "Ubuntu_command_Executor", 
    "Execute a command on the Ubuntu system via HTTP request",
    {
      command: z.string()
    },

    async ({ command }) => {
      const commandResult = await executeCommand(command);
      if (!commandResult) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to execute command",
            },
          ],
        };
      }
      const commandText = `Command: ${command}\n\nOutput:\n${commandResult}`;
      return {
        content: [
          {
            type: "text",
            text: commandText,
          },
        ],
      };
    },
);


async function init() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
   
}

init()