import {expect, Locator} from '@playwright/test';
import {BasePage} from '../BasePage';
import {SearchType} from '../../utils/enums/SearchType';
import {Person, Planet} from './search.interfaces';
import {EXPECTED_PEOPLE_FIELDS, EXPECTED_PLANET_FIELDS, PEOPLE_FIELDS, PLANET_FIELDS} from './field-constants';


export class StarWarsSearchPage extends BasePage {

    get searchInput(): Locator {
        return this.page.locator('#query');
    }

    get searchButton(): Locator {
        return this.page.getByRole('button', {name: 'Search'});
    }

    get peopleRadio(): Locator {
        return this.page.getByRole('radio', {name: 'People'});
    }

    get planetsRadio(): Locator {
        return this.page.getByRole('radio', {name: 'Planets'});
    }

    get resultPeopleCards(): Locator {
        return this.page.locator('app-character .card');
    }

    get resultPlanetCards(): Locator {
        return this.page.locator('app-planet .card');
    }

    get notFoundMessage(): Locator {
        return this.page.getByText('Not found');
    }

    async navigateToApp(): Promise<void> {
        await this.goto('/');
        await this.expectTitle(/The Star Wars Search/);
    }

    async search(query: string, type: SearchType): Promise<void> {
        const radio = type === SearchType.PEOPLE ? this.peopleRadio : this.planetsRadio;
        await radio.check();
        await this.searchInput.clear();
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async searchWithEnter(query: string, type: SearchType): Promise<void> {
        const radio = type === SearchType.PEOPLE ? this.peopleRadio : this.planetsRadio;
        await radio.check();
        await this.searchInput.clear();
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
    }

    async clearSearch(): Promise<void> {
        await this.searchInput.clear();
        await this.searchButton.click();
    }

    async getPeople(): Promise<Person[]> {
        await this.resultPeopleCards.first().waitFor({state: 'visible'});
        const count = await this.resultPeopleCards.count();
        if (count === 0) {
            return [];
        }

        const people: Person[] = [];
        const cards = await this.resultPeopleCards.all();

        for (const card of cards) {
            const name = await card.locator('.card-subtitle').textContent() || '';
            const fields = await this.extractFields(card);

            people.push({
                name: name.trim(),
                gender: fields[PEOPLE_FIELDS.GENDER] || '',
                birthYear: fields[PEOPLE_FIELDS.BIRTH_YEAR] || '',
                eyeColor: fields[PEOPLE_FIELDS.EYE_COLOR] || '',
                skinColor: fields[PEOPLE_FIELDS.SKIN_COLOR] || ''
            });
        }

        return people;
    }

    async getPlanets(): Promise<Planet[]> {
        await this.resultPlanetCards.first().waitFor({state: 'visible'});
        const count = await this.resultPlanetCards.count();
        if (count === 0) {
            return [];
        }

        const planets: Planet[] = [];
        const cards = await this.resultPlanetCards.all();

        for (const card of cards) {
            const subtitle = card.locator('.card-subtitle');
            await subtitle.waitFor({state: 'visible'});
            const name = await subtitle.textContent() || '';
            const fields = await this.extractFields(card);

            planets.push({
                name: name.trim(),
                population: fields[PLANET_FIELDS.POPULATION] || '',
                climate: fields[PLANET_FIELDS.CLIMATE] || '',
                gravity: fields[PLANET_FIELDS.GRAVITY] || ''
            });
        }

        return planets;
    }

    async verifyPersonCard(person: Person): Promise<void> {
        await this.resultPeopleCards.waitFor({state: 'visible'});
        const card = this.resultPeopleCards.filter({hasText: person.name}).first();
        await expect(card).toBeVisible();

        const subtitle = card.locator('.card-subtitle');
        const actualName = (await subtitle.textContent() || '').trim();
        expect.soft(actualName, 'Person name mismatch').toBe(person.name);

        await expect(subtitle, 'Person name mismatch').toHaveText(person.name);
        const fields = await this.extractFields(card);
        const fieldLabels = Object.keys(fields);

        expect.soft(fieldLabels, 'Person card should have correct fields').toEqual(EXPECTED_PEOPLE_FIELDS);
        expect.soft(fields[PEOPLE_FIELDS.GENDER], 'Gender mismatch').toBe(person.gender);
        expect.soft(fields[PEOPLE_FIELDS.BIRTH_YEAR], 'Birth year mismatch').toBe(person.birthYear);
        expect.soft(fields[PEOPLE_FIELDS.EYE_COLOR], 'Eye color mismatch').toBe(person.eyeColor);
        expect.soft(fields[PEOPLE_FIELDS.SKIN_COLOR], 'Skin color mismatch').toBe(person.skinColor);
    }

    async verifyPlanetCard(planet: Planet): Promise<void> {
        const card = this.resultPlanetCards.filter({hasText: planet.name}).first();
        await expect(card).toBeVisible();

        const subtitle = card.locator('.card-subtitle');
        const actualName = (await subtitle.textContent() || '').trim();
        expect.soft(actualName, 'Planet name mismatch').toBe(planet.name);

        const fields = await this.extractFields(card);
        const fieldLabels = Object.keys(fields);

        expect.soft(fieldLabels, 'Planet card should have correct fields').toEqual(EXPECTED_PLANET_FIELDS);
        expect.soft(fields[PLANET_FIELDS.POPULATION], 'Population mismatch').toBe(planet.population);
        expect.soft(fields[PLANET_FIELDS.CLIMATE], 'Climate mismatch').toBe(planet.climate);
        expect.soft(fields[PLANET_FIELDS.GRAVITY], 'Gravity mismatch').toBe(planet.gravity);
    }

    async verifyNotFound(): Promise<void> {
        await expect(this.resultPlanetCards, 'No planet cards should be visible').toHaveCount(0);
        await expect(this.resultPeopleCards, 'No people cards should be visible').toHaveCount(0);
        await expect(this.notFoundMessage, '"Not found" message should be visible').toBeVisible();
    }

    async verifyCleanResults(): Promise<void> {
        await expect(this.resultPlanetCards, 'No planet cards should be visible').toHaveCount(0);
        await expect(this.resultPeopleCards, 'No people cards should be visible').toHaveCount(0);
        await expect(this.notFoundMessage, '"Not found" message should not be visible').not.toBeVisible();
    }

    private async extractFields(card: Locator): Promise<Record<string, string>> {
        const rows = await card.locator('.row').all();
        const fields: Record<string, string> = {};

        for (const row of rows) {
            const label = await row.locator('.col-sm-2').textContent() || '';
            const value = await row.locator('.col-sm-10').textContent() || '';
            const cleanLabel = label.replace(':', '').trim();
            fields[cleanLabel] = value.trim();
        }

        return fields;
    }
}

