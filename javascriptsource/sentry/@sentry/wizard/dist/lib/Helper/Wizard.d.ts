import { Answers } from 'inquirer';
import { Args } from '../Constants';
import { IStep } from '../Steps/BaseStep';
import { BaseIntegration } from '../Steps/Integrations/BaseIntegration';
export declare function getCurrentIntegration(answers: Answers): BaseIntegration;
export declare function startWizard<M extends IStep>(argv: Args, ...steps: Array<{
    new (debug: Args): M;
}>): Promise<Answers>;
