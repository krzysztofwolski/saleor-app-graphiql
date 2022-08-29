import { withBaseURL } from "@saleor/app-sdk/middleware";
import { withSentry } from "@sentry/nextjs";
import type { Handler } from "retes";
import { toNextHandler } from "retes/adapter";
import { Response } from "retes/response";

import packageJson from "../../package.json";

const handler: Handler = async (request) => {
  const { baseURL } = request.context;

  const manifest = {
    id: "saleor.graphiql.app",
    version: packageJson.version,
    name: packageJson.name,
    permissions: [],
    appUrl: baseURL,
    tokenTargetUrl: `${baseURL}/api/register`,
    webhooks: [],
    extensions: [],
  };

  return Response.OK(manifest);
};

export default withSentry(toNextHandler([withBaseURL, handler]));
