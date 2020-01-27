"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobCardModel_1 = require("../models/JobCardModel");
const mongo_service_1 = require("../mongo-service");
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
class PlatingService {
    static getPictures(job) {
        return __awaiter(this, void 0, void 0, function* () {
            if (job && job.jobID) {
                return yield mongo_service_1.MongoService.getInstance().getJobImages(job);
            }
            return [];
        });
    }
    static search(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.jobDate) {
                body.jobDate.$gte = new Date(body.jobDate.$gte);
                body.jobDate.$lte = new Date(body.jobDate.$lte);
            }
            let results = yield mongo_service_1.MongoService.getInstance().findJobCard(body);
            if (!results || !results.length) {
                for (let key in body) {
                    let value = body[key];
                    let type = typeof value;
                    if (value && type === "string") {
                        body[key] = new RegExp(value, "i");
                    }
                    else if (value && type === "number") {
                        body[key] = new RegExp("" + value);
                    }
                }
                results = yield mongo_service_1.MongoService.getInstance().findJobCard(body);
            }
            return results;
        });
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
        let jobCardModel = new JobCardModel_1.JobCardModel(data);
        return jobCardModel;
    }
    static retrieve(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (uid) {
                let results = yield mongo_service_1.MongoService.getInstance().findJobCard({ jobID: Number(uid) });
                if (results && results.length) {
                    return new JobCardModel_1.JobCardModel(results[0]);
                }
                return null;
            }
            else {
                throw new Error('Unable to retrieve a jobCardModel by (uid:' + uid + ')');
            }
        });
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
exports.PlatingService = PlatingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGluZy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxhdGluZy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEseURBQXNEO0FBRXRELG9EQUFnRDtBQUNoRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUU3Qyx5Q0FBeUM7QUFDekMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXZDLG9FQUFvRTtBQUNwRSxJQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztBQUNwQyxJQUFJLGNBQWMsR0FBRywwQkFBMEIsQ0FBQztBQUNoRCxJQUFJLGVBQWUsR0FBRyxpREFBaUQsQ0FBQztBQUV4RSxrQ0FBa0M7QUFDbEMsTUFBTSxjQUFjLEdBQUc7SUFDdEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO0lBRWhDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7SUFDckUsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRTtJQUNwRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDakMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUU7SUFFNUQsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLGVBQWUs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QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNaO2lCQUNJO2dCQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQzFFO1FBQ0YsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSTtRQUN0QixJQUFJLEtBQUssRUFBRTtTQUVWO2FBQ0k7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUMxRTtJQUNGLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUc7UUFDaEIsSUFBSSxLQUFLLEVBQUU7U0FFVjthQUNJO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDMUU7SUFDRixDQUFDO0NBQ0Q7QUFuRkQsd0NBbUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSm9iQ2FyZE1vZGVsIH0gZnJvbSBcIi4uL21vZGVscy9Kb2JDYXJkTW9kZWxcIjtcbmltcG9ydCAqICBhcyBNb25nb0RCIGZyb20gXCJtb25nb2RiXCI7XG5pbXBvcnQgeyBNb25nb1NlcnZpY2UgfSBmcm9tICcuLi9tb25nby1zZXJ2aWNlJztcbmxldCBWYWxpZGF0b3IgPSByZXF1aXJlKFwiZmFzdGVzdC12YWxpZGF0b3JcIik7XG5cbi8qIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgdmFsaWRhdG9yICovXG5sZXQgam9iQ2FyZFZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKTtcblxuLyogdXNlIHRoZSBzYW1lIHBhdHRlcm5zIGFzIG9uIHRoZSBjbGllbnQgdG8gdmFsaWRhdGUgdGhlIHJlcXVlc3QgKi9cbmxldCBuYW1lUGF0dGVybiA9IC8oW0EtWmEtelxcLVxc4oCZXSkqLztcbmxldCB6aXBDb2RlUGF0dGVybiA9IC9eWzAtOV17NX0oPzotWzAtOV17NH0pPyQvO1xubGV0IHBhc3N3b3JkUGF0dGVybiA9IC9eKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qWzAtOV0pW2EtekEtWjAtOV0rJC87XG5cbi8qIGpvYkNhcmRNb2RlbCB2YWxpZGF0b3Igc2hlbWEgKi9cbmNvbnN0IGpvYkNhcmRWU2NoZW1hID0ge1xuXHRndWlkOiB7IHR5cGU6IFwic3RyaW5nXCIsIG1pbjogMyB9LFxuXG5cdGZpcnN0X25hbWU6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWluOiAxLCBtYXg6IDUwLCBwYXR0ZXJuOiBuYW1lUGF0dGVybiB9LFxuXHRsYXN0X25hbWU6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWluOiAxLCBtYXg6IDUwLCBwYXR0ZXJuOiBuYW1lUGF0dGVybiB9LFxuXHRlbWFpbDogeyB0eXBlOiBcImVtYWlsXCIsIG1heDogNzUgfSxcblx0emlwY29kZTogeyB0eXBlOiBcInN0cmluZ1wiLCBtYXg6IDUsIHBhdHRlcm46IHppcENvZGVQYXR0ZXJuIH0sXG5cblx0cGFzc3dvcmQ6IHsgdHlwZTogXCJzdHJpbmdcIiwgbWluOiAyLCBtYXg6IDUwLCBwYXR0ZXJuOiBwYXNzd29yZFBhdHRlcm4gfVxufTtcblxuLyogc3RhdGljIGpvYkNhcmRNb2RlbCBzZXJ2aWNlIGNsYXNzICovXG5leHBvcnQgY2xhc3MgUGxhdGluZ1NlcnZpY2Uge1xuXG5cdHN0YXRpYyBhc3luYyBnZXRQaWN0dXJlcyhqb2I6IEpvYkNhcmRNb2RlbCk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj57XG5cdFx0aWYgKGpvYiAmJiBqb2Iuam9iSUQpe1xuXHRcdFx0cmV0dXJuIGF3YWl0IE1vbmdvU2VydmljZS5nZXRJbnN0YW5jZSgpLmdldEpvYkltYWdlcyhqb2IpO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblx0c3RhdGljIGFzeW5jIHNlYXJjaChib2R5OiB7IGpvYkRhdGU/OiB7ICRndGU6IHN0cmluZyB8IERhdGUsICRsdGU6IHN0cmluZyB8IERhdGUgfSB9KTogUHJvbWlzZTxBcnJheTxKb2JDYXJkTW9kZWw+PiB7XG5cdFx0aWYgKGJvZHkuam9iRGF0ZSkge1xuXHRcdFx0Ym9keS5qb2JEYXRlLiRndGUgPSBuZXcgRGF0ZShib2R5LmpvYkRhdGUuJGd0ZSk7XG5cdFx0XHRib2R5LmpvYkRhdGUuJGx0ZSA9IG5ldyBEYXRlKGJvZHkuam9iRGF0ZS4kbHRlKTtcblx0XHR9XG5cdFx0bGV0IHJlc3VsdHMgPSBhd2FpdCBNb25nb1NlcnZpY2UuZ2V0SW5zdGFuY2UoKS5maW5kSm9iQ2FyZChib2R5KTtcblx0XHRpZiAoIXJlc3VsdHMgfHwgIXJlc3VsdHMubGVuZ3RoKSB7XG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gYm9keSkge1xuXHRcdFx0XHRsZXQgdmFsdWUgPSBib2R5W2tleV07XG5cdFx0XHRcdGxldCB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXHRcdFx0XHRpZiAodmFsdWUgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdGJvZHlba2V5XSA9IG5ldyBSZWdFeHAodmFsdWUsIFwiaVwiKTtcblx0XHRcdFx0fSBlbHNlIGlmICh2YWx1ZSAmJiB0eXBlID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdFx0Ym9keVtrZXldID0gbmV3IFJlZ0V4cChcIlwiICsgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXN1bHRzID0gYXdhaXQgTW9uZ29TZXJ2aWNlLmdldEluc3RhbmNlKCkuZmluZEpvYkNhcmQoYm9keSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cdHN0YXRpYyBjcmVhdGUoZGF0YSkge1xuXG5cdFx0dmFyIHZyZXMgPSBqb2JDYXJkVmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIGpvYkNhcmRWU2NoZW1hKTtcblxuXHRcdC8qIHZhbGlkYXRpb24gZmFpbGVkICovXG5cdFx0aWYgKCEodnJlcyA9PT0gdHJ1ZSkpIHtcblx0XHRcdGxldCBlcnJvcnMgPSB7fSwgaXRlbTtcblxuXHRcdFx0Zm9yIChjb25zdCBpbmRleCBpbiB2cmVzKSB7XG5cdFx0XHRcdGl0ZW0gPSB2cmVzW2luZGV4XTtcblxuXHRcdFx0XHRlcnJvcnNbaXRlbS5maWVsZF0gPSBpdGVtLm1lc3NhZ2U7XG5cdFx0XHR9XG5cblx0XHRcdHRocm93IHtcblx0XHRcdFx0bmFtZTogXCJWYWxpZGF0aW9uRXJyb3JcIixcblx0XHRcdFx0bWVzc2FnZTogZXJyb3JzXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGxldCBqb2JDYXJkTW9kZWwgPSBuZXcgSm9iQ2FyZE1vZGVsKGRhdGEpO1xuXG5cdFx0cmV0dXJuIGpvYkNhcmRNb2RlbDtcblx0fVxuXG5cdHN0YXRpYyBhc3luYyByZXRyaWV2ZSh1aWQpOiBQcm9taXNlPEpvYkNhcmRNb2RlbD4ge1xuXHRcdGlmICh1aWQpIHtcblx0XHRcdGxldCByZXN1bHRzID0gYXdhaXQgTW9uZ29TZXJ2aWNlLmdldEluc3RhbmNlKCkuZmluZEpvYkNhcmQoe2pvYklEOiBOdW1iZXIodWlkKX0pO1xuXHRcdFx0aWYgKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGgpe1xuXHRcdFx0XHRyZXR1cm4gbmV3IEpvYkNhcmRNb2RlbChyZXN1bHRzWzBdKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHJldHJpZXZlIGEgam9iQ2FyZE1vZGVsIGJ5ICh1aWQ6JyArIHVpZCArICcpJyk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHVwZGF0ZSh1aWQsIGRhdGEpIHtcblx0XHRpZiAoZmFsc2UpIHtcblxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHJldHJpZXZlIGEgam9iQ2FyZE1vZGVsIGJ5ICh1aWQ6JyArIHVpZCArICcpJyk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGRlbGV0ZSh1aWQpIHtcblx0XHRpZiAoZmFsc2UpIHtcblxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHJldHJpZXZlIGEgam9iQ2FyZE1vZGVsIGJ5ICh1aWQ6JyArIHVpZCArICcpJyk7XG5cdFx0fVxuXHR9XG59Il19