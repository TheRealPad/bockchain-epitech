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
- [x] Create sell offer for an NFT
- [x] Accept a sell offer for an NFT
- [x] Retrieve all NFT's sell offers
- [x] Retrieve wallet sell offers

## How to use

You need to have a wallet on the XRPLedger testnet, if you don't, yuo can create one using our API (Don't forget to keep your wallet address, seed, public_key and private_key)

You can mint NFT for Pokémon cards

You can create a sell offer for your NFT

On the marketplace you can see offers for other NFT and buy it if you can

## API

### Wallet
**GET -> /api/wallet/<wallet> |** retrieve your wallet information

**POST -> /api/wallet |** create a new wallet (don't forget to save the seed, public_key and private_key)

### NFT
**POST -> /api/nft |** create a new NFT
```json
/*Request body*/
{
    "seed": "",
    "public_key": "",
    "private_key": "",
    "nft": {
        "name": "Pikachu 2",
        "language": "EN",
        "number": "025",
        "series": "Base Set",
        "type": "Electric",
        "quality": "Mint",
        "holo": true,
        "reverse_holo": false,
        "first_edition": true,
        "creation_date": "2024-12-22 17:52:10",
        "front_image": "https://tcgplayer-cdn.tcgplayer.com/product/42402_in_1000x1000.jpg",
        "back_image": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/220px-Pokemon_Trading_Card_Game_cardback.jpg",
        "description": "An electric type Pokemon."
    }
}
```
**GET -> /api/nft/<wallet> |** return a list of all wallet's NFTs

### Marketplace
**GET -> /api/offers |** return a list of all offers in the marketplace

**GET -> /api/offers/<wallet> |** return a list of all offers from a specific wallet

**POST -> /api/sellOffer |** create a sell offer for a NFT
```
/*Request body*/
{
    "seed": "",
    "public_key": "",
    "private_key": "",
    "amount": 20
}
```

**POST -> /api/accept/<offer_id> |** accept a sell offer
```
/*Request body*/
{
    "seed": "",
    "public_key": "",
    "private_key": ""
}
```

**DELETE -> /api/sellOffer/<offer_id> |** delete a specific sell offer
```
/*Request body*/
{
    "seed": "",
    "public_key": "",
    "private_key": ""
}
```
