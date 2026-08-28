import { createFileRoute } from "@tanstack/react-router";
import { pingSupabase } from "@/lib/keep-alive.server";

/**
 * Supabase Free-plan projects pause after 7 days of API inactivity. A Vercel
 * Cron pings this route twice a week (Mon + Thu 03:00 UTC) which forces the
 * loader to hit Supabase — resetting the pause timer.
 *
 * The response is a tiny JSON blob for anyone (including cron) that fetches it.
 * `robots: noindex` keeps it out of search results.
 */
export const Route = createFileRoute("/keep-alive")({
  head: () => ({
    meta: [
      { title: "keep-alive" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: async () => {
    const result = await pingSupabase();
    return { result, at: new Date().toISOString() };
  },
  component: KeepAlive,
});

function KeepAlive() {
  const { result, at } = Route.useLoaderData();
  return (
    <pre style={{ fontFamily: "monospace", padding: 24 }}>
      {JSON.stringify({ ok: result.ok, error: result.error ?? null, at }, null, 2)}
    </pre>
  );
}
