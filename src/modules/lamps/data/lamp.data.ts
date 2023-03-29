import axios from "axios";
import { Lamp } from "../domains";
import { LampRepositoryInterface } from "../domains/repositories/lamp.repository";


export class LampDatabase implements LampRepositoryInterface{
    getLamps = async () : Promise<Lamp[]> => {
        return axios.get('')
    };
    
}