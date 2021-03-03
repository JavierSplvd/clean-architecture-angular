import { Observable } from "rxjs";
import { UseCase } from "../use-case";
import { Link } from "./link";

export abstract class AbstractLink implements Link
{
    protected nextHandler?: Link = null

    public setNext(handler: Link): Link {
        this.nextHandler = handler;
        return handler;
    }

    handle<S, T>(useCase: UseCase<S, T>, params: S): Observable<T> {
        if (this.nextHandler) {
            return this.nextHandler.handle(useCase, params);
        }
        return useCase.internalExecute(params);
    }
}