import { Answers } from 'inquirer';
import { Args } from '../Constants';
export declare abstract class BaseStep implements IStep {
    protected argv: Args;
    protected isDebug: boolean;
    constructor(argv: Args);
    abstract emit(answers: Answers): Promise<Answers>;
    debug(msg: any): void;
}
export interface IStep {
    emit(answers?: Answers): Promise<Answers>;
}
