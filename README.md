# PumpFun Sniper Bot 

It currently buys tokens faster than other sniper bots, so it buys tokens at a lower price than other bots.

And it can set the exact time to sell the token so that it sells it at the most suitable time.


## Recording Video

https://github.com/user-attachments/assets/72fa98f7-32ea-4d22-a22e-bdaa9df92873

## Transactions

mint: [https://solscan.io/tx/QKbc9RxNZPE7peDNPnxBtPMux2HfTfn9QN2AwEr7Z5P1SS1qw42FYZcXqzkm9APVkTH88ieZU4PUaCU93yPNfGa](https://solscan.io/tx/QKbc9RxNZPE7peDNPnxBtPMux2HfTfn9QN2AwEr7Z5P1SS1qw42FYZcXqzkm9APVkTH88ieZU4PUaCU93yPNfGa)

buy: [https://solscan.io/tx/5NV4oAJacFfNffAb55hkb6LEKsSTjgMd8vTzTvDKBLQvQ5XCogizBLShnpF89J8tqFrYJAHaUS5tmXtb6SBpEdNz](https://solscan.io/tx/5NV4oAJacFfNffAb55hkb6LEKsSTjgMd8vTzTvDKBLQvQ5XCogizBLShnpF89J8tqFrYJAHaUS5tmXtb6SBpEdNz)

sell: [https://solscan.io/tx/5QDYSiST7KX9viNZXSeSATZYMJ5ioJrHJxqu9DVwFzREMarwwmaDXz7EYS1jC9oQq8z7V8GwTsEv94dSwdhU9s5b](https://solscan.io/tx/5QDYSiST7KX9viNZXSeSATZYMJ5ioJrHJxqu9DVwFzREMarwwmaDXz7EYS1jC9oQq8z7V8GwTsEv94dSwdhU9s5b)

## Getting Started

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/topsecretagent007/Pumpfun-sniper-grpc-V5.2.git
    ```

2. **Install Dependencies**:

    Navigate to the project directory and run the following command:

    ```bash
    cd Pumpfun-sniper-grpc-V5.2
    npm install
    ```

3. **Configure API Token**:

    Replace the API token in the `ENDPOINT` variable:

    ```ts
    const ENDPOINT = "http://ultra.swqos.solanavibestation.com/?api_key=";
    ```
    And set other variables in env file.

4. **Run the Bot**:

    Start the bot by running:

    ```bash
    npm run start
    ```

---

##  Sell Requirments

1. PRICE_CHECK_INTERVAL (ms) :
   Interval in milliseconds for checking the take profit and stop loss conditions
   Set to zero to disable take profit and stop loss.

2. TAKE_PROFIT : x %

3. STOP_LOSS : x  %

4. SELL_SLIPPAGE : x %

5. SKIP_SELLING_IF_LOST_MORE_THAN : x %
   If token loses more than X% of value, bot will not try to sell

6. PRICE_CHECK_DURATION (ms) : x %
   Time in milliseconds to wait for stop loss/take profit conditions
   If you don't reach profit or loss bot will auto sell after this time
   Set to zero to disable take profit and stop loss

7. AUTO_SELL - true/false

8. MAX_SELL_RETRIES - Maximum number of retries for selling a token

## Stay Connected

Gmail: lendonbracewell1114@gmail.com

Telegram: [@Topsecretagent007](https://t.me/topsecretagent_007)
