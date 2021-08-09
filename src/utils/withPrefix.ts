/**
 * @param {string} nameSpace - The string to use as a prefix
 * @param {string} actionName - The action name to add the prefix to
 * @return {function} that accepts @param {string} actionName and adds @param prefix to it.
 */

export const withPrefix: (nameSpace: string) => (actionName: string) => string =
    nameSpace => actionName => `${nameSpace}/${actionName}`;

export default withPrefix;
