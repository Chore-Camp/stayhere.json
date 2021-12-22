import { Collection } from ".."
import { DatabaseManagerInterface } from "."
import fs from 'fs'
import path from 'path'

/**
 * Database manager, which reads, deletes and writes documents
 */
export class DatabaseManager implements DatabaseManagerInterface {
    /**
     * The DatabaseManager() constructor creates {@link DatabaseManager} objects
     * 
     * @param {Collection} collection - {@link Collection}, to which {@link DatabaseManager} attachs
     */
    constructor(public collection: Collection) {}

    /**
     * Writes or overwrites document in collection
     * 
     * @param {string} file - Document name
     * @param {any} data - Data which will be writed to this document
     * @returns 
     */
    write(file: string, data: any): object {
        const dataCollection = this.collection.get(file)
        const obj = JSON.stringify({ ...dataCollection, ...data }, null, '\t')

        fs.writeFile(
            path.join(this.collection.client.options.path, this.collection.name, file + '.json'),
            obj,
            (err) => {
                if(err) throw new Error(`Error while writing file.\nError name: ${err.name}.\n Message: ${err.message}`)
        })
        return { ...dataCollection, ...data }
    }

    /**
     * Reads document
     * 
     * @param {string} file - Document, which must be read
     * @returns {string}
     */
    read(file: string): string {
        return fs.readFileSync(path.join(this.collection.client.options.path, this.collection.name, file)).toString()
    }

    /**
     * Deletes document
     * 
     * @param {string} file - Document which must be deleted
     */
    delete(file: string): void {
        fs.unlink(
            path.join(this.collection.client.options.path, this.collection.name, file + '.json'),
            (err) => {
                if(err) throw new Error(`Error while deleting file.\nError name: ${err.name}.\n Message: ${err.message}`)
        })
    }
}