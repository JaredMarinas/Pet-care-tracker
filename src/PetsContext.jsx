import { createContext, useContext, useState } from "react";
import { pets as initialPets } from "./data/pets.js";

const PetsContext = createContext(null);

export function PetsProvider({ children }) {
  const [pets, setPets] = useState(initialPets);

  const addVaccine = (petId, vaccine) => {
    setPets((prev) => ({
      ...prev,
      [petId]: {
        ...prev[petId],
        health: {
          ...prev[petId].health,
          vaccines: [...prev[petId].health.vaccines, { id: Date.now(), ...vaccine }],
        },
      },
    }));
  };

  const addEvent = (petId, event) => {
    setPets((prev) => ({
      ...prev,
      [petId]: {
        ...prev[petId],
        events: [...prev[petId].events, { id: Date.now(), ...event }],
      },
    }));
  };

  return (
    <PetsContext.Provider value={{ pets, addVaccine, addEvent }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  return useContext(PetsContext);
}