/**
 * @param {string} nameSpace - The string to use as a prefix
 * @param {string} actionName - The action name to add the prefix to
 * @return {string} the actionName @param prefixed with the nameSpace @param
 */

const addNameSpace: (nameSpace: string, actionName: string) => string = (
    namespace,
    actionName
) => `${namespace}/${actionName}`;

export default addNameSpace;
