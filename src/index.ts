
import Client, {
    CommitmentLevel,
    SubscribeRequest,
    SubscribeUpdate,
    SubscribeUpdateTransaction,
} from "@triton-one/yellowstone-grpc";
import { Message, CompiledInstruction, TokenBalance } from "@triton-one/yellowstone-grpc/dist/grpc/solana-storage";
import { ClientDuplexStream } from '@grpc/grpc-js';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import buyToken from "./pumputils/utils/buyToken";
import dotenv from 'dotenv';
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { Fee } from "@raydium-io/raydium-sdk";
import sell from "./pumputils/utils/sellToken";
import sellToken from "./pumputils/utils/sellToken";

dotenv.config()

// Constants
const ENDPOINT = process.env.GRPC_ENDPOINT!;
const PUMP_FUN_PROGRAM_ID = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P';
const PUMP_FUN_CREATE_IX_DISCRIMINATOR = Buffer.from([24, 30, 200, 40, 5, 28, 7, 119]);
const COMMITMENT = CommitmentLevel.PROCESSED;

// console.log('WEBSOCKET_RPC_ENDPOINT => ', process.env.WEBSOCKET_RPC_ENDPOINT)

const solanaConnection = new Connection(process.env.RPC_ENDPOINT!, 'processed');
export const keypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));
const amount = process.env.BUY_AMOUNT;
const price_check_interval = Number(process.env.PRICE_CHECK_INTERVAL);
const take_profit = Number(process.env.TAKE_PROFIT);
const stop_loss = Number(process.env.STOP_LOSS);
const sell_slippage = Number(process.env.SELL_SLIPPAGE);
const skip_selling_if_lost_more_than = Number(process.env.SKIP_SELLING_IF_LOST_MORE_THAN);
const price_check_duration = Number(process.env.PRICE_CHECK_DURATION);
const auto_sell: string | undefined = process.env.AUTO_SELL;
const autoSellBoolean = auto_sell === "true";
const max_sell_retries = Number(process.env.MAX_SELL_RETRIES);
const title = `
██████╗ ██╗   ██╗███╗   ███╗██████╗ ███████╗██╗   ██╗███╗   ██╗    ███████╗███╗   ██╗██╗██████╗ ███████╗██████╗ 
██╔══██╗██║   ██║████╗ ████║██╔══██╗██╔════╝██║   ██║████╗  ██║    ██╔════╝████╗  ██║██║██╔══██╗██╔════╝██╔══██╗
██████╔╝██║   ██║██╔████╔██║██████╔╝█████╗  ██║   ██║██╔██╗ ██║    ███████╗██╔██╗ ██║██║██████╔╝█████╗  ██████╔╝
██╔═══╝ ██║   ██║██║╚██╔╝██║██╔═══╝ ██╔══╝  ██║   ██║██║╚██╗██║    ╚════██║██║╚██╗██║██║██╔═══╝ ██╔══╝  ██╔══██╗
██║     ╚██████╔╝██║ ╚═╝ ██║██║     ██║     ╚██████╔╝██║ ╚████║    ███████║██║ ╚████║██║██║     ███████╗██║  ██║
╚═╝      ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝      ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
                                                                                                                     
------------------------------------------ Version 5.2.0 -------------------------------------------------------


`;


let timestamp1 = 0;
let priorityFee = 0.00007;
let transactionFee = 0.000005;
let ataRent = 0.002;
let solAmountBeforeBuy;
let solAmountAfterBuy;
let buySolAmount;
let buyPrice;

let jitoFee = Number(process.env.JITO_FEE);

console.log(title, '\n');
console.log('Your Pubkey => ', keypair.publicKey.toBase58(), '\n');
console.log('Buy Amount =>', amount, '\n');
console.log('Jito fee => ', process.env.JITO_FEE!, '\n');
console.log('Price check interval => ', process.env.PRICE_CHECK_INTERVAL, '\n');
console.log('Take profit => ', process.env.TAKE_PROFIT!, '\n');
console.log('Stop loss => ', process.env.STOP_LOSS!, '\n');
console.log('Sell Slippage => ', process.env.SELL_SLIPPAGE!, '\n');
console.log('Skip selling if lost more than => ', process.env.SKIP_SELLING_IF_LOST_MORE_THAN!, '\n');
console.log('Price check duration => ', process.env.PRICE_CHECK_DURATION!, '\n');
console.log('Auto sell => ', process.env.AUTO_SELL!, '\n');
console.log('Max sell retries => ', process.env.MAX_SELL_RETRIES!, '\n');


// Main function
async function main(): Promise<void> {
    const client = new Client(ENDPOINT, undefined, undefined);
    const stream = await client.subscribe();
    const request = createSubscribeRequest();

    try {
        await sendSubscribeRequest(stream, request);
        console.log('Geyser connection established - watching new Pump.fun mints. \n');
        await handleStreamEvents(stream);
    } catch (error) {
        console.error('Error in subscription process:', error);
        stream.end();
    }
}

// Helper functions
function createSubscribeRequest(): SubscribeRequest {
    return {
        accounts: {},
        slots: {},
        transactions: {
            pumpFun: {
                accountInclude: FILTER_CONFIG.programIds,
                accountExclude: [],
                accountRequired: []
            }
        },
        transactionsStatus: {},
        entry: {},
        blocks: {},
        blocksMeta: {},
        commitment: COMMITMENT,
        accountsDataSlice: [],
        ping: undefined,
    };
}





function handleStreamEvents(stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        stream.on('data', async (data) => {
            timestamp1 = Date.now()
            if (result) {
                stream.end();
                process.exit(1)
            }
        });
        stream.on("error", (error: Error) => {
            console.error('Stream error:', error);
            reject(error);
            stream.end();
        });
        stream.on("end", () => {
            console.log('Stream ended');
            resolve();
        });
        stream.on("close", () => {
            console.log('Stream closed');
            resolve();
        });
    });
}




main().catch((err) => {
    console.error('Unhandled error in main:', err);
    process.exit(1);
});






