import {SearchType} from '../../utils/enums/SearchType';
import {searchFixtureTest} from './fixture/search.fixture';
import {expect} from '@playwright/test';


searchFixtureTest.describe('Planet Search', () => {
    searchFixtureTest('should handle search using full name', async ({searchPage}) => {
        await searchPage.search('Tatooine', SearchType.PLANETS);

        const planets = await searchPage.getPlanets();
        expect(planets).toHaveLength(1);

        await searchPage.verifyPlanetCard({
            name: 'Tatooine',
            population: '200000',
            climate: 'arid',
            gravity: '1 standard'
        });
    });

    searchFixtureTest('should handle search using with only 1 character', async ({searchPage}) => {
        await searchPage.search('t', SearchType.PLANETS);

        const planets = await searchPage.getPlanets();
        expect(planets.length > 0).toBeTruthy();
    });

    searchFixtureTest('should handle staring search with ', async ({searchPage}) => {
        await searchPage.searchWithEnter('t', SearchType.PLANETS);

        const planets = await searchPage.getPlanets();
        expect(planets.length > 0).toBeTruthy();
    });

    searchFixtureTest('should handle search using not existing name', async ({searchPage}) => {
        await searchPage.search('not_existing_planet_name', SearchType.PLANETS);
        await searchPage.verifyNotFound();
    });

    searchFixtureTest('should handle clean up search results', async ({searchPage}) => {
        await searchPage.search('t', SearchType.PLANETS);

        const planets = await searchPage.getPlanets();
        expect(planets.length > 0).toBeTruthy();
        await searchPage.clearSearch();
        await searchPage.verifyCleanResults();
    });
});
