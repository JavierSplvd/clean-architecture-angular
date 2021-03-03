import { UseCase } from "../use-case";
import { Link } from "./link";

export abstract class AbstractLink implements Link
{
    private nextHandler: Link

    public setNext(handler: Link): Link {
        this.nextHandler = handler;
        return handler;
    }

    handle<T, S>(useCase: UseCase<T, S>): UseCase<T, S> {
        if (this.nextHandler) {
            return this.nextHandler.handle(useCase);
        }
        return useCase;
    }
}