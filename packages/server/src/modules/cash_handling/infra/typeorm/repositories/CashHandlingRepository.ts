import { Between, getRepository, Repository } from 'typeorm';

import ICreateCashHandlingDTO from '@modules/cash_handling/dtos/ICreateCashHandlingDTO';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';

import CashHandling from '../entities/CashHandling';

class CashHandlingRepository implements ICashHandlingRepository {
  private ormRepository: Repository<CashHandling>;

  constructor() {
    this.ormRepository = getRepository(CashHandling);
  }

  public async find(): Promise<CashHandling[] | undefined> {
    const cashHandling = await this.ormRepository.find({
      order: { date: 'ASC' },
    });

    return cashHandling;
  }

  public async findById(id: string): Promise<CashHandling | undefined> {
    const cashHandling = await this.ormRepository.findOne(id);

    return cashHandling;
  }

  public async findByDateInterval(
    initialDate: Date,
    finalDate: Date,
  ): Promise<CashHandling[] | undefined> {
    const cashHandling = await this.ormRepository.find({
      where: [
        { date: Between(initialDate, finalDate) },
        { is_previous_balance: true },
      ],
      order: { date: 'ASC' },
    });

    return cashHandling;
  }

  public async create(data: ICreateCashHandlingDTO): Promise<CashHandling> {
    const cashHandling = this.ormRepository.create(data);

    await this.ormRepository.save(cashHandling);

    return cashHandling;
  }

  public async save(cashHandling: CashHandling): Promise<CashHandling> {
    return this.ormRepository.save(cashHandling);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default CashHandlingRepository;
