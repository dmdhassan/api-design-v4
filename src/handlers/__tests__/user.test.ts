import * as user from '../user';

describe("user handler", () => {
    it("should do create a new user", async () => {
        const req = {body: {username: "hassan", password: "12345"}};
        const res = {json({token}) {
            expect(token).toBeTruthy()
        }};


        await user.createNewUser(req, res, () => {

        });
    });
});