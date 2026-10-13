import { useState } from "react";



export default function Profile({ pet }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-4">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-20 h-20 rounded-full object-cover shrink-0"
        />

        <div className="min-w-0">
          <h2 className="text-lg font-semibold">{pet.name}</h2>
          <p className="text-sm">
            {pet.species} &middot; {pet.age} &middot; {pet.weight}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs px-2 py-1 rounded-full bg-amber-300 text-amber-800">
              Allergy: {pet.allergy}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/20">
              {pet.vet}
            </span>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              className="text-xs px-2 py-1 rounded-full bg-white/20 hover:bg-white/30"
            >
              Details {open ? "▲" : "▼"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm bg-white/10 rounded-lg p-3">
          <dt className="opacity-80">Microchip</dt>
          <dd>{pet.microchip}</dd>
          <dt className="opacity-80">Birthday</dt>
          <dd>{pet.birthday}</dd>
          <dt className="opacity-80">Notes</dt>
          <dd>{pet.notes}</dd>
        </dl>
      )}
    </div>
  );
}