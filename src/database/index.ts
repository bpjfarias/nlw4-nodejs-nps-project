import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {

    const productionOptions = await getConnectionOptions()

    const path_to_test_database = './src/database/database.test.sqlite'

    return createConnection(
        Object.assign(productionOptions, {
            database: process.env.NODE_ENV === 'test' ? path_to_test_database : productionOptions.database
        })
    )
}