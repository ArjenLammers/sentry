import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class Result extends BaseStep {
    emit(answers: Answers): Promise<Answers>;
}
