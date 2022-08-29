import "graphiql/graphiql.min.css";

import GraphiQL from "graphiql";
import Head from "next/head";
import { useEffect, useState } from "react";

import LoadingPage from "../components/LoadingPage/LoadingPage";
import useApp from "../hooks/useApp";

const defaultQuery = `# Welcome to GraphiQL APP
#
# This editor instance automatically uses the same account you use in this dashboard

query {
  products(first: 5){
    edges{
      node{
        id
        name
      }
    }
  }
}`;

function Index() {
  const [isBrowser, setIsBrowser] = useState(false);
  const appState = useApp()?.getState();
  const domain = appState?.domain;

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser || !appState?.token) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Head>
        <title>Saleor App Boilerplate</title>
        <meta name="description" content="Extend Saleor with Apps with ease." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ height: "1000px" }}>
        <GraphiQL
          defaultQuery={defaultQuery}
          fetcher={async (graphQLParams) => {
            const data = await fetch(`https://${domain}/graphql/`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "authorization-bearer": appState?.token!,
              },
              body: JSON.stringify(graphQLParams),
              credentials: "same-origin",
            });
            return data.json().catch(() => data.text());
          }}
        />
      </main>
    </div>
  );
}

export default Index;
