const PokemonPageView = ({ id, name, caught, date}) => {
    return (
        <div className="card mb-3 pokemon-card">
            <div className="row g-0">
                <div className="col-md-6">
                    <img src={`${process.env.PUBLIC_URL}/img/${id}.png`} alt={name} className="pokemon-img" />
                </div>
                <div className="col-md-6">
                    <div className="card-body text-end">
                        <h5 className="card-title fs-2">{`${id} - ${name.toUpperCase()}`}</h5>
                        <p className="card-text fs-3">{
                            caught
                                ? `This pokemon was caught on ${date}`
                                : `This pokemon hasn't been caught yet` }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonPageView;