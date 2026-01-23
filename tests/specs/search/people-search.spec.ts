import {searchFixtureTest} from './fixture/search.fixture';
import {SearchType} from '../../utils/enums/SearchType';
import {expect} from '@playwright/test';

searchFixtureTest.describe('People Search', () => {

    searchFixtureTest('should handle search using full name', async ({searchPage}) => {
        await searchPage.search('Leia Organa', SearchType.PEOPLE);

        const people = await searchPage.getPeople();
        expect(people).toHaveLength(1);

        await searchPage.verifyPersonCard({
            name: 'Leia Organa',
            gender: 'female',
            birthYear: '19BBY',
            eyeColor: 'brown',
            skinColor: 'light'
        });
    });

    searchFixtureTest('should handle search using with only 1 character', async ({searchPage}) => {
        await searchPage.search('na', SearchType.PEOPLE);

        const people = await searchPage.getPeople();
        expect(people.length > 0).toBeTruthy();
    });

    searchFixtureTest('should handle staring search with ', async ({searchPage}) => {
        await searchPage.searchWithEnter('na', SearchType.PEOPLE);

        const people = await searchPage.getPeople();
        expect(people.length > 0).toBeTruthy();
    });

    searchFixtureTest('should handle search using not existing name', async ({searchPage}) => {
        await searchPage.search('not_existing_person_name', SearchType.PEOPLE);
        await searchPage.verifyNotFound();
    });

    searchFixtureTest('should handle clean up search results', async ({searchPage}) => {
        await searchPage.search('na', SearchType.PEOPLE);

        const people = await searchPage.getPeople();
        expect(people.length > 0).toBeTruthy();
        await searchPage.clearSearch();
        await searchPage.verifyCleanResults();
    });
});

