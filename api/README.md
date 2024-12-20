# Blockchain

## Real World Asset (RWA)

For the purpose of the project, we decide to use the Pokémon cards.
Relevant details of each cards:
- name
- edition
- card_number
- rarity
- type
- image
- description

## Features
- [x] Create Wallet
- [x] Retrieve Wallet
- [x] Mint NFT
- [x] Retrieve all NFTs from a Wallet
- [ ] Create sell offer for an NFT
- [ ] Create buy offer for an NFT
- [ ] Accept a buy offer for an NFT
- [ ] Retrieve all NFT's sell offers

## How to use

You need to have a wallet on the XRPLedger testnet, if you don't, yuo can create one using our API (Don't forget to keep your wallet address, seed, public_key and private_key)

You can mint NFT for Pokémon cards

You can create a sell offer for your NFT

On the marketplace you can see offers for other NFT and buy it if you can

## API

**GET -> /api/wallet/<wallet> |** retrieve your wallet informations

**POST -> /api/wallet |** create a new wallet (don't forget to save the data)

**POST -> /api/nft |** create a new NFT
```json
/*Request body*/
{
    "seed": "",
    "public_key": "",
    "private_key": "",
    "nft": {
        "name": "My NFT",
        "edition": "1st",
        "card_number": "12345",
        "rarity": "Rare",
        "type": "Collectible",
        "image": "https://example.com/image.png",
        "description": "This is a unique NFT example."
    }
}
```
**GET -> /api/nft/<wallet> |** return a list of all wallet's NFTs

**GET -> /api/offers |** return a list of all offers in the marketplace

**POST -> /api/sellOffer |** create a sell offer for a NFT

**POST -> /api/buyOffer |** create a buy offer for a NFT
