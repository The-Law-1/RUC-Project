import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema;

const TestSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        collection: "tests"
    }
);

const TestModel = mongoose.model("Test", TestSchema);

export {
    TestModel
}