import { Injectable } from '@angular/core';
import { ElephantModel } from '../domain/elephant.model';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';
import { ElephantRepository } from '../repositories/elephant.repository';

@Injectable({
  providedIn: 'root'
})
export class GetElephantByIdUsecase extends UseCase<number, ElephantModel> {
  id = 'GetElephantByIdUsecase'

  constructor(private elephantRepository: ElephantRepository) {
    super()
  }

  internalExecute(params: number): Observable<ElephantModel> {
    return this.elephantRepository.getElephantById(params);
  }
}
