import { Answers } from 'inquirer';
import { Args } from '../Constants';
export interface SentryCliProps {
    [s: string]: string;
}
export declare class SentryCli {
    protected argv: Args;
    private resolve;
    constructor(argv: Args);
    setResolveFunction(resolve: (path: string) => string): void;
    convertAnswersToProperties(answers: Answers): SentryCliProps;
    dumpProperties(props: SentryCliProps): string;
}
