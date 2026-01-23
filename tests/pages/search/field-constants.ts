export const PEOPLE_FIELDS = {
    GENDER: 'Gender',
    BIRTH_YEAR: 'Birth year',
    EYE_COLOR: 'Eye color',
    SKIN_COLOR: 'Skin color'
} as const;

export const PLANET_FIELDS = {
    POPULATION: 'Population',
    CLIMATE: 'Climate',
    GRAVITY: 'Gravity'
} as const;

export const EXPECTED_PEOPLE_FIELDS = [
    PEOPLE_FIELDS.GENDER,
    PEOPLE_FIELDS.BIRTH_YEAR,
    PEOPLE_FIELDS.EYE_COLOR,
    PEOPLE_FIELDS.SKIN_COLOR
] as const;

export const EXPECTED_PLANET_FIELDS = [
    PLANET_FIELDS.POPULATION,
    PLANET_FIELDS.CLIMATE,
    PLANET_FIELDS.GRAVITY
] as const;
