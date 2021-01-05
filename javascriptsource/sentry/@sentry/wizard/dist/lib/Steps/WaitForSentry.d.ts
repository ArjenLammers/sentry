import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class WaitForSentry extends BaseStep {
    emit(answers: Answers): Promise<Answers>;
}
