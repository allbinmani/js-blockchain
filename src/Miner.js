"use strict";

import Config from './Config';

export default class Miner {

  constructor(blockchain) {
    this._nonce = ~~(Math.random()*(1<<(Config.NONCE_SIZE-1)));
    this._bestDifficulty = 0;
    this._chain = blockchain;
    this._hashrate = 0;
  }

  _attempt(block) {
    this._nonce = (this._nonce + Config.NONCE_STEP) & ((1<<(Config.NONCE_SIZE-1))-1);
    //console.log('nonce', this.Nonce.toString(16));
    block.Nonce = this._nonce;
    this._hash = block.Hash.toString();
    // FIXME: Calculates leading HEX zeros for now, we can't mine much (64 lvls)
    let lz = -(this._hash.replace(/^0*/,'').length - this._hash.length);
    return lz;
  }

  /**
   * Mine given blockchain for it's NextBlock hash. Call after all transactions has
   * been added, and a candidate hash is required to add it to the chain.
   * @return {Block|null} If a candidate cash is found, the new Block is returned.
   */
  mine(max_iters = 1000) {
    let block = this._chain.NextBlock;
    let difficulty = this._chain.Difficulty;
    let i = 0;
    let result = null;
    let start = Date.now();
    while(i++ < max_iters) {
      let lz = this._attempt(block);
      if(lz >= difficulty) {
        this._bestDifficulty = lz;
        result = block;
        console.log('FOUND NONCE! difficulty:%d(>=%d)  nonce:%d  hash:%s', lz, difficulty, this.Nonce, this.Hash);
        break;
      } else if(lz >= this._bestDifficulty) {
        this._bestDifficulty = lz;
      }
    }

    let end = Date.now();
    let hashes_per_s = (i/(end-start));
    this._hashrate = (this._hashrate*3 + hashes_per_s) / 4;
    return result;
  }

  get Hashrate() {
    return this._hashrate;
  }

  get Block() {
    return this._block;
  }

  get Nonce() {
    return Number(this._nonce);
  }
  
  get BestDifficulty() {
    return this._bestDifficulty;
  }
  
  get Hash() {
    return this._hash;
  }
}
