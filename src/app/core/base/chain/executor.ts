import { Observable } from "rxjs";
import { Link as Link } from "./link";
import { LogLink } from "./log.link";
import { UseCase } from "../use-case";
import { ExclamationLink } from "./exclamation.link";

export class Executor {
    static links: Link = null

    static run<S, T>(useCase: UseCase<S, T>, params: S): Observable<T> {
        if(this.links === null) {
            this.links = new LogLink()
            this.links.setNext(new ExclamationLink())
        }
        return this.links.handle<S, T>(useCase, params)
    }
}