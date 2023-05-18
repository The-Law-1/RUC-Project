import { TestModel } from "../models/TestModel";
import { Document, Schema } from "mongoose";
import { TestInfo } from "../models/TestInfo";

export type TestCreationForm = { name: string }
export type TestUpdateForm = { name: string }

export class TestService {
    // create a new test
    public createTest = async (newTest: TestCreationForm) : Promise<TestInfo | null> => {
        const test = new TestModel(newTest);

        let res = await test.save()
                .then((data: Document) => {
                    return new TestInfo(data.get("name"));
                })
                .catch((error: any) => {
                    return null;
                    //throw error; // you would want to create error types here eg. new BadRequestError(error) So you can catch them in your controller
                });
        return res;
    }

    // delete a test
    public deleteTest = async (id: string) : Promise<boolean> => {
        var test = await TestModel.deleteOne({ _id: id });

        if (test.deletedCount > 0) {
            return true;
        }
        return false;
    }

    // update a test, would take an "updateTest" type
    public updateTest = async (id: string, testUpdateForm: TestUpdateForm) : Promise<boolean> => {
        var test = await TestModel.findById(id);

        if (test) {
            test.name = testUpdateForm.name;
            await test.save();
            return true;
        }
        return false;
    }

    // get all tests
    public getAllTests = async () : Promise<TestInfo[]> => {
        const tests = await TestModel.find();

        let testInfos = tests.map(x => new TestInfo(x.get("name")));

        return testInfos;
    }

    public GetTest = async (id: string) : Promise<TestInfo | null> => {
        // Find document by _id
        const document = await TestModel.findById(id);

        if (document) {
            return new TestInfo(document.get("name"));
        }
        return null;
    }
}

export const testService = new TestService();