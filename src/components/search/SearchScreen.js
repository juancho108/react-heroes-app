import React, { useMemo } from "react";
import queryString from "query-string";

import { heroes } from "../../data/heroes";
import { HeroCard } from "../heroes/HeroCard";
import { useForm } from "../../hooks/useForm";
import { useLocation } from "react-router-dom";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, HandleInputChange] = useForm({ searchField: q });
  const { searchField } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  // const heroesFiltered = getHeroesByName(searchField);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchField}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4> Search Form</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="searchField"
              value={searchField}
              placeholder="Find your hero"
              autoComplete="off"
              className="form-control"
              onChange={HandleInputChange}
            ></input>

            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" && <div className="alert alert-danger">Search a hero</div>}
          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-info">There is no a hero with {q}</div>
          )}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
