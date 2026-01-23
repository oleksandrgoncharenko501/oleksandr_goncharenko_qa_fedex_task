import {SWAPIResponse} from './people-mocks';
import {defaultApiMetadata} from './default-mock';

export const emptySearchResponse: SWAPIResponse = {
    message: 'ok',
    result: [],
    timestamp: new Date().toISOString(),
    ...defaultApiMetadata
};
