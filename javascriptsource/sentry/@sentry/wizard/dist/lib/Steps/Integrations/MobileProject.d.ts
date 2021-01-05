import { Answers } from 'inquirer';
import { Platform } from '../../Constants';
import { BaseIntegration } from './BaseIntegration';
export declare abstract class MobileProject extends BaseIntegration {
    protected platforms: Platform[];
    getPlatforms(answers: Answers): string[];
    shouldConfigure(answers: Answers): Promise<Answers>;
    protected abstract shouldConfigurePlatform(platform: Platform): Promise<boolean>;
    protected platformSelector(): Promise<Answers>;
}
