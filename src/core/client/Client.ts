import { ClientOptions, AbstractClient } from '.'
import { Collection } from '..'
import path from 'path'
import fs from 'fs'

/**
 * Entry point of this database
 */
export class Client implements AbstractClient {
    readonly collections: Map<any, Collection>

    /**
     * The Client() constructor creates {@link Client} objects
     * @param {ClientOptions} options - Options which provided to client
     */
    constructor(public options: ClientOptions = { path: 'db' }) {
            this.collections = new Map()
        }

        /**
         * Loads all Collections to cache
         * @returns {Client}
         */
    connect(): this {
        this.options.path = path.join(process.cwd(), this.options.path)
        if(this.options.iterable && this.options.saveTo) {
            this.collections.set(this.options.saveTo, new Collection({ name: this.options.saveTo, client: this}, this.options.iterable))
        }

        if(!fs.existsSync(this.options.path)) {
            fs.mkdirSync(this.options.path)
        }

        const dirs = fs.readdirSync(this.options.path)
        for (const dir of dirs) {
            if(fs.lstatSync(path.join(this.options.path, dir)).isDirectory()) {
                this._loadData(path.join(this.options.path, dir), dir)
            }
        }

        return this
    }

    _loadData(where: string, col: string): any {
        const files = fs.readdirSync(where)
        
        for (const file of files) {
            if(file.endsWith('.json')) {
                const name = file.split('.')[0]
                const data = require(path.join(where, file))

                const collection = this.collections.get(col)

                if(collection) collection.set(name, data)
                else this.collections.set(col, new Collection({ name: col, client: this }).set(name, data))
            }
        }
    }
}