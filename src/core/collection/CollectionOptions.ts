import { Client } from '..';

export interface CollectionOptions {
    /**
     * Name of this collection
     */
    name: string
    /**
     * Database client
     */
    client: Client
}