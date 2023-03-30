import { LampRepository } from '../data';
import { Lamp } from '../domains';

export class GetLampsUseCaseInput {
  constructor() {}
}

export class GetLampsUseCase {
  constructor(private readonly repository: LampRepository) {}
  async execute(input: GetLampsUseCaseInput) {
    const lamps: Lamp[] = await this.repository.getLamps();
  }
}
