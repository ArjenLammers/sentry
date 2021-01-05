import { Answers } from 'inquirer';
import { Integration } from '../Constants';
import { BaseStep } from './BaseStep';
export declare class ChooseIntegration extends BaseStep {
    emit(answers: Answers): Promise<Answers>;
    tryDetectingIntegration(): Integration | undefined;
}
