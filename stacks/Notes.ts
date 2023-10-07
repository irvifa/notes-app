import { Api, StackContext, Table } from "sst/constructs";

export function Notes({ stack }: StackContext) {
  const table = new Table(stack, "Counter", {
    fields: {
      id: "string",
      userId: "string",
      content: "string"
    },
    primaryIndex: { partitionKey: "userId", sortKey: "id" },
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
        "GET /": "packages/functions/src/lambda.handler",
        "GET /todo": "packages/functions/src/notes.list",
        "POST /todo": "packages/functions/src/notes.create",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}