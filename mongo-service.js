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
const mongodb_1 = require("mongodb");
const JobCardModel_1 = require("./models/JobCardModel");
const path = require("path");
const fs = require('fs');
const { resolve } = require('path');
const { readdir } = fs.promises;
const baseDrive = process.env["USER"] === "peterc" ? path.sep + "Users" + path.sep + "peterc" + path.sep + "Pictures" : "D:";
class MongoService {
    constructor() {
        this.fileLocation = {};
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    getJobImages(job) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield this.getJobIDPicturesFileNames(job.jobID, job.jobDate);
            let base64Array = [];
            try {
                for (let file of files) {
                    let bitmap = fs.readFileSync(file);
                    // convert binary data to base64 encoded string
                    base64Array.push(Buffer.alloc(bitmap.length * 2, bitmap).toString('base64'));
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                return base64Array;
            }
        });
    }
    getJobIDPicturesFileNames(jobID, date) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = "" + jobID;
            let files = this.fileLocation[id];
            if (!files && date) {
                yield this.processMonthPictures(date);
                files = this.fileLocation[id];
            }
            return files || [];
        });
    }
    processMonthPictures(date) {
        return __awaiter(this, void 0, void 0, function* () {
            let year = "" + date.getFullYear();
            let nameOfMonth = this.months[date.getMonth()];
            let dir = path.sep + "Kodak Pictures" + path.sep + year + path.sep + year + " " + nameOfMonth;
            let files = yield this.getFiles(baseDrive + dir);
            for (let file of files) {
                let lastSlash = file.lastIndexOf(path.sep);
                if (lastSlash > 0) {
                    let sub = file.substr(lastSlash + 1);
                    let split = sub.split(" ");
                    let existingArray = this.fileLocation[split[0]];
                    if (!existingArray) {
                        existingArray = [];
                        this.fileLocation[split[0]] = existingArray;
                    }
                    if (existingArray.indexOf(file) === -1) {
                        existingArray.push(file);
                    }
                }
            }
        });
    }
    getFiles(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const dirents = yield readdir(dir, { withFileTypes: true });
            const files = yield Promise.all(dirents.map((dirent) => {
                const res = resolve(dir, dirent.name);
                return dirent.isDirectory() ? this.getFiles(res) : res;
            }));
            return Array.prototype.concat(...files);
        });
    }
    static getInstance() {
        if (!MongoService._instance) {
            MongoService._instance = new MongoService();
            MongoService._instance.init();
        }
        return MongoService._instance;
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
        });
    }
    findJobCard(query = {}, limit = 50, sort = { _id: -1 }) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield this.client.db().collection("jobCard").find(query).limit(limit).sort(sort).toArray();
            let ret = [];
            for (let result of results) {
                ret.push(new JobCardModel_1.JobCardModel(result));
            }
            return ret;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
             * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
             */
            const uri = "mongodb://localhost:27017/plating";
            this.client = new mongodb_1.MongoClient(uri);
            try {
                // Connect to the MongoDB cluster
                yield this.client.connect();
            }
            catch (e) {
                console.error(e);
            }
            finally {
            }
        });
    }
}
exports.MongoService = MongoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vbmdvLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBc0M7QUFDdEMsd0RBQXFEO0FBQ3JELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUVoQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuSCxNQUFhLFlBQVk7SUFBekI7UUFFb0IsaUJBQVksR0FBcUMsRUFBRSxDQUFDO1FBNEI1RCxXQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBMkVoSixDQUFDO0lBckdTLFlBQVksQ0FBQyxHQUFpQjs7WUFDaEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekUsSUFBSSxXQUFXLEdBQWUsRUFBRSxDQUFDO1lBRWpDLElBQUc7Z0JB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QUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN0QztZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBRWEsSUFBSTs7WUFDZDs7O2VBR0c7WUFDSCxNQUFNLEdBQUcsR0FBRyxtQ0FBbUMsQ0FBQztZQUVoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVuQyxJQUFJO2dCQUNBLGlDQUFpQztnQkFDakMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBRS9CO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQjtvQkFBUzthQUVUO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUF6R0Qsb0NBeUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tIFwibW9uZ29kYlwiO1xuaW1wb3J0IHsgSm9iQ2FyZE1vZGVsIH0gZnJvbSBcIi4vbW9kZWxzL0pvYkNhcmRNb2RlbFwiO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgeyByZXNvbHZlIH0gPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB7IHJlYWRkaXIgfSA9IGZzLnByb21pc2VzO1xuXG5jb25zdCBiYXNlRHJpdmUgPSBwcm9jZXNzLmVudltcIlVTRVJcIl0gPT09IFwicGV0ZXJjXCIgPyBwYXRoLnNlcCtcIlVzZXJzXCIrcGF0aC5zZXArXCJwZXRlcmNcIitwYXRoLnNlcCtcIlBpY3R1cmVzXCIgOiBcIkQ6XCI7XG5leHBvcnQgY2xhc3MgTW9uZ29TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBmaWxlTG9jYXRpb246IHtbam9iSWQ6c3RyaW5nXTogQXJyYXk8c3RyaW5nPiB9ID0ge307XG5cbiAgICBhc3luYyBnZXRKb2JJbWFnZXMoam9iOiBKb2JDYXJkTW9kZWwpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgICAgICAgbGV0IGZpbGVzID0gYXdhaXQgdGhpcy5nZXRKb2JJRFBpY3R1cmVzRmlsZU5hbWVzKGpvYi5qb2JJRCwgam9iLmpvYkRhdGUpO1xuICAgICAgICBsZXQgYmFzZTY0QXJyYXk6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKXtcbiAgICAgICAgICAgICAgICBsZXQgYml0bWFwID0gZnMucmVhZEZpbGVTeW5jKGZpbGUpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgYmluYXJ5IGRhdGEgdG8gYmFzZTY0IGVuY29kZWQgc3RyaW5nXG4gICAgICAgICAgICAgICAgYmFzZTY0QXJyYXkucHVzaChCdWZmZXIuYWxsb2MoYml0bWFwLmxlbmd0aCAqIDIsYml0bWFwKS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgICBcbiAgICAgICAgfSBjYXRjaCAoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgICAgICAgICAgICBcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHJldHVybiBiYXNlNjRBcnJheTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRKb2JJRFBpY3R1cmVzRmlsZU5hbWVzKGpvYklEOiBzdHJpbmcgfCBudW1iZXIsIGRhdGU6IERhdGUpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgICAgICAgbGV0IGlkID0gXCJcIiArIGpvYklEO1xuICAgICAgICBsZXQgZmlsZXMgPSB0aGlzLmZpbGVMb2NhdGlvbltpZF07XG4gICAgICAgIGlmICghZmlsZXMgJiYgZGF0ZSl7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByb2Nlc3NNb250aFBpY3R1cmVzKGRhdGUpO1xuICAgICAgICAgICAgZmlsZXMgPSB0aGlzLmZpbGVMb2NhdGlvbltpZF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGVzIHx8IFtdO1xuICAgIH1cbiAgICBwcml2YXRlIG1vbnRocyA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdO1xuICAgIGFzeW5jIHByb2Nlc3NNb250aFBpY3R1cmVzKGRhdGU6IERhdGUpe1xuICAgICAgICBsZXQgeWVhciA9IFwiXCIgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBuYW1lT2ZNb250aCA9IHRoaXMubW9udGhzW2RhdGUuZ2V0TW9udGgoKV07XG4gICAgICAgIGxldCBkaXIgPSBwYXRoLnNlcCArIFwiS29kYWsgUGljdHVyZXNcIitwYXRoLnNlcCt5ZWFyK3BhdGguc2VwK3llYXIrXCIgXCIrbmFtZU9mTW9udGg7XG4gICAgICAgIGxldCBmaWxlcyA9IGF3YWl0IHRoaXMuZ2V0RmlsZXMoYmFzZURyaXZlICsgZGlyKTtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcyl7XG4gICAgICAgICAgICBsZXQgbGFzdFNsYXNoID0gZmlsZS5sYXN0SW5kZXhPZihwYXRoLnNlcCk7XG4gICAgICAgICAgICBpZiAobGFzdFNsYXNoID4gMCl7XG4gICAgICAgICAgICAgICAgbGV0IHN1YiA9IGZpbGUuc3Vic3RyKGxhc3RTbGFzaCsxKTtcbiAgICAgICAgICAgICAgICBsZXQgc3BsaXQgPSBzdWIuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgICAgIGxldCBleGlzdGluZ0FycmF5ID0gdGhpcy5maWxlTG9jYXRpb25bc3BsaXRbMF1dO1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3RpbmdBcnJheSl7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlTG9jYXRpb25bc3BsaXRbMF1dID0gZXhpc3RpbmdBcnJheTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nQXJyYXkuaW5kZXhPZihmaWxlKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0FycmF5LnB1c2goZmlsZSk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRGaWxlcyhkaXIpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgICAgICAgY29uc3QgZGlyZW50cyA9IGF3YWl0IHJlYWRkaXIoZGlyLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoZGlyZW50cy5tYXAoKGRpcmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlcyA9IHJlc29sdmUoZGlyLCBkaXJlbnQubmFtZSk7XG4gICAgICAgICAgcmV0dXJuIGRpcmVudC5pc0RpcmVjdG9yeSgpID8gdGhpcy5nZXRGaWxlcyhyZXMpIDogcmVzO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0KC4uLmZpbGVzKTtcbiAgICAgIH1cblxuICAgICAgXG4gICAgcHJpdmF0ZSBzdGF0aWMgIF9pbnN0YW5jZTogTW9uZ29TZXJ2aWNlO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTW9uZ29TZXJ2aWNlIHtcbiAgICAgICAgaWYgKCFNb25nb1NlcnZpY2UuX2luc3RhbmNlKXtcbiAgICAgICAgICAgIE1vbmdvU2VydmljZS5faW5zdGFuY2UgPSBuZXcgTW9uZ29TZXJ2aWNlKCk7XG4gICAgICAgICAgICBNb25nb1NlcnZpY2UuX2luc3RhbmNlLmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTW9uZ29TZXJ2aWNlLl9pbnN0YW5jZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjbGllbnQ6IE1vbmdvQ2xpZW50O1xuXG4gICAgcHVibGljIGFzeW5jIGNsb3NlQ29ubmVjdGlvbigpe1xuICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5jbG9zZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBmaW5kSm9iQ2FyZChxdWVyeTogYW55ID0ge30sIGxpbWl0OiBudW1iZXIgPSA1MCwgc29ydDogYW55ID0ge19pZDogLTF9KTogUHJvbWlzZTxBcnJheTxKb2JDYXJkTW9kZWw+PntcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmNsaWVudC5kYigpLmNvbGxlY3Rpb24oXCJqb2JDYXJkXCIpLmZpbmQocXVlcnkpLmxpbWl0KGxpbWl0KS5zb3J0KHNvcnQpLnRvQXJyYXkoKTtcbiAgICAgICAgbGV0IHJldDogQXJyYXk8Sm9iQ2FyZE1vZGVsPiA9IFtdO1xuICAgICAgICBmb3IgKGxldCByZXN1bHQgb2YgcmVzdWx0cyl7XG4gICAgICAgICAgICByZXQucHVzaChuZXcgSm9iQ2FyZE1vZGVsKHJlc3VsdCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmV0OyAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0KCl7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25uZWN0aW9uIFVSSS4gVXBkYXRlIDx1c2VybmFtZT4sIDxwYXNzd29yZD4sIGFuZCA8eW91ci1jbHVzdGVyLXVybD4gdG8gcmVmbGVjdCB5b3VyIGNsdXN0ZXIuXG4gICAgICAgICAqIFNlZSBodHRwczovL2RvY3MubW9uZ29kYi5jb20vZWNvc3lzdGVtL2RyaXZlcnMvbm9kZS8gZm9yIG1vcmUgZGV0YWlsc1xuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgdXJpID0gXCJtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L3BsYXRpbmdcIjsgICAgXG5cbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKTtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBDb25uZWN0IHRvIHRoZSBNb25nb0RCIGNsdXN0ZXJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmNvbm5lY3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59Il19