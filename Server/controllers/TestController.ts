import {TestUpdateForm, testService } from '../services/TestService';
import type { TestCreationForm } from '../services/TestService';
import { Get, Route, Post, Body, Controller, SuccessResponse, Put, Response, Delete } from 'tsoa';
import type { TestInfo } from '../models/TestInfo';


@Route("test")
class TestController extends Controller {
    @SuccessResponse("201", "Created") // Custom success response
    @Post("/")
    public async createTest(
        @Body() test:TestCreationForm): Promise<TestInfo | null> {
            let res = await testService.createTest(test);

            return res;
    }

    @Get("/")
    public async getTests(): Promise<TestInfo[]> {
        let res = await testService.getAllTests();

        return res;
    }

    @Get("/:id")
    public async getTest(id: string): Promise<TestInfo | null> {
        let res = await testService.GetTest(id);

        return res;
    }

    @SuccessResponse("204", "Updated") // Custom success response
    @Response("400", "Bad Request") // Custom error response
    @Put("/:id")
    public async updateTest(id: string, @Body() test: TestUpdateForm): Promise<void> {
        let res = await testService.updateTest(id, test);

        if (res) {
            this.setStatus(204); // set return status 204
        } else {
            this.setStatus(400);
        }
    }

    @SuccessResponse("204", "Deleted") // Custom success response
    @Response("400", "Bad Request") // Custom error response
    @Delete("/:id")
    public async deleteTest(id: string): Promise<void> {
        let res = await testService.deleteTest(id);

        if (res) {
            this.setStatus(204); // set return status 204
        } else {
            this.setStatus(400);
        }
    }

}

export {
    TestController
}