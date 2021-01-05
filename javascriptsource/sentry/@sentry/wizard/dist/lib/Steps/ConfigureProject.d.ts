import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class ConfigureProject extends BaseStep {
    emit(answers: Answers): Promise<Answers>;
}
