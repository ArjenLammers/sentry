import { Answers } from 'inquirer';
import { Args } from '../../Constants';
import { BaseStep } from '../BaseStep';
export declare abstract class BaseIntegration extends BaseStep {
    protected argv: Args;
    type: string;
    protected _shouldConfigure: Promise<Answers>;
    constructor(argv: Args);
    abstract emit(answers: Answers): Promise<Answers>;
    uninstall(answers: Answers): Promise<Answers>;
    /**
     * This can be used for example for platform:boolean to determine
     * if we should configure iOS/Android.
     * Basically this will be merged into answers so it can be check by a later step.
     */
    shouldConfigure(answers: Answers): Promise<Answers>;
    shouldEmit(answers: Answers): Promise<boolean>;
}
