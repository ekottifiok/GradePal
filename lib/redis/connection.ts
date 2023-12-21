import IORedis from 'ioredis';

const getPassword = (): string => {
    const password = process.env.REDIS_PASSWORD
    if (!password) {
        throw new Error(
            'Please define the REDIS_PASSWORD environment variable inside .env.local'
        )
    }
    return password
}

const getHost = (): string => {
    const host = process.env.REDIS_HOST
    if (!host) {
        throw new Error(
            'Please define the REDIS_HOST environment variable inside .env.local'
        )
    }
    return host
}

const getPort = (): number => {
    const port = process.env.REDIS_PORT
    if (!port) {
        throw new Error("REDIS_PORT does not exist in the .env.local file");

    }
    const numberPort = parseInt(port, 10)
    if (Number.isNaN(numberPort)) {
        throw new Error("REDIS_PORT could not be parsed correctly")
    }
    return numberPort
};

export const connection = new IORedis({
    host: getHost(),
    port: getPort(),
    password: getPassword(),
});