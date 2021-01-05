import { Answers } from 'inquirer';
import { Args } from '../../Constants';
import { SentryCli } from '../../Helper/SentryCli';
import { MobileProject } from './MobileProject';
export declare class ReactNative extends MobileProject {
    protected argv: Args;
    protected answers: Answers;
    protected sentryCli: SentryCli;
    constructor(argv: Args);
    emit(answers: Answers): Promise<Answers>;
    uninstall(answers: Answers): Promise<Answers>;
    protected shouldConfigurePlatform(platform: string): Promise<boolean>;
    private addSentryProperties;
    private patchJs;
    private patchBuildGradle;
    private unpatchBuildGradle;
    private patchExistingXcodeBuildScripts;
    private addNewXcodeBuildPhaseForSymbols;
    private patchXcodeProj;
    private unpatchXcodeBuildScripts;
    private unpatchXcodeProj;
}
