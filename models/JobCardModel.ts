import { ObjectID } from "mongodb";
import { ValidCollection } from "../mongo-service";

export abstract class BaseModel {
    _id: ObjectID;

    abstract collectionName(): ValidCollection;
    constructor(obj: any){
        if (obj && typeof obj === "object") {

            let keys = Object.keys(obj);
            for (let key of keys){
                let value = obj[key];
                if (value && typeof value !== "function"){
                    if (key.includes("Date")){
                        obj[key] = new Date(value);
                    } 
                }
                this[key] = obj[key];
            }
            
            if (typeof this._id === "string"){
                this._id = new ObjectID(this._id);
            }
        }
    }
}
export class FussyCustomerModel extends BaseModel{
    
    phoneOrEmail: string;

    constructor(obj: any) {
        super(obj);
       
    }
    collectionName(): ValidCollection {
        return "fussyCustomer";
    }
}

export class SettingsModel extends BaseModel{
    
    emailAddress: string;
    emailPassword: string;
    emailName: string;
    emailPort: string;
    emailDomain: string;
    pricing: {[button: string]: string};

    constructor(obj: any) {
        super(obj);
       
    }
    collectionName(): ValidCollection {
        return "settings";
    }
}
export class JobCardModel extends BaseModel{

    jobID: number;
    jobDate: Date;
    jobCustomer: string;
    jobAddress: string;
    jobPhone: string;
    jobEmail: string;
    jobOrderNumber: string;
    jobFussyNotes: string;
    jobDelivery: string;
    jobReceivedFrom: string;
    jobDateRequired: Date;
    jobDateCompleted: Date;
    jobPaymentBy: string;
    jobNotes: string;
    jobDatePaid: Date;
    jobDetail00: string;
    jobType00: string;
    jobQty00: number;
    jobUnitPrice00: number;
    jobPrice00: number;
    jobDetail01: string;
    jobType01: string;
    jobQty01: number;
    jobUnitPrice01: number;
    jobPrice01: number;
    jobDetail02: string;
    jobType02: string;
    jobQty02: number;
    jobUnitPrice02: number;
    jobPrice02: number;
    jobDetail03: string;
    jobType03: string;
    jobQty03: number;
    jobUnitPrice03: number;
    jobPrice03: number;
    jobDetail04: string;
    jobType04: string;
    jobQty04: number;
    jobUnitPrice04: number;
    jobPrice04: number;
    jobDetail05: string;
    jobType05: string;
    jobQty05: number;
    jobUnitPrice05: number;
    jobPrice05: number;
    jobDetail06: string;
    jobType06: string;
    jobQty06: number;
    jobUnitPrice06: number;
    jobPrice06: number;
    jobDetail07: string;
    jobType07: string;
    jobQty07: number;
    jobUnitPrice07: number;
    jobPrice07: number;
    jobDetail08: string;
    jobType08: string;
    jobQty08: number;
    jobUnitPrice08: number;
    jobPrice08: number;
    jobDetail09: string;
    jobType09: string;
    jobQty09: number;
    jobUnitPrice09: number;
    jobPrice09: number;
    jobDetail10: string;
    jobType10: string;
    jobQty10: number;
    jobUnitPrice10: number;
    jobPrice10: number;
    jobDetail11: string;
    jobType11: string;
    jobQty11: number;
    jobUnitPrice11: number;
    jobPrice11: number;
    jobDetail12: string;
    jobType12: string;
    jobQty12: number;
    jobUnitPrice12: number;
    jobPrice12: number;
    jobDetail13: string;
    jobType13: string;
    jobQty13: number;
    jobUnitPrice13: number;
    jobPrice13: number;
    jobDetail14: string;
    jobType14: string;
    jobQty14: number;
    jobUnitPrice14: number;
    jobPrice14: number;
    jobDetail15: string;
    jobType15: string;
    jobQty15: number;
    jobUnitPrice15: number;
    jobPrice15: number;
    jobDetail16: string;
    jobType16: string;
    jobQty16: number;
    jobUnitPrice16: number;
    jobPrice16: number;
    jobDetail17: string;
    jobType17: string;
    jobQty17: number;
    jobUnitPrice17: number;
    jobPrice17: number;
    jobRepair: boolean;
    jobRepairText: string;
    jobRepairType: string;
    jobRepairQty: number;
    jobRepairUnitPrice: number;
    jobRepairPrice: number;
    jobStrip: boolean;
    jobStripText: string;
    jobStripType: string;
    jobStripQty: number;
    jobStripUnitPrice: number;
    jobStripPrice: number;
    jobPolish: boolean;
    jobPolishText: string;
    jobPolishType: string;
    jobPolishQty: number;
    jobPolishUnitPrice: number;
    jobPolishPrice: number;
    jobPlating: boolean;
    jobPlatingText: string;
    jobPlatingType: string;
    jobPlatingQty: number;
    jobPlatingUnitPrice: number;
    jobPlatingPrice: number;
    jobLaquer: boolean;
    jobLaquerText: string;
    jobLaquerType: string;
    jobLaquerQty: number;
    jobLaquerUnitPrice: number;
    jobLaquerPrice: number;
    jobSilvGalv: boolean;
    jobSilvGalvText: string;
    jobSilvGalvType: string;
    jobSilvGalvQty: number;
    jobSilvGalvUnitPrice: number;
    jobSilvGalvPrice: number;
    jobGoldGalv: boolean;
    jobGoldGalvText: string;
    jobGoldGalvType: string;
    jobGoldGalvQty: number;
    jobGoldGalvUnitPrice: number;
    jobGoldGalvPrice: number;
    jobWheelCrack: boolean;
    jobWheelCrackText: string;
    jobWheelCrackType: string;
    jobWheelCrackQty: number;
    jobWheelCrackUnitPrice: number;
    jobWheelCrackPrice: number;
    jobWheelDent: boolean;
    jobWheelDentText: string;
    jobWheelDentType: string;
    jobWheelDentQty: number;
    jobWheelDentUnitPrice: number;
    jobWheelDentPrice: number;
    jobWheelMachine: boolean;
    jobWheelMachineText: string;
    jobWheelMachineType: string;
    jobWheelMachineQty: number;
    jobWheelMachineUnitPrice: number;
    jobWheelMachinePrice: number;
    jobTyre: boolean;
    jobTyreText: string;
    jobTyreType: string;
    jobTyreQty: number;
    jobTyreUnitPrice: number;
    jobTyrePrice: number;
    jobFreight: string;
    jobSubTotal: number;
    jobGST: number;
    jobTOTAL: number;
    jobCompleted: boolean;
    jobCollected: string;
    jobBusinessName: string;

    constructor(obj: any) {
        super(obj);
    }

    collectionName(): ValidCollection {
        return "jobCard";
    }
}
