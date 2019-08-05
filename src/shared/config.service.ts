/**
 * This is not a NestJS service, because we need access to these variables
 * during application setup/module creation. This is not possible as we can not fetch the service from
 * the DI container at that time.
 */
export class ConfigService {
    static get jwt() {
        return {
            secret: 'bestkeptsecret',
            signOptions: { expiresIn: '1d' },
        };
    }
}
