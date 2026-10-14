import { useEffect, useState } from "react";
import { PetsContext } from "./data/petsContext.js";
import { supabase } from "./data/supabaseClient.js";

const CURRENT_USER = "Jared";

function toVaccine(row) {
  return { id: row.id, name: row.name, given: row.given, nextDue: row.next_due };
}

function toEvent(row) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    date: row.date,
    time: row.time ? row.time.slice(0, 5) : null,
  };
}

function toLog(row) {
  return {
    id: row.id,
    petId: row.pet_id,
    label: row.label,
    done: row.done,
    loggedBy: row.logged_by,
    time: new Date(row.created_at).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

function toPetsObject(rows) {
  const result = {};
  for (const row of rows) {
    result[row.id] = {
      name: row.name,
      image: row.image,
      species: row.species,
      age: row.age,
      weight: row.weight,
      allergy: row.allergy,
      vet: row.vet,
      microchip: row.microchip,
      birthday: row.birthday,
      notes: row.notes,
      health: { vaccines: row.vaccines.map(toVaccine) },
      events: row.events.map(toEvent),
    };
  }
  return result;
}

export function PetsProvider({ children }) {
  const [pets, setPets] = useState({});
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const [petsResult, logsResult] = await Promise.all([
        supabase.from("pets").select("*, vaccines(*), events(*)").order("name"),
        supabase
          .from("logs")
          .select("*")
          .gte("created_at", startOfToday.toISOString())
          .order("created_at", { ascending: false }),
      ]);

      if (cancelled) return;

      const error = petsResult.error || logsResult.error;
      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }

      setPets(toPetsObject(petsResult.data));
      setLogs(logsResult.data.map(toLog));
      setStatus("ready");
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const addVaccine = async (petId, vaccine) => {
    const { data, error } = await supabase
      .from("vaccines")
      .insert({
        pet_id: petId,
        name: vaccine.name,
        given: vaccine.given,
        next_due: vaccine.nextDue,
      })
      .select()
      .single();

    if (error) throw error;

    setPets((prev) => ({
      ...prev,
      [petId]: {
        ...prev[petId],
        health: {
          ...prev[petId].health,
          vaccines: [...prev[petId].health.vaccines, toVaccine(data)],
        },
      },
    }));
  };

  const addEvent = async (petId, event) => {
    const { data, error } = await supabase
      .from("events")
      .insert({
        pet_id: petId,
        type: event.type,
        title: event.title,
        date: event.date,
        time: event.time,
      })
      .select()
      .single();

    if (error) throw error;

    setPets((prev) => ({
      ...prev,
      [petId]: {
        ...prev[petId],
        events: [...prev[petId].events, toEvent(data)],
      },
    }));
  };

  const addLog = async (petId, label) => {
    const { data, error } = await supabase
      .from("logs")
      .insert({ pet_id: petId, label, done: true, logged_by: CURRENT_USER })
      .select()
      .single();

    if (error) {
      console.error(error);
      window.alert("Couldn't save that log. Check your connection and try again.");
      return;
    }

    setLogs((prev) => [toLog(data), ...prev]);
  };

  const toggleLog = async (id) => {
    const log = logs.find((l) => l.id === id);
    if (!log) return;

    const done = !log.done;
    const loggedBy = done ? CURRENT_USER : null;

    const { error } = await supabase
      .from("logs")
      .update({ done, logged_by: loggedBy })
      .eq("id", id);

    if (error) {
      console.error(error);
      window.alert("Couldn't update that log. Check your connection and try again.");
      return;
    }

    setLogs((prev) => prev.map((l) => (l.id === id ? { ...l, done, loggedBy } : l)));
  };

  if (status === "loading") {
    return <p className="p-4 text-white">Loading…</p>;
  }

  if (status === "error") {
    return (
      <div className="p-4 text-white">
        <p className="mb-3">Couldn't load your pets. Check your connection and try again.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="border border-gray-500 hover:bg-gray-600 rounded-3xl px-4 py-2"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <PetsContext.Provider
      value={{ pets, logs, addVaccine, addEvent, addLog, toggleLog }}
    >
      {children}
    </PetsContext.Provider>
  );
}