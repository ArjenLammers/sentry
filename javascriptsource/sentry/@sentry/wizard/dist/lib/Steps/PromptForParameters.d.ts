import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class PromptForParameters extends BaseStep {
    emit(answers: Answers): Promise<Answers>;
    private getFullUrl;
    private shouldAsk;
    private validateAuthToken;
    private validateSlug;
    private validateDSN;
}
