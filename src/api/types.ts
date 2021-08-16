/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNode } from '@apollo/client';
import { ExecutionResult as GraphQLExecutionResult } from 'graphql';

interface ExecutionResult<
    TData = {
        [key: string]: any;
    }
> extends GraphQLExecutionResult {
    data?: TData | null;
}

export type ClientAction = (
    gql: DocumentNode,
    variables: Record<string, any>
) => Promise<ExecutionResult>;
