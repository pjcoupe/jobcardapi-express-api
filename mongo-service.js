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
const { promisify } = require("util");
const Jimp = require("jimp");
const promiseReadFile = promisify(fs.readFile);
const baseDrive = process.env["USER"] === "peterc" ? path.sep + "Users" + path.sep + "peterc" + path.sep + "Pictures" : "D:";
class MongoService {
    constructor() {
        this.fileLocation = {};
        this.jimpRead = Jimp.read;
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    resizeImage(imgPath, width, height = Jimp.AUTO, quality = 100) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.jimpRead(imgPath);
            yield image.resize(width, height);
            yield image.quality(quality);
            //await image.writeAsync(imgPath);
            let base64URI = yield image.getBase64Async(image.getMIME());
            return base64URI;
            //return Buffer.alloc(image.length * 2, image).toString('base64');
        });
    }
    getJobImages(job, index = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield this.getJobIDPicturesFileNames(job.jobID, job.jobDate);
            try {
                if (files.length) {
                    index = index % files.length;
                    let imgPath = files[index];
                    return yield this.resizeImage(imgPath, 450);
                    //let bitmap = await promiseReadFile(files[index]);
                    //return Buffer.alloc(bitmap.length * 2, bitmap).toString('base64');
                }
                else {
                    return "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                }
            }
            catch (err) {
                console.error(err);
                return "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vbmdvLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBc0M7QUFDdEMsd0RBQXFEO0FBQ3JELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNoQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLDZCQUE2QjtBQUc3QixNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9DLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzdILE1BQWEsWUFBWTtJQUF6QjtRQUVvQixpQkFBWSxHQUF1QyxFQUFFLENBQUM7UUFFOUQsYUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUF3Q3JCLFdBQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUEyRWhKLENBQUM7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dUhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tIFwibW9uZ29kYlwiO1xuaW1wb3J0IHsgSm9iQ2FyZE1vZGVsIH0gZnJvbSBcIi4vbW9kZWxzL0pvYkNhcmRNb2RlbFwiO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgeyByZXNvbHZlIH0gPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB7IHJlYWRkaXIgfSA9IGZzLnByb21pc2VzO1xuY29uc3QgeyBwcm9taXNpZnkgfSA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xuaW1wb3J0ICogYXMgSmltcCBmcm9tIFwiamltcFwiO1xuXG5cbmNvbnN0IHByb21pc2VSZWFkRmlsZSA9IHByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmNvbnN0IGJhc2VEcml2ZSA9IHByb2Nlc3MuZW52W1wiVVNFUlwiXSA9PT0gXCJwZXRlcmNcIiA/IHBhdGguc2VwICsgXCJVc2Vyc1wiICsgcGF0aC5zZXAgKyBcInBldGVyY1wiICsgcGF0aC5zZXAgKyBcIlBpY3R1cmVzXCIgOiBcIkQ6XCI7XG5leHBvcnQgY2xhc3MgTW9uZ29TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBmaWxlTG9jYXRpb246IHsgW2pvYklkOiBzdHJpbmddOiBBcnJheTxzdHJpbmc+IH0gPSB7fTtcbiAgICBcbiAgICBwcml2YXRlIGppbXBSZWFkID0gSmltcC5yZWFkO1xuICAgIGFzeW5jIHJlc2l6ZUltYWdlKGltZ1BhdGg6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBhbnkgPSBKaW1wLkFVVE8sIHF1YWxpdHk6IG51bWJlciA9IDEwMCk6IFByb21pc2U8c3RyaW5nPiB7XG5cbiAgICAgICAgY29uc3QgaW1hZ2UgPSBhd2FpdCB0aGlzLmppbXBSZWFkKGltZ1BhdGgpO1xuICAgICAgICBhd2FpdCBpbWFnZS5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGF3YWl0IGltYWdlLnF1YWxpdHkocXVhbGl0eSk7XG4gICAgICAgIC8vYXdhaXQgaW1hZ2Uud3JpdGVBc3luYyhpbWdQYXRoKTtcbiAgICAgICAgbGV0IGJhc2U2NFVSSSA9IGF3YWl0IGltYWdlLmdldEJhc2U2NEFzeW5jKGltYWdlLmdldE1JTUUoKSk7XG4gICAgICAgIHJldHVybiBiYXNlNjRVUkk7XG4gICAgICAgIC8vcmV0dXJuIEJ1ZmZlci5hbGxvYyhpbWFnZS5sZW5ndGggKiAyLCBpbWFnZSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldEpvYkltYWdlcyhqb2I6IEpvYkNhcmRNb2RlbCwgaW5kZXg6IG51bWJlciA9IDApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgZmlsZXMgPSBhd2FpdCB0aGlzLmdldEpvYklEUGljdHVyZXNGaWxlTmFtZXMoam9iLmpvYklELCBqb2Iuam9iRGF0ZSk7XG5cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXggJSBmaWxlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbGV0IGltZ1BhdGggPSBmaWxlc1tpbmRleF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzaXplSW1hZ2UoaW1nUGF0aCwgNDUwKTtcbiAgICAgICAgICAgICAgICAvL2xldCBiaXRtYXAgPSBhd2FpdCBwcm9taXNlUmVhZEZpbGUoZmlsZXNbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBCdWZmZXIuYWxsb2MoYml0bWFwLmxlbmd0aCAqIDIsIGJpdG1hcCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBN1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiBcIlIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3XCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZ2V0Sm9iSURQaWN0dXJlc0ZpbGVOYW1lcyhqb2JJRDogc3RyaW5nIHwgbnVtYmVyLCBkYXRlOiBEYXRlKTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gICAgICAgIGxldCBpZCA9IFwiXCIgKyBqb2JJRDtcbiAgICAgICAgbGV0IGZpbGVzID0gdGhpcy5maWxlTG9jYXRpb25baWRdO1xuICAgICAgICBpZiAoIWZpbGVzICYmIGRhdGUpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucHJvY2Vzc01vbnRoUGljdHVyZXMoZGF0ZSk7XG4gICAgICAgICAgICBmaWxlcyA9IHRoaXMuZmlsZUxvY2F0aW9uW2lkXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZXMgfHwgW107XG4gICAgfVxuICAgIHByaXZhdGUgbW9udGhzID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl07XG4gICAgYXN5bmMgcHJvY2Vzc01vbnRoUGljdHVyZXMoZGF0ZTogRGF0ZSkge1xuICAgICAgICBsZXQgeWVhciA9IFwiXCIgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBuYW1lT2ZNb250aCA9IHRoaXMubW9udGhzW2RhdGUuZ2V0TW9udGgoKV07XG4gICAgICAgIGxldCBkaXIgPSBwYXRoLnNlcCArIFwiS29kYWsgUGljdHVyZXNcIiArIHBhdGguc2VwICsgeWVhciArIHBhdGguc2VwICsgeWVhciArIFwiIFwiICsgbmFtZU9mTW9udGg7XG4gICAgICAgIGxldCBmaWxlcyA9IGF3YWl0IHRoaXMuZ2V0RmlsZXMoYmFzZURyaXZlICsgZGlyKTtcbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgbGV0IGxhc3RTbGFzaCA9IGZpbGUubGFzdEluZGV4T2YocGF0aC5zZXApO1xuICAgICAgICAgICAgaWYgKGxhc3RTbGFzaCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgc3ViID0gZmlsZS5zdWJzdHIobGFzdFNsYXNoICsgMSk7XG4gICAgICAgICAgICAgICAgbGV0IHNwbGl0ID0gc3ViLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdBcnJheSA9IHRoaXMuZmlsZUxvY2F0aW9uW3NwbGl0WzBdXTtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVMb2NhdGlvbltzcGxpdFswXV0gPSBleGlzdGluZ0FycmF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdBcnJheS5pbmRleE9mKGZpbGUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0FycmF5LnB1c2goZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGdldEZpbGVzKGRpcik6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICAgICAgICBjb25zdCBkaXJlbnRzID0gYXdhaXQgcmVhZGRpcihkaXIsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChkaXJlbnRzLm1hcCgoZGlyZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSByZXNvbHZlKGRpciwgZGlyZW50Lm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGRpcmVudC5pc0RpcmVjdG9yeSgpID8gdGhpcy5nZXRGaWxlcyhyZXMpIDogcmVzO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0KC4uLmZpbGVzKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTW9uZ29TZXJ2aWNlO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTW9uZ29TZXJ2aWNlIHtcbiAgICAgICAgaWYgKCFNb25nb1NlcnZpY2UuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICBNb25nb1NlcnZpY2UuX2luc3RhbmNlID0gbmV3IE1vbmdvU2VydmljZSgpO1xuICAgICAgICAgICAgTW9uZ29TZXJ2aWNlLl9pbnN0YW5jZS5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1vbmdvU2VydmljZS5faW5zdGFuY2U7XG4gICAgfVxuICAgIHByaXZhdGUgY2xpZW50OiBNb25nb0NsaWVudDtcblxuICAgIHB1YmxpYyBhc3luYyBjbG9zZUNvbm5lY3Rpb24oKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGZpbmRKb2JDYXJkKHF1ZXJ5OiBhbnkgPSB7fSwgbGltaXQ6IG51bWJlciA9IDUwLCBzb3J0OiBhbnkgPSB7IF9pZDogLTEgfSk6IFByb21pc2U8QXJyYXk8Sm9iQ2FyZE1vZGVsPj4ge1xuICAgICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IHRoaXMuY2xpZW50LmRiKCkuY29sbGVjdGlvbihcImpvYkNhcmRcIikuZmluZChxdWVyeSkubGltaXQobGltaXQpLnNvcnQoc29ydCkudG9BcnJheSgpO1xuICAgICAgICBsZXQgcmV0OiBBcnJheTxKb2JDYXJkTW9kZWw+ID0gW107XG4gICAgICAgIGZvciAobGV0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG4gICAgICAgICAgICByZXQucHVzaChuZXcgSm9iQ2FyZE1vZGVsKHJlc3VsdCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGluaXQoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25uZWN0aW9uIFVSSS4gVXBkYXRlIDx1c2VybmFtZT4sIDxwYXNzd29yZD4sIGFuZCA8eW91ci1jbHVzdGVyLXVybD4gdG8gcmVmbGVjdCB5b3VyIGNsdXN0ZXIuXG4gICAgICAgICAqIFNlZSBodHRwczovL2RvY3MubW9uZ29kYi5jb20vZWNvc3lzdGVtL2RyaXZlcnMvbm9kZS8gZm9yIG1vcmUgZGV0YWlsc1xuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgdXJpID0gXCJtb25nb2RiOi8vbG9jYWxob3N0OjI3MDE3L3BsYXRpbmdcIjtcblxuICAgICAgICB0aGlzLmNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmkpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBDb25uZWN0IHRvIHRoZSBNb25nb0RCIGNsdXN0ZXJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmNvbm5lY3QoKTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuXG4gICAgICAgIH1cbiAgICB9XG59Il19