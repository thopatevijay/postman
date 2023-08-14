# Postman : AI-Enhanced Blockchain-Powered Letter Sending dApp

### Overview:
In today's digital age, the personal touch of physical mail has its unique charm. Our dApp seamlessly blends the traditional with the future, leveraging AI to automate letter composition and utilizing blockchain for payment. Users input sender and receiver details, and with the power of ChatGPT AI, a professionally crafted letter is generated. With just one more click and a crypto payment confirmation via MetaMask, the letter is sent physically to the recipient via PostGrid.


### Features:

**1. AI-Powered Letter Generation:** Gone are the days of pondering over how to craft the perfect letter. With ChatGPT, our dApp produces articulate and professional letters tailored to the details you provide.

**2. Crypto Payments:** Integrate the future of finance into your communications. Users can utilize their crypto holdings to pay for the physical dispatch of their letters, making the process sleek and contemporary.

**3. Physical Mail Dispatch:** Partnering with PostGrid ensures the physical aspect of letter sending is handled with reliability. Once the letter is generated and the payment is made, users can rest assured their messages will be sent out physically to their intended recipients.

### Tech Stack:

* **Frontend:** Developed using the versatile and efficient Next.Js framework.
* **AI Integration:** Uses ChatGPT for intelligent, automated letter generation.
* **Blockchain:** Contract deployed on the cutting-edge Mode chain, an Ethereum layer-2 blockchain, ensuring swift transactions with significantly reduced fees.


### Benefits:

* **Efficiency:** Speed up the process of letter composition and dispatch. No manual intervention required in crafting or sending.

* **Economical:** With network fees considerably less on the Mode chain, users get a cost-effective solution for sending physical mail.

* **Modern:** Embrace the future with AI-driven content and crypto payments, all while preserving the timeless charm of a physical letter.



### To start project:

```shell

https://github.com/thopatevijay/postman.git

cd postman

npm install

npx hardhat run scripts/deploy.ts

npm run dev
```

#### `.env` example:

```shell
CHATGPT_KEY=
POSTGRID_API_KEY=
PRIVATE_KEY=
```

#### Deployed contract address

[0x73dccceD70129ea5890329cA0FFc56Fe75cdA225](https://sepolia.explorer.mode.network/address/0x73dccceD70129ea5890329cA0FFc56Fe75cdA225)
