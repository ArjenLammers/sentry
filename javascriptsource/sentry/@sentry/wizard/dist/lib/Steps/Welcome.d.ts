import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class Welcome extends BaseStep {
    private static didShow;
    emit(answers: Answers): Promise<Answers>;
}
