"use strict";

// Extremely simple transaction-summarizing 'wallet'
export default class Wallet {
  
  constructor(id, blockchain) {
    this._id = id;
    this._chain = blockchain;
    // Genesis block has no blockchain, yet, hence no transactions either
    this._transactions = this._chain !== void 0 ? this._findTransactions() : [];
  }
  
  get Id() {
    return this._id;
  }
  
  get Transactions() {
    return this._transactions;
  }
  
  get Balance() {
    return this._transactions.reduce((a,v) => v.Sender === this.Id ? -v.Amount : v.Amount, 0);
  }
  
  // FIXME: Traverses the entire blockchain to find transactions involving this wallet..
  _findTransactions() {
      return this._chain.Chain.map(block => {
        return block.Transactions.filter(t => t.Receiver === this.Id || t.Sender === this._id);
      }).reduce((a,v) => a.concat(v), []);
  }
}
