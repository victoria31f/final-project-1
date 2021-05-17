import React from 'react';

const PokemonPageView = ({
  id, name, caught, date,
}) => {
  const image = id > 720 ? '/img/no-image.jpg' : `/img/${id}.png`;

  return (
    <div className="card pokemon-card">
      <div className="row g-0">
        <div className="col-md-6">
          <img src={image} alt={name} className="pokemon-img" />
        </div>
        <div className="col-md-6">
          <div className="card-body text-end">
            <h5 className="card-title fs-2">{`${id} - ${name.toUpperCase()}`}</h5>
            <p className="card-text fs-3">
              {
                caught
                  ? `This pokemon was caught on ${date}`
                  : 'This pokemon hasn\'t been caught yet'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPageView;
