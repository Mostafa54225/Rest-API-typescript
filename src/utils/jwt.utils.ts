import jwt, { Jwt } from 'jsonwebtoken'
import config from 'config'
import log from './logger'


const privateKey = config.get<string>('privateKey')
const publicKey = config.get<string>('publicKey')
export function signJWT(payload: jwt.JwtPayload, options?: jwt.SignOptions | undefined): string {
    return jwt.sign(payload, getPrivateKey(), {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export function verifyJWT(token: string): jwt.JwtPayload {
    
    try {
        const decoded = jwt.verify(token, getPublicKey())
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        console.log(error)
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}




function getPrivateKey() {
    const privateKey = config.get<string>('privateKey')
    if(!privateKey) {
        log.error('Private key is not configured')
        process.exit(1)
    }
    return privateKey
}

function getPublicKey() {
    const publicKey = config.get<string>('publicKey')
    if(!publicKey) {
        log.error('Public key is not configured')
        process.exit(1)
    }
    return publicKey
}