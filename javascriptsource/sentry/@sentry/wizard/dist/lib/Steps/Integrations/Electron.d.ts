import { Answers } from 'inquirer';
import { Args } from '../../Constants';
import { SentryCli } from '../../Helper/SentryCli';
import { BaseIntegration } from './BaseIntegration';
export declare class Electron extends BaseIntegration {
    protected argv: Args;
    protected sentryCli: SentryCli;
    constructor(argv: Args);
    emit(answers: Answers): Promise<Answers>;
    shouldConfigure(answers: Answers): Promise<Answers>;
    private checkDep;
}
