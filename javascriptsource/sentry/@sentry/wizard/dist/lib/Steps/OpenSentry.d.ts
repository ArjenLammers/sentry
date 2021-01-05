import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class OpenSentry extends BaseStep {
    emit(answers: Answers): Promise<Answers>;
}
