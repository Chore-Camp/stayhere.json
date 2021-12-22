import { Collection as discordoo } from '@discordoo/collection';
import { Client, CollectionOptions } from '..';
import { DatabaseManager } from '..';

/**
 * Util's collection, that extends {@link discordoo} collection
 */
export class Collection extends discordoo {
    readonly client: Client
    readonly name: string
    private readonly manager: DatabaseManager

    /**
     * The Collection() constructor creates {@link Collection} objects
     * 
     * @constructor
     * @param {Client} client - Database client
     * @param {any} entries - Entries, that sends to original collection
     */
    constructor(options: CollectionOptions, entries?: any) {
        super(entries)
        this.client = options.client
        this.name = options.name
        this.manager = new DatabaseManager(this)
    }

    /**
     * Sets a new element in the collection
     * 
     * @param {any} key - Key which binds to {@link value}
     * @param {any} value  - Value which binds to {@link key}
     * @returns {Collection}
     */
    set(key: any, value: any): this {
        this.manager.write(String(key), value)
        return super.set(key, value)
    }

    /**
     * Deletes document by provided key
     * 
     * @param {any} key - Document name
     */
    delete(key: any): boolean {
        this.manager.delete(String(key))
        return super.delete(key)
    }
}