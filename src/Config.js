
//import CryptoJS from 'ezcrypto';

const hfn = (process.env.HASH_FUNC !== void 0 ? process.env.HASH_FUNC : 'SHA256');

const hash_func = require('ezcrypto/lib/' + hfn.toLowerCase())[hfn];

const nonce_size = parseInt(process.env.NONCE_SIZE !== void 0 ? process.env.NONCE_SIZE : 32, 10);

const Config = {
    VERSION:        parseFloat(process.env.VERSION !== void 0 ? process.env.VERSION : 1.0),
    GENESIS_HASH:   process.env.GENESIS_HASH !== void 0 ? process.env.GENESIS_HASH : '0000000000000000000000000000000000000000000000000000000000000000',
    GENESIS_AMOUNT: parseInt(process.env.GENESIS_AMOUNT !== void 0 ? process.env.GENESIS_AMOUNT : 10000000, 10),
    GENESIS_WALLET: process.env.GENESIS_WALLET !== void 0 ? process.env.GENESIS_WALLET : 'GENESIS',
    COINBASE1:      process.env.COINBASE1 !== void 0 ? process.env.COINBASE1 : '12345678A0B0C0D0E0F0D0E0A0D0C0DE0010C013374000000000000000000000',
    DIFFICULTY:     parseInt(process.env.DIFFICULTY !== void 0 ? process.env.DIFFICULTY : 5, 10),
    NONCE_SIZE:     nonce_size,
    NONCE_STEP:     ~~(Math.random()*((1<<(nonce_size-1)))),
    HASH_FUNC_NAME: hfn,
    HASH_FUNC:      hash_func
};

export default Config;