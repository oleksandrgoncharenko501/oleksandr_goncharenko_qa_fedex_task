import {StarWarsSearchPage} from '../../../pages/search/search.page';
import {test as base} from '@playwright/test';
import {ApiMocker} from '../../../utils/api-mocker';

interface StarWarsFixtures {
    searchPage: StarWarsSearchPage;
    apiMocker: ApiMocker;
}

export const searchFixtureTest = base.extend<StarWarsFixtures>({
    apiMocker: [async ({ page }, use) => {
        const mocker = new ApiMocker(page);
        await mocker.enableMocking();
        await use(mocker);
        await mocker.disableMocking();
    }, {auto: true}],
    searchPage: async ({page}, use) => {
        const searchPage = new StarWarsSearchPage(page);
        await searchPage.navigateToApp();
        await use(searchPage);
    }
});
