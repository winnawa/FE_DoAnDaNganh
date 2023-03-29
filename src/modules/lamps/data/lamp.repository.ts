import { Lamp } from "../domains";
import { LampRepositoryInterface } from "../domains/repositories/lamp.repository";


export class LampRepository implements LampRepositoryInterface{
    constructor(private readonly database: LampDatabase){}

    getLamps = async (): Promise<Lamp[]> => {
        const values = await this.database.getLamps()
        return []
    };

}