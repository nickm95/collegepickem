import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function Home() {
  const [users, setUsers] = useState([]);
  const [season, setSeason] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: usersData } = await supabase.from("users").select("*");
    const { data: seasonData } = await supabase
      .from("seasons")
      .select("*")
      .eq("active", true)
      .single();

    setUsers(usersData || []);
    setSeason(seasonData);
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>🏀 College Basketball Pick’em</h1>

      {season && <h2>Season: {season.name}</h2>}

      <h3>Players</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} {user.role === "admin" && "(Admin)"}
          </li>
        ))}
      </ul>

      <p>System connected successfully.</p>
    </div>
  );
}
