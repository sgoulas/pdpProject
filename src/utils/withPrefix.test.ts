import withPrefix from './withPrefix';

describe('withPrefix suite', () => {
    it('returns a function that adds the provided prefix to the param it receives', () => {
        const nameSpace = 'mockNameSpace';
        const withNameSpace = withPrefix(nameSpace);
        const stringToBePrefixed = 'stringToBePrefixed';

        const actual = withNameSpace(stringToBePrefixed);

        expect(actual).toEqual(`${nameSpace}/${stringToBePrefixed}`);
    });
});
