

export class GetLampsUsecaseInput{
    constructor(){

    }
}

export class GetLampsUsecase{
    
    constructor(private readonly repository: LampsRepository){}
    execute(input: GetLampsUsecaseInput){
        const lamps: Lamp[] = await this.repository.getLamps()
    }
}