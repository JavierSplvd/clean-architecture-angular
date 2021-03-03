import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { UseCase } from "../use-case";
import { AbstractLink as AbstractLink } from "./abstract.link";

export class CacheLink extends AbstractLink {

    static onMemoryCache = new Map<string, any>()

    public handle<S, T>(useCase: UseCase<S, T>, params: S): Observable<T> {
        const key = useCase.id + JSON.stringify(params)
        console.log(CacheLink.onMemoryCache)
        if(!useCase.cacheable && this.nextHandler !== null) {
            return this.nextHandler.handle(useCase, params)
        } else if(!useCase.cacheable && this.nextHandler === null) {
            return useCase.internalExecute(params)
        }

        if(CacheLink.onMemoryCache.has(key)) {
            const value = CacheLink.onMemoryCache.get(key) as T
            return of(value)
        } else {
            return useCase.internalExecute(params).pipe(tap(result => {
                CacheLink.onMemoryCache.set(key, result)
                console.log(result)
            }))
        }
    }
}