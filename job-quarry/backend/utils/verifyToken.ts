import jwt from 'jsonwebtoken';

async function verifyToken(token: string, secret: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) reject(err);
            resolve(payload);
        })
    });
}

export default verifyToken;