import { JobCardModel, BaseModel } from "../models/JobCardModel";
import *  as MongoDB from "mongodb";
import { MongoService, JobImagesType, ValidDB, ValidCollection, DB_NAMES, COLLECTION_NAMES } from '../mongo-service';
let Validator = require("fastest-validator");

/* create an instance of the validator */
let jobCardValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* jobCardModel validator shema */
const jobCardVSchema = {
	guid: { type: "string", min: 3 },

	first_name: { type: "string", min: 1, max: 50, pattern: namePattern },
	last_name: { type: "string", min: 1, max: 50, pattern: namePattern },
	email: { type: "email", max: 75 },
	zipcode: { type: "string", max: 5, pattern: zipCodePattern },

	password: { type: "string", min: 2, max: 50, pattern: passwordPattern }
};

/* static jobCardModel service class */
export class PlatingService {

	static async getPictures(jobID: number, jobDate: Date, index: number = 0): Promise<JobImagesType>{
		let ret: JobImagesType = {base64: null, fileCount: 0, fileIndex: index};
		if (jobID && jobDate){
			ret = await MongoService.getInstance().getJobImages(jobID, jobDate, index);			
		} else {
			ret.error = "No job specified";
		}
		return ret;
	}

	static async search(db: ValidDB, collection: ValidCollection, body: {limit?: number, sort?: {[field:string]: -1 | 1}, jobDate?: { $gte: string | Date, $lte: string | Date } }): Promise<Array<BaseModel>> {

		if (body.jobDate) {
			body.jobDate.$gte = new Date(body.jobDate.$gte);
			body.jobDate.$lte = new Date(body.jobDate.$lte);
		}

		if (DB_NAMES.indexOf(db)  === -1 || COLLECTION_NAMES.indexOf(collection) === -1){
			throw new Error("Invalid db or collection");
		}
		if (db === "settings" && collection !== "settings"){
			throw new Error("settings db has only settings collection");
		}
		let limit = body.limit || 50;
		let sort = body.sort || {_id: -1};
		let results = await MongoService.getInstance().find(db, collection, body, limit, sort);
		if (!results || !results.length) {
			for (let key in body) {
				let value = body[key];
				let type = typeof value;
				if (value && type === "string") {
					body[key] = new RegExp(value, "i");
				} else if (value && type === "number") {
					body[key] = new RegExp("" + value);
				}
			}
			results = await MongoService.getInstance().find(db, collection, body, limit, sort);
		}
		return results;
	}



	static async retrieve(db: ValidDB, collection: ValidCollection, primaryKeyValue: any): Promise<BaseModel> {
		return await MongoService.getInstance().findPrimary(db, collection, primaryKeyValue);
	}


	static async patch(db: ValidDB, collection: ValidCollection, primaryKeyValue: any, body: any): Promise<BaseModel> {
		return await MongoService.getInstance().findAndModify(db, collection, primaryKeyValue, body);		
	}

	static async create(db: ValidDB, collection: ValidCollection, body: any): Promise<BaseModel> {
		return await MongoService.getInstance().insertOne(db, collection, body);		
	}

	static async delete(db: ValidDB, collection: ValidCollection, primaryKeyValue: any): Promise<void> {
		let hasDelete = false;
		if (hasDelete){
			await MongoService.getInstance().deletePrimary(db, collection, primaryKeyValue);
		} else {
			throw new Error("Delete not implemented");
		}		
	}
}