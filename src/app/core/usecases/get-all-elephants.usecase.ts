import { Injectable } from '@angular/core';
import { ElephantRepository } from '../repositories/elephant.repository';
import { UseCase } from '../base/use-case';
import { ElephantModel } from '../domain/elephant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllElephantsUsecase extends UseCase<void, ElephantModel> {
  id = 'GetAllElephantsUsecase'
  
  constructor(private elephantRepository: ElephantRepository) { 
    super()
  }

  internalExecute(params: void): Observable<ElephantModel> {
    return this.elephantRepository.getAllElephants();
  }
}
