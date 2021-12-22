import { Collection } from '@discordoo/collection'
import { Client, ClientOptions } from './'

export interface AbstractClient {
    options: ClientOptions
    collections: Map<any, Collection>

    connect(): Client
    _loadData(where: string, col: string): any
}