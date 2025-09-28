import React, { useMemo, useState } from 'react';
import './App.scss';

const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const displayed = useMemo(() => {
    const result = [...goodsFromServer];

    if (sortBy === 'alpha') {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === 'length') {
      result.sort((a, b) => a.length - b.length || a.localeCompare(b));
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortBy, isReversed]);

  const isInitialOrder = useMemo(() => {
    return (
      displayed.length === goodsFromServer.length &&
      displayed.every((g, i) => g === goodsFromServer[i])
    );
  }, [displayed]);

  return (
    <main className="section container">
      <h1 className="title">React list of goods</h1>

      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'alpha' ? '' : 'is-light'}`}
          onClick={() => setSortBy('alpha')}
          data-cy="SortByName"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortBy('length')}
          data-cy="SortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(null);
              setIsReversed(false);
            }}
            data-cy="Reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="content" data-cy="GoodsList">
        {displayed.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </main>
  );
};
