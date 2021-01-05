import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class Initial extends BaseStep {
    emit(answers: Answers): Promise<Answers>;
}
