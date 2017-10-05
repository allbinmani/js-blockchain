
import Blockchain from './Blockchain';
import Transaction from './Transaction';
import Block from './Block';
import Wallet from './Wallet';
import Miner from './Miner';
import Config from './Config.js';

function _createGenesisBlock(genesis_wallet) {
  let gb = new Block(0, Config.VERSION, new Date());
//  (id, sender, receiver, amount, timestamp)
  gb.addTransaction(new Transaction(0, genesis_wallet.Id, genesis_wallet.Id, Config.GENESIS_AMOUNT, new Date()));
  return gb;
}

// The Genesis wallet is the origin of all funds
const gw = new Wallet(Config.GENESIS_WALLET);
const genesisBlock = _createGenesisBlock(gw);
const bc = new Blockchain(genesisBlock, Config.GENESIS_HASH, Config.DIFFICULTY);
const miner = new Miner(bc);

// Once the blockchain exists, we can create wallets
const w1 = new Wallet('s1', bc);
const w2 = new Wallet('s2', bc);

console.log('Created Blockchain with Genesis Block: %s', bc.toString());

// Add a few transactions to the next block ..
const newBlock = bc.NextBlock;
newBlock.addTransaction(new Transaction(0, gw, w1, Config.GENESIS_AMOUNT/2));
newBlock.addTransaction(new Transaction(0, gw, w2, Config.GENESIS_AMOUNT/4));
newBlock.addTransaction(new Transaction(0, w1, gw, Config.GENESIS_AMOUNT/2));
newBlock.addTransaction(new Transaction(0, w2, gw, Config.GENESIS_AMOUNT/4));

// .. then mine for it

let minedBlock = false;
let mineCnt = 0;
const MINE_STEP = 2048;
function mine(num) {
  minedBlock = miner.mine(MINE_STEP);
  if(!minedBlock) {
    mineCnt++;
    if((mineCnt & 63) === 0) {
      console.log('..still mining for block %d @ %d khash/s: %d/%d hashes: %d', bc.NextBlock.Id, ~~(miner.Hashrate), miner.BestDifficulty, bc.Difficulty, mineCnt*MINE_STEP);
    }
    setTimeout(mine, 1);
  } else {
    console.log('CANDIDATE FOR BLOCK %d FOUND!', minedBlock.Id, minedBlock.toString());
    // Append current NextBlock to chain and generates new Nextblock
    bc.nextBlock(); 
    console.log('Blockchain', bc.toJSON());
  }
}
mine();
