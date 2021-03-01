import request from 'supertest'
import { getConnection } from 'typeorm'
import { app } from '../app'
import createConnection from '../database/index'

describe("Surveys", () => {

    beforeAll(async () => {
        const testConnection = await createConnection()
        await testConnection.runMigrations()        
    })

afterAll(async () => {
        const testConnection = getConnection()
        await testConnection.dropDatabase()
        await testConnection.close()
    })

    it('Should be able to create a new Survey', async () => {

        const bodyToSend = {
            title: "A survey title",
            description: "A survey description"
        }

        const response =  await request(app)
            .post("/surveys")
            .send(bodyToSend)

            expect(response.status).toBe(201)
    })

    it('Should return all the surveys', async () => {
        const response =  await request(app)
         .get("/surveys")

         expect(response.body.length).toBe(1)
 })

})