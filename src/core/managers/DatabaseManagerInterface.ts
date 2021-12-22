import { Collection } from '..';

export interface DatabaseManagerInterface {
    readonly collection: Collection

    write(file: string, data: any): object
    delete(file: string): void
    read(file: string): string
}