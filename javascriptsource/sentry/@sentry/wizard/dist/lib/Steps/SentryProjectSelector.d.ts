import { Answers } from 'inquirer';
import { BaseStep } from './BaseStep';
export declare class SentryProjectSelector extends BaseStep {
    emit(answers: Answers): Promise<{
        config?: undefined;
    } | {
        config: {
            auth: {
                token: any;
            };
            dsn: {
                public: any;
                secret: any;
            };
            organization: {
                slug: any;
            };
            project: {
                slug: any;
            };
        };
    }>;
}
