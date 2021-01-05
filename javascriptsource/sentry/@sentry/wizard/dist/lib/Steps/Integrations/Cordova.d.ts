import { Answers } from 'inquirer';
import { Args } from '../../Constants';
import { SentryCli } from '../../Helper/SentryCli';
import { BaseIntegration } from './BaseIntegration';
export declare class Cordova extends BaseIntegration {
    protected argv: Args;
    protected sentryCli: SentryCli;
    protected folderPrefix: string;
    protected pluginFolder: string[];
    constructor(argv: Args);
    emit(answers: Answers): Promise<Answers>;
    uninstall(answers: Answers): Promise<Answers>;
    shouldConfigure(answers: Answers): Promise<Answers>;
    private unpatchXcodeProj;
    private unpatchXcodeBuildScripts;
    private patchXcodeProj;
    private addNewXcodeBuildPhaseForSymbols;
    private addNewXcodeBuildPhaseForStripping;
    private addSentryProperties;
}
