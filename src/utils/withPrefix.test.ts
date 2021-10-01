import faker from 'faker';

import withPrefix from './withPrefix';

describe('withPrefix', () => {
    it('returns a function that adds the provided prefix to the param it receives', () => {
        const nameSpace = faker.datatype.string();
        const withNameSpace = withPrefix(nameSpace);
        const stringToBePrefixed = faker.datatype.string();

        const actual = withNameSpace(stringToBePrefixed);

        expect(actual).toEqual(`${nameSpace}/${stringToBePrefixed}`);
    });
});
