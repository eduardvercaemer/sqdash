import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { D1Database } from "@cloudflare/workers-types";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useDatabaseLoader = routeLoader$(async (e) => {
  const db = e.sharedMap.get("db") as D1Database;
  const { results } = await db
    .prepare(
      `SELECT *
             FROM query
             ORDER BY id`,
    )
    .all();

  return results;
});

export default component$(() => {
  const database = useDatabaseLoader();

  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
      <pre>
        <code>{JSON.stringify(database.value)}</code>
      </pre>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
