import React, { useMemo } from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher";
import { HeroCard } from "./HeroCard";

export const HeroesList = ({ publisher }) => {
  //solo vuelve a llamar la funcion si el publisher cambia
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  // const heroes = getHeroesByPublisher(publisher);

  return (
    <div className="card-columns animate__animated animate__fadeInUpBig">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
