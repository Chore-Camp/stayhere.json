export interface ClientOptions {
    /**
     * A collection, where must be saved iterable data
     */
    saveTo?: string
    /**
     * Database path, where saves all data by this util
     */
    path: string
    /**
     * Iterable data, which will be saved to collection, which provided in {@link saveTo}
     */
    iterable?: Iterable<readonly [any, any]>
}