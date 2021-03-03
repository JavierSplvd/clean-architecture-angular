import { Observable } from "rxjs";
import { UseCase } from "../use-case";
import { AbstractLink as AbstractLink } from "./abstract.link";

export class LogLink extends AbstractLink {

    public handle<S, T>(useCase: UseCase<S, T>, params: S): Observable<T> {
        console.log(useCase.id)
        if (this.nextHandler === null) {
            return useCase.internalExecute(params)
        }
        return this.nextHandler.handle(useCase, params)
    }
}