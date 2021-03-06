import { Observable } from "rxjs";
import { UseCase } from "../use-case";

/**
 * The Link interface declares a method for building the chain of handlers.
 * It also declares a method for executing a request.
 */
export interface Link {
    setNext(handler: Link): Link;

    handle<S, T>(useCase: UseCase<S, T>, params: S): Observable<T>;
}