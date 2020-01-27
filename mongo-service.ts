import { MongoClient } from "mongodb";
import { JobCardModel } from "./models/JobCardModel";
const path = require("path");
const fs = require('fs');
const { resolve } = require('path');
const { readdir } = fs.promises;

const baseDrive = process.env["USER"] === "peterc" ? path.sep+"Users"+path.sep+"peterc"+path.sep+"Pictures" : "D:";
export class MongoService {

    public readonly fileLocation: {[jobId:string]: Array<string> } = {};

    async getJobImages(job: JobCardModel): Promise<Array<string>> {
        let files = await this.getJobIDPicturesFileNames(job.jobID, job.jobDate);
        let base64Array: Array<any> = [];
        
        try{
           
            for (let file of files){
                let bitmap = fs.readFileSync(file);
                // convert binary data to base64 encoded string
                base64Array.push(Buffer.alloc(bitmap.length * 2,bitmap).toString('base64'));
            }             
        } catch (err){
            console.error(err);            
        } finally {
            return base64Array;
        }
    }
    async getJobIDPicturesFileNames(jobID: string | number, date: Date): Promise<Array<string>> {
        let id = "" + jobID;
        let files = this.fileLocation[id];
        if (!files && date){
            await this.processMonthPictures(date);
            files = this.fileLocation[id];
        }
        return files || [];
    }
    private months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    async processMonthPictures(date: Date){
        let year = "" + date.getFullYear();
        let nameOfMonth = this.months[date.getMonth()];
        let dir = path.sep + "Kodak Pictures"+path.sep+year+path.sep+year+" "+nameOfMonth;
        let files = await this.getFiles(baseDrive + dir);
        for (let file of files){
            let lastSlash = file.lastIndexOf(path.sep);
            if (lastSlash > 0){
                let sub = file.substr(lastSlash+1);
                let split = sub.split(" ");
                let existingArray = this.fileLocation[split[0]];
                if (!existingArray){
                    existingArray = [];
                    this.fileLocation[split[0]] = existingArray;
                }
                if (existingArray.indexOf(file) === -1){
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

      
    private static  _instance: MongoService;
    public static getInstance(): MongoService {
        if (!MongoService._instance){
            MongoService._instance = new MongoService();
            MongoService._instance.init();
        }
        return MongoService._instance;
    }
    private client: MongoClient;

    public async closeConnection(){
        await this.client.close();
    }

    public async findJobCard(query: any = {}, limit: number = 50, sort: any = {_id: -1}): Promise<Array<JobCardModel>>{
        let results = await this.client.db().collection("jobCard").find(query).limit(limit).sort(sort).toArray();
        let ret: Array<JobCardModel> = [];
        for (let result of results){
            ret.push(new JobCardModel(result));
        }
        
        return ret;     
    }

    private async init(){
        /**
         * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
         * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
         */
        const uri = "mongodb://localhost:27017/plating";    

        this.client = new MongoClient(uri);
        
        try {
            // Connect to the MongoDB cluster
            await this.client.connect();
            
        } catch (e) {
            console.error(e);
        } finally {
            
        }
    }
}