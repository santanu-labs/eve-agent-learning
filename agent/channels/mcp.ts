import { localDev } from "eve/channels/auth";
import { mcpChannel } from "eve/channels/mcp";
export default mcpChannel({
  auth: localDev(),
  route: '/mcp',
});