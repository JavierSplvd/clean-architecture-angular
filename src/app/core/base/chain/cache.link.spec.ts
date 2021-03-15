import { UseCase } from '../use-case';
import { CacheLink } from './cache.link';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { Observable, of } from 'rxjs';
import { Link } from './link';

class TestUseCase extends UseCase<string, string> {
    internalExecute(params: string): Observable<string> {
        return of("result")
    }
}

describe('CacheLink', () => {
    beforeEach(() => {
        CacheLink.onMemoryCache.clear()
    })

    it('UseCase not cacheable, last link on the chain', () => {
        const cacheLink = new CacheLink()
        const useCase = mock(TestUseCase)
        const useCaseInstance = instance(useCase)
        useCaseInstance.cacheable = false

        cacheLink.handle(useCaseInstance, "params")

        verify(useCase.internalExecute("params")).once()
    })

    it('UseCase not cacheable, there is another link', () => {
        const cacheLink = new CacheLink()
        const secondLink = mock<Link>()
        cacheLink.setNext(instance(secondLink))
        const useCase = mock(TestUseCase)
        const useCaseInstance = instance(useCase)
        useCaseInstance.cacheable = false

        cacheLink.handle(useCaseInstance, "params")

        verify(useCase.internalExecute("params")).never()
        verify(secondLink.handle(deepEqual(useCaseInstance), deepEqual("params"))).once()
    })

    it('When UseCase is cacheable and cache has key, should return stored value', async () => {
        const cacheLink = new CacheLink()
        CacheLink.onMemoryCache.set("TestUseCase" + JSON.stringify("params"), "stored value")
        const useCase = mock(TestUseCase)
        when(useCase.id).thenReturn("TestUseCase")
        when(useCase.internalExecute("params")).thenReturn(of("wrong"))
        const useCaseInstance = instance(useCase)
        useCaseInstance.cacheable = true

        const result = await cacheLink.handle(useCaseInstance, "params").toPromise()

        expect(result).toBe("stored value")
        expect(CacheLink.onMemoryCache.has("TestUseCaseparams"))
    })

    it('When UseCase is cacheable, but use case is not stored, should return mocked value', async () => {
        const cacheLink = new CacheLink()
        const useCase = mock(TestUseCase)
        when(useCase.id).thenReturn("TestUseCase")
        when(useCase.internalExecute("params")).thenReturn(of("mocked result"))
        const useCaseInstance = instance(useCase)
        useCaseInstance.cacheable = true

        const result = await cacheLink.handle(useCaseInstance, "params").toPromise()

        verify(useCase.internalExecute(deepEqual("params"))).once()
        expect(result).toBe("mocked result")
        expect(!CacheLink.onMemoryCache.has("TestUseCaseparams"))
    })
});
