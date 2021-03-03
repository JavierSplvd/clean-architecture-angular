import { Runner } from 'protractor';
import { Observable } from 'rxjs';
import { Executor } from './chain/executor';

export abstract class UseCase<S, T> {
  id: string

  public execute(params: S): Observable<T> {
    return Executor.run(this, params)
  }

  abstract internalExecute(params: S): Observable<T>;
}
