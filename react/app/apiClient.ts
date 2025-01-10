type Wallet = {
  address: string;
  balance: number;
};

type encodedNFT = {
  decoded_uri: string;
};

export type NFT = {
  card_number: string;
  description: string;
  edition: string;
  image: string;
  name: string;
  rarity: string;
  type: string;
};

type Offer = {
  id: string;
  nftId: string;
  price: number;
  seller: string;
};

type CreateWalletResponse = {
  address: string;
};

type CreateNFTRequest = {
  name: string;
  owner: string;
};

type CreateOfferRequest = {
  nftId: string;
  price: number;
  seller: string;
};

// API Client
const apiClient = {
  baseUrl: "http://localhost:8000/api",

  // Helper method for making API calls
  async fetchApi(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  },

  // Wallet endpoints
  async getWallet(address: string): Promise<Wallet> {
    return this.fetchApi(`/wallet/${address}`);
  },

  async createWallet(): Promise<CreateWalletResponse> {
    return this.fetchApi("/wallet", { method: "POST" });
  },

  async getWalletNFTs(address: string): Promise<encodedNFT[]> {
    return this.fetchApi(`/nft/${address}`);
  },

  // NFT endpoints
  async getNFTs(): Promise<NFT[]> {
    return this.fetchApi("/nft", { method: "GET" });
  },

  async createNFT(nftData: CreateNFTRequest): Promise<NFT> {
    return this.fetchApi("/nft", {
      method: "POST",
      body: JSON.stringify(nftData),
    });
  },

  // Offer endpoints
  async getOffers(): Promise<Offer[]> {
    return this.fetchApi("/offers");
  },

  async createSellOffer(offerData: CreateOfferRequest): Promise<Offer> {
    return this.fetchApi("/sellOffer", {
      method: "POST",
      body: JSON.stringify(offerData),
    });
  },
};

export default apiClient;
