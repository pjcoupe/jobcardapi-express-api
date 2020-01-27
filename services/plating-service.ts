import { JobCardModel } from "../models/JobCardModel";
import *  as MongoDB from "mongodb";
import { MongoService } from '../mongo-service';
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

	static async getPictures(job: JobCardModel): Promise<Array<string>>{
		if (job && job.jobID){
			return await MongoService.getInstance().getJobImages(job);
		}
		return [];
	}
	static async search(body: { jobDate?: { $gte: string | Date, $lte: string | Date } }): Promise<Array<JobCardModel>> {
		if (body.jobDate) {
			body.jobDate.$gte = new Date(body.jobDate.$gte);
			body.jobDate.$lte = new Date(body.jobDate.$lte);
		}
		let results = await MongoService.getInstance().findJobCard(body);
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
			results = await MongoService.getInstance().findJobCard(body);
		}
		return results;
	}
	static create(data) {

		var vres = jobCardValidator.validate(data, jobCardVSchema);

		/* validation failed */
		if (!(vres === true)) {
			let errors = {}, item;

			for (const index in vres) {
				item = vres[index];

				errors[item.field] = item.message;
			}

			throw {
				name: "ValidationError",
				message: errors
			};
		}

		let jobCardModel = new JobCardModel(data);

		return jobCardModel;
	}

	static async retrieve(uid): Promise<JobCardModel> {
		if (uid) {
			let results = await MongoService.getInstance().findJobCard({jobID: Number(uid)});
			if (results && results.length){
				return new JobCardModel(results[0]);
			}
			return null;
		}
		else {
			throw new Error('Unable to retrieve a jobCardModel by (uid:' + uid + ')');
		}
	}

	static update(uid, data) {
		if (false) {

		}
		else {
			throw new Error('Unable to retrieve a jobCardModel by (uid:' + uid + ')');
		}
	}

	static delete(uid) {
		if (false) {

		}
		else {
			throw new Error('Unable to retrieve a jobCardModel by (uid:' + uid + ')');
		}
	}
}