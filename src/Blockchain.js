"use strict";

import Block from './Block';
import Config from './Config';

export default class Blockchain {

  constructor(genesisBlock, genesisHash, difficulty=5) {
    this._height = 0;
    this._difficulty = difficulty;
    this._chain = [ genesisBlock ];
    this._nextBlock = new Block(++this._height, Config.VERSION, new Date(), [], genesisHash);
  }
  
  get Difficulty() {
    return this._difficulty;
  }
  
  get Height() {
    return this._height;
  }
  
  get LastBlock() {
    return this._chain[this.Height-1];
  }
  
  get NextBlock() {
    return this._nextBlock;
  }
  
  get Chain() {
    return this._chain;
  }
  
  nextBlock() {
    this._chain.push(this._nextBlock);
    this._nextBlock = new Block(++this._height, Config.VERSION, new Date(), [], this.LastBlock.Hash);
  }
  
  verify() {
    let current = this._chain[0];
    for(let i = 1; i < this._chain.length; i++) {
      let next = this._chain[i];
      if(next.PreviousHash !== current.Hash) {
        console.error('verify error, %s !== %s ', next.PreviousHash, current.Hash)
        return false;
      }
      current = next;
    }
    
    return true;
  }

  toJSON() {
    return {config: Config, chain: this._chain.map(b => b.toJSON())};
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }

  pretty() {
    return JSON.stringify(this.toJSON(), false, 2);
  }
}
