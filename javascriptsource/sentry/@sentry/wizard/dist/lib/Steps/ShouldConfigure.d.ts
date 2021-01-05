import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class ShouldConfigure extends BaseStep {
    emit(answers: Answers): Promise<Answers>;
}
