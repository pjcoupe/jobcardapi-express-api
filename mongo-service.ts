import { MongoClient, ObjectID } from 'mongodb';
import { JobCardModel, BaseModel, FussyCustomerModel, SettingsModel } from './models/JobCardModel';
const path = require("path");
const fs = require('fs');
const { resolve } = require('path');
const { readdir } = fs.promises;
const { promisify } = require("util");
import * as Jimp from "jimp";

export type ValidDB = "plating" | "wheel" | "settings";
export type ValidCollection = "jobCard" | "fussyCustomer" | "settings";
export const DB_NAMES: Array<ValidDB> = ["plating", "wheel", "settings"];
export const COLLECTION_NAMES: Array<ValidCollection> = ["fussyCustomer", "jobCard", "settings"];


const promiseReadFile = promisify(fs.readFile);
export type ResizeInfoType = {returnedWidth: number, actualWidth: number, actualHeight: number}; 
export type JobImagesType = {fileIndex: number, fileCount: number, resizeInfo?: ResizeInfoType, base64: string, error?: string};
const baseDrive = process.env["USER"] === "peterc" ? path.sep + "Users" + path.sep + "peterc" + path.sep + "Pictures" : "D:";
export class MongoService {

    public readonly fileLocation: { [jobId: string]: Array<string> } = {};
    
    private jimpRead = Jimp.read;
    async resizeImage(imgPath: string, width: number): Promise<{base64?: string, error?: string, resizeInfo?: ResizeInfoType}> {
        let ret: {base64?: string, error?: string, resizeInfo?: ResizeInfoType} = {};
        try{
            let height: any = Jimp.AUTO;
            let quality: number = 90;
            const image = await this.jimpRead(imgPath);
            ret.resizeInfo = {returnedWidth: width, actualHeight: image.getHeight(), actualWidth: image.getWidth()};
            await image.resize(width, height);
            await image.quality(quality);
            let base64URI = await image.getBase64Async(image.getMIME());
            ret.base64 = base64URI;
            
        } catch (err){
            ret.error = typeof err === "string" ? err : err.message || "Error resizing";
        } finally {
            return ret;
        }

        //return Buffer.alloc(image.length * 2, image).toString('base64');
    }

    async getJobImages(job: JobCardModel, index: number, resizeWidth?: number): Promise<JobImagesType> {
        const retVal: JobImagesType = {fileIndex: index, fileCount: 0, base64: "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"};

        try {
            let files = await this.getJobIDPicturesFileNames(job.jobID, job.jobDate);            
            retVal.fileCount = files.length;
            index = retVal.fileCount ? index % retVal.fileCount : 0;
            retVal.fileIndex = index;
            if (files.length) {                
                let imgPath = files[index];
                if (resizeWidth){  
                    Object.assign(retVal, await this.resizeImage(imgPath, resizeWidth));                    
                } else {
                    let bitmap = await promiseReadFile(files[index]);
                    retVal.base64 = Buffer.alloc(bitmap.length * 2, bitmap).toString('base64');
                }                
            }
        } catch (err) {
            console.error(err);
            retVal.error = typeof err === "string" ? err : err.message || "Error getting job image";            
        } finally {
            return retVal;
        }
    }
    async getJobIDPicturesFileNames(jobID: string | number, date: Date): Promise<Array<string>> {
        let id = "" + jobID;
        let files = this.fileLocation[id];
        if (!files && date) {
            await this.processMonthPictures(date);
            files = this.fileLocation[id];
        }
        return files || [];
    }
    private months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    async processMonthPictures(date: Date) {
        let year = "" + date.getFullYear();
        let nameOfMonth = this.months[date.getMonth()];
        let dir = path.sep + "Kodak Pictures" + path.sep + year + path.sep + year + " " + nameOfMonth;
        let files = await this.getFiles(baseDrive + dir);
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
    }
    async getFiles(dir): Promise<Array<string>> {
        const dirents = await readdir(dir, { withFileTypes: true });
        const files = await Promise.all(dirents.map((dirent) => {
            const res = resolve(dir, dirent.name);
            return dirent.isDirectory() ? this.getFiles(res) : res;
        }));
        return Array.prototype.concat(...files);
    }


    private static _instance: MongoService;
    public static getInstance(): MongoService {
        if (!MongoService._instance) {
            MongoService._instance = new MongoService();
            MongoService._instance.init();
        }
        return MongoService._instance;
    }
    private clientMap: {[db: string]: {client: MongoClient, classMap: {[validCollection:string]: new(obj?:any)=>BaseModel }}} = {};

    public async closeConnection() {
        for (let key in this.clientMap){
            await this.clientMap[key].client.close();    
        }
    }

    public getClass(db: ValidDB, collection: ValidCollection): new(obj: any)=>BaseModel{
        return this.clientMap[db].classMap[collection];
    }

    public async find(db: ValidDB, collection: ValidCollection, query: any = {}, limit: number, sort: {[field:string]: -1 | 1}): Promise<Array<BaseModel>> {
        let clazz = this.getClass(db, collection);
        
        let results = await this.clientMap[db].client.db().collection(collection).find(query).limit(limit).sort(sort).toArray();
        let ret: Array<BaseModel> = [];
        
        for (let result of results) {
            ret.push(new clazz(result));
        }

        return ret;
    }

    public async findPrimary(db: ValidDB, collection: ValidCollection, primaryKeyValue: string): Promise<BaseModel> {
        let clazz = this.getClass(db, collection);
        if (!primaryKeyValue || typeof primaryKeyValue !== "string"){
            throw new Error("Invalid id type")
        }
        let result = await this.clientMap[db].client.db().collection(collection).findOne({_id: new ObjectID(primaryKeyValue)});
        if (result){
            return new clazz(result);
        }
        return null;
    }

    public async deletePrimary(db: ValidDB, collection: ValidCollection, primaryKeyValue: string): Promise<void> {
        let clazz = this.getClass(db, collection);
        if (!primaryKeyValue || typeof primaryKeyValue !== "string"){
            throw new Error("Invalid id type")
        }
        let result = await this.clientMap[db].client.db().collection(collection).deleteOne({_id: new ObjectID(primaryKeyValue)});
        if (result && result.deletedCount === 1){
            return;
        }
        throw new Error("Failed to delete");
    }

    public async insertOne(db: ValidDB, collection: ValidCollection, doc: any): Promise<BaseModel> {
        let clazz = this.getClass(db, collection);        
        if (!doc || typeof doc !== "object" || Array.isArray(doc) || doc._id){
            throw new Error("Invalid doc to create");
        }
        let result = await this.clientMap[db].client.db().collection(collection).insertOne(doc);
        if (result.insertedCount === 1 && result.insertedId && typeof result.insertedId === "object" && result.insertedId.toHexString){            
            let model = await this.clientMap[db].client.db().collection(collection).findOne({_id: result.insertedId});
            return new clazz(model);
        } else {
            throw new Error("Failed to create "); 
        }        
    }

    public async findAndModify(db: ValidDB, collection: ValidCollection, primaryKeyValue: string, updateOperations: {$set: object}): Promise<BaseModel> {
        let clazz = this.getClass(db, collection);
        let query = {_id: primaryKeyValue};        
        let results = await this.clientMap[db].client.db().collection(collection).findOneAndUpdate(query, updateOperations);
        if (results.ok){            
            let result = await this.clientMap[db].client.db().collection(collection).findOne(query);            
            return new clazz(result);
        } else {
            console.error("findAndModify Error", results.lastErrorObject);  
            throw new Error("Failed to modify " + JSON.stringify(primaryKeyValue) + " with "+JSON.stringify(updateOperations));          
        }        
    }

    

    private async init() {
        /**
         * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
         * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
         */
        
        const uri = "mongodb://localhost:27017/";//plating";
        for (let db of DB_NAMES){
            let classMap:  {[validCollection:string]: new(obj?:any)=>BaseModel } = {};
            this.clientMap[db] = {client: new MongoClient(uri+db), classMap: classMap};
            for (let collection of COLLECTION_NAMES){
                let ignore = false;
                if (db === "settings"){
                    if (collection !== "settings"){
                        ignore = true;
                    }
                } else if (collection === "settings"){
                    ignore = true;
                }
                if (!ignore){
                    switch (collection){
                        case "fussyCustomer":
                            classMap[collection] = FussyCustomerModel;
                            break;
                        case "jobCard":
                            classMap[collection] = JobCardModel;
                            break;
                        case "settings":
                            classMap[collection] = SettingsModel;
                            break;
                    }
                }
            }
            try {
                // Connect to the MongoDB cluster
                await this.clientMap[db].client.connect();
            } catch (e) {
                console.error("Error initing db "+db, e);
            }
        }
    }
}