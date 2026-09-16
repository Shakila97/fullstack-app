"use client";

import { useEffect, useState } from "react";

type HelloResponse = {
  message: string;
  database: boolean;
};

export default function Home() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/api/hello`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">
        Hello, World!
      </h1>
      {error && (
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      )}
      {!error && !data && (
        <p className="text-zinc-600 dark:text-zinc-400">Loading backend status…</p>
      )}
      {data && (
        <div className="text-center text-zinc-600 dark:text-zinc-400">
          <p>{data.message}</p>
          <p>Database connected: {data.database ? "yes" : "no"}</p>
        </div>
      )}
    </div>
  );
}
