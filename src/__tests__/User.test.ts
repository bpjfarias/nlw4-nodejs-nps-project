import request from 'supertest'
import { getConnection } from 'typeorm'
import { app } from '../app'
import createConnection from '../database/index'

describe("Users", () => {

    beforeAll(async () => {
        const testConnection = await createConnection()
        await testConnection.runMigrations()        
    })

    afterAll(async () => {
        const testConnection = getConnection()
        await testConnection.dropDatabase()
        await testConnection.close()
    })

    it('Should be able to create a new User', async () => {

        const bodyToSend = {
            email: "email@domain.com",
            name: "Name Example"
        }

        const response =  await request(app)
            .post("/users")
            .send(bodyToSend)

            expect(response.status).toBe(201)
    })

    it('Should NOT be able to create an user with exists email', async () => {

        const bodyToSend = {
            email: "email@domain.com",
            name: "Name Example"
        }

        const response =  await request(app)
            .post("/users")
            .send(bodyToSend)

            expect(response.status).toBe(400)


    })
})