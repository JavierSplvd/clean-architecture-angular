import { UseCase } from "../use-case";
import { AbstractLink as AbstractLink } from "./abstract.link";

export class LogLink extends AbstractLink {
    public handle<T, S>(useCase: UseCase<T, S>): UseCase<T, S> {
        console.log(useCase.id)
        return super.handle(useCase)
    }
}