import {defaultApiMetadata} from './default-mock';

export interface SWAPIPlanetProperties {
    created: string;
    edited: string;
    climate: string;
    surface_water: string;
    name: string;
    diameter: string;
    rotation_period: string;
    terrain: string;
    gravity: string;
    orbital_period: string;
    population: string;
    url: string;
}

export interface SWAPIPlanetResult {
    properties: SWAPIPlanetProperties;
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
    result: SWAPIPlanetResult[];
    apiVersion: string;
    timestamp: string;
    support: SWAPISupport;
    social: SWAPISocial;
}

export const mockPlanets: Record<string, SWAPIPlanetResult> = {
    tatooine: {
        properties: {
            created: '2026-01-21T01:29:04.360Z',
            edited: '2026-01-21T01:29:04.360Z',
            climate: 'arid',
            surface_water: '1',
            name: 'Tatooine',
            diameter: '10465',
            rotation_period: '23',
            terrain: 'desert',
            gravity: '1 standard',
            orbital_period: '304',
            population: '200000',
            url: 'https://www.swapi.tech/api/planets/1'
        },
        _id: '5f7254c11b7dfa00041c6fae',
        description: 'A planet.',
        uid: '1',
        __v: 2
    },
    alderaan: {
        properties: {
            created: '2026-01-21T01:29:04.360Z',
            edited: '2026-01-21T01:29:04.360Z',
            climate: 'temperate',
            surface_water: '40',
            name: 'Alderaan',
            diameter: '12500',
            rotation_period: '24',
            terrain: 'grasslands, mountains',
            gravity: '1 standard',
            orbital_period: '364',
            population: '2000000000',
            url: 'https://www.swapi.tech/api/planets/2'
        },
        _id: '5f7254c11b7dfa00041c6faf',
        description: 'A planet.',
        uid: '2',
        __v: 2
    },
    hoth: {
        properties: {
            created: '2026-01-21T01:29:04.360Z',
            edited: '2026-01-21T01:29:04.360Z',
            climate: 'frozen',
            surface_water: '100',
            name: 'Hoth',
            diameter: '7200',
            rotation_period: '23',
            terrain: 'tundra, ice caves, mountain ranges',
            gravity: '1.1 standard',
            orbital_period: '549',
            population: 'unknown',
            url: 'https://www.swapi.tech/api/planets/4'
        },
        _id: '5f7254c11b7dfa00041c6fb1',
        description: 'A planet.',
        uid: '4',
        __v: 2
    },
    dagobah: {
        properties: {
            created: '2026-01-21T01:29:04.360Z',
            edited: '2026-01-21T01:29:04.360Z',
            climate: 'murky',
            surface_water: '8',
            name: 'Dagobah',
            diameter: '8900',
            rotation_period: '23',
            terrain: 'swamp, jungles',
            gravity: 'N/A',
            orbital_period: '341',
            population: 'unknown',
            url: 'https://www.swapi.tech/api/planets/5'
        },
        _id: '5f7254c11b7dfa00041c6fb2',
        description: 'A planet.',
        uid: '5',
        __v: 2
    },
    endor: {
        properties: {
            created: '2026-01-21T01:29:04.360Z',
            edited: '2026-01-21T01:29:04.360Z',
            climate: 'temperate',
            surface_water: '8',
            name: 'Endor',
            diameter: '4900',
            rotation_period: '18',
            terrain: 'forests, mountains, lakes',
            gravity: '0.85 standard',
            orbital_period: '402',
            population: '30000000',
            url: 'https://www.swapi.tech/api/planets/7'
        },
        _id: '5f7254c11b7dfa00041c6fb4',
        description: 'A planet.',
        uid: '7',
        __v: 2
    }
};

export const createPlanetSearchResponse = (planets: SWAPIPlanetResult[]): SWAPIResponse => ({
    message: 'ok',
    result: planets,
    timestamp: new Date().toISOString(),
    ...defaultApiMetadata
});
