require("dotenv").config({ path: __dirname + "/../.env" });

const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const app = require("./server");
const schema = require("./schema/internal");
const externalSchema = require("./schema/external");



app.listen(process.env.PORT, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      externalSchema,
    },
    {
      server: app,
      path: "/graphql",
    }
  );
  console.log(
    `🚀 Running a GraphQL API server at\n\tExternal: http://localhost:${process.env.PORT}/v1\n\tInternal: http://localhost:${process.env.PORT}/graphql`
  );
});
