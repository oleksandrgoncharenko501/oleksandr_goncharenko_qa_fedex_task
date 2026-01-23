import {Page, Route} from '@playwright/test';
import {createPeopleSearchResponse, mockPeople} from '../mocks/people-mocks';
import {createPlanetSearchResponse, mockPlanets} from '../mocks/planet-mocks';
import {emptySearchResponse} from '../mocks/empty-search-mock';

export class ApiMocker {
    constructor(private page: Page) {
    }

    async enableMocking(): Promise<void> {
        await this.page.route('**/api/people?**', async (route: Route) => {
            const url = new URL(route.request().url());
            const query = url.searchParams.get('name')?.toLowerCase() || '';

            await this.handlePeopleSearch(route, query);
        });

        await this.page.route('**/api/planets?**', async (route: Route) => {
            const url = new URL(route.request().url());
            const query = url.searchParams.get('name')?.toLowerCase() || '';

            await this.handlePlanetSearch(route, query);
        });
    }

    async disableMocking(): Promise<void> {
        await this.page.unroute('**/api/people?**');
        await this.page.unroute('**/api/planets?**');
    }

    private async handlePeopleSearch(route: Route, query: string): Promise<void> {
        const matchingCharacters = Object.values(mockPeople).filter(char =>
            char.properties.name.toLowerCase().includes(query)
        );

        if (matchingCharacters.length > 0) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(createPeopleSearchResponse(matchingCharacters))
            });
        } else {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(emptySearchResponse)
            });
        }
    }

    private async handlePlanetSearch(route: Route, query: string): Promise<void> {
        const matchingPlanets = Object.values(mockPlanets).filter(planet =>
            planet.properties.name.toLowerCase().includes(query)
        );

        if (matchingPlanets.length > 0) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(createPlanetSearchResponse(matchingPlanets))
            });
        } else {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(emptySearchResponse)
            });
        }
    }
}


