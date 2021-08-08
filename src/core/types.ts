/**
 * @typedef {Object} ActionHandler - creates a new type named 'ActionHandler'
 * @property {S} S - an interface that describes a state (or state slice)
 * @property {A} A - an action specific to this state (or state slice)
 *
 * @returns {S} S - an object of type S that correspond to the state (or state slice) interface
 */

type ActionHandler<S, A = Record<string, never>> = (
    state: S,
    { payload }: { payload: A }
) => S;

export type { ActionHandler };
