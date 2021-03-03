import { Observable } from "rxjs";
import { Link as Link } from "./link";
import { LogLink as ConsoleLink } from "./print.link";
import { UseCase } from "../use-case";

export class Executor {
    static links: Link = null

    static run<T, S>(useCase: UseCase<S, T>, params: S): Observable<T> {
        if(this.links === null) {
            this.links = new ConsoleLink()
        }
        return this.links.handle<S, T>(useCase).internalExecute(params)
    }
}