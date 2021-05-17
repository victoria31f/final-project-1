class Api {
    _baseUrl = 'http://localhost:3001';

    _getResource = async (url, options) => {
        const res = await fetch(`${this._baseUrl}${url}`, options);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    };

    getAllPokemons = async (data, start) => {
        const { limit } = data;
        return await this._getResource(`/pokemons?_start=${start}&_limit=${limit}`);
    };

    getCaughtPokemons = async (data, start) => {
        return await this._getResource(`/pokemons?caught=true&_sort=date&_order=asc&_start=${start}&_limit=15`);
    };

    getPokemon = async (id, options) => {
        const res = await this._getResource(`/pokemons/${id}`, options);
        return { ...res, date: new Date(res.date).toLocaleDateString() };
    };

    editPokemon = async (data) => {
        const { id, ...info } = data;
        return await this._getResource(`/pokemons/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info),
        });
    };
}

export const apiService = new Api();
