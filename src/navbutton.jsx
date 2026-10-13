import {NavLink} from 'react-router-dom';


const pets = [
  { label: "All", to: "/", end: true },
  { label: "Beluga", to: "/beluga" },
  { label: "Doggo", to: "/doggo" },
];


export default function NavButton() {

  return (
    <nav aria-label="Pets" className="m-5 flex flex-wrap gap-4">
      {pets.map((pet) => (
        <NavLink
          key={pet.to}
          to={pet.to}
          end={pet.end}
          className={({ isActive }) =>
            `border py-2 px-4 rounded-3xl font-bold text-white ${
              isActive
                ? "bg-green-600 border-green-600"
                : "bg-transparent border-gray-500 hover:bg-gray-600"
            }`
          }
        >
          {pet.label}
        </NavLink>
      ))}
    </nav>
  );
}