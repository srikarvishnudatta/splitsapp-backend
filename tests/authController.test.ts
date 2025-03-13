import * as authService from "../src/service/auth.service";
import {app} from "../src/index"
jest.mock('../src/service/auth.service')
import request from "supertest"

describe('login', () =>{
    beforeEach(() =>{
        jest.clearAllMocks();
    });

    it('POST /auth/login should return a accessToken on success', async () =>{
        const mockCreds = [{
            email:"srikarvishnudatta@gmail.com",
            password:"Srikar@2001"
        }];
        
        (authService.loginUser as jest.Mock).mockResolvedValue(mockCreds);

        const response = await request(app).post('/login');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(String)

    });
})