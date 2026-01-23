import {defaultApiMetadata} from './default-mock';

export interface SWAPICharacterProperties {
    created: string;
    edited: string;
    name: string;
    gender: string;
    skin_color: string;
    hair_color: string;
    height: string;
    eye_color: string;
    mass: string;
    homeworld: string;
    birth_year: string;
    vehicles: string[];
    starships: string[];
    films: string[];
    url: string;
}

export interface SWAPIPeopleResult {
    properties: SWAPICharacterProperties;
    _id: string;
    description: string;
    uid: string;
    __v: number;
}

export interface SWAPISupport {
    contact: string;
    donate: string;
    partnerDiscounts: {
        saberMasters: {
            link: string;
            details: string;
        };
        heartMath: {
            link: string;
            details: string;
        };
    };
}

export interface SWAPISocial {
    discord: string;
    reddit: string;
    github: string;
}

export interface SWAPIResponse {
    message: string;
    result: SWAPIPeopleResult[];
    apiVersion: string;
    timestamp: string;
    support: SWAPISupport;
    social: SWAPISocial;
}

export const mockPeople: Record<string, SWAPIPeopleResult> = {
    leia: {
        properties: {
            created: '2026-01-21T01:29:04.357Z',
            edited: '2026-01-21T01:29:04.357Z',
            name: 'Leia Organa',
            gender: 'female',
            skin_color: 'light',
            hair_color: 'brown',
            height: '150',
            eye_color: 'brown',
            mass: '49',
            homeworld: 'https://www.swapi.tech/api/planets/2',
            birth_year: '19BBY',
            vehicles: ['https://www.swapi.tech/api/vehicles/30'],
            starships: [],
            films: [
                'https://www.swapi.tech/api/films/1',
                'https://www.swapi.tech/api/films/2',
                'https://www.swapi.tech/api/films/3',
                'https://www.swapi.tech/api/films/6'
            ],
            url: 'https://www.swapi.tech/api/people/5'
        },
        _id: '5f63a36eee9fd7000499be46',
        description: 'A person within the Star Wars universe',
        uid: '5',
        __v: 4
    },
    luke: {
        properties: {
            created: '2026-01-21T01:29:04.357Z',
            edited: '2026-01-21T01:29:04.357Z',
            name: 'Luke Skywalker',
            gender: 'male',
            skin_color: 'fair',
            hair_color: 'blond',
            height: '172',
            eye_color: 'blue',
            mass: '77',
            homeworld: 'https://www.swapi.tech/api/planets/1',
            birth_year: '19BBY',
            vehicles: [],
            starships: [],
            films: [],
            url: 'https://www.swapi.tech/api/people/1'
        },
        _id: '5f63a36eee9fd7000499be42',
        description: 'A person within the Star Wars universe',
        uid: '1',
        __v: 4
    },
    c3po: {
        properties: {
            created: '2026-01-21T01:29:04.357Z',
            edited: '2026-01-21T01:29:04.357Z',
            name: 'C-3PO',
            gender: 'n/a',
            skin_color: 'gold',
            hair_color: 'n/a',
            height: '167',
            eye_color: 'yellow',
            mass: '75',
            homeworld: 'https://www.swapi.tech/api/planets/1',
            birth_year: '112BBY',
            vehicles: [],
            starships: [],
            films: [],
            url: 'https://www.swapi.tech/api/people/2'
        },
        _id: '5f63a36eee9fd7000499be43',
        description: 'A person within the Star Wars universe',
        uid: '2',
        __v: 4
    },
    vader: {
        properties: {
            created: '2026-01-21T01:29:04.357Z',
            edited: '2026-01-21T01:29:04.357Z',
            name: 'Darth Vader',
            gender: 'male',
            skin_color: 'white',
            hair_color: 'none',
            height: '202',
            eye_color: 'yellow',
            mass: '136',
            homeworld: 'https://www.swapi.tech/api/planets/1',
            birth_year: '41.9BBY',
            vehicles: [],
            starships: [],
            films: [],
            url: 'https://www.swapi.tech/api/people/4'
        },
        _id: '5f63a36eee9fd7000499be45',
        description: 'A person within the Star Wars universe',
        uid: '4',
        __v: 4
    },
    obi: {
        properties: {
            created: '2026-01-21T01:29:04.357Z',
            edited: '2026-01-21T01:29:04.357Z',
            name: 'Obi-Wan Kenobi',
            gender: 'male',
            skin_color: 'fair',
            hair_color: 'auburn, white',
            height: '182',
            eye_color: 'blue-gray',
            mass: '77',
            homeworld: 'https://www.swapi.tech/api/planets/20',
            birth_year: '57BBY',
            vehicles: ['https://www.swapi.tech/api/vehicles/38'],
            starships: [],
            films: [],
            url: 'https://www.swapi.tech/api/people/10'
        },
        _id: '5f63a36eee9fd7000499be4b',
        description: 'A person within the Star Wars universe',
        uid: '10',
        __v: 4
    }
};



export const createPeopleSearchResponse = (characters: SWAPIPeopleResult[]): SWAPIResponse => ({
    message: 'ok',
    result: characters,
    timestamp: new Date().toISOString(),
    ...defaultApiMetadata
});
