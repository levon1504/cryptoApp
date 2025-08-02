import { cryptoAssets, cryptoData } from "./data";

export async function fakeFetchCrypto() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const transformedData = {
      result: data.map((coin) => ({
        id: coin.id,
        icon: coin.image,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        rank: coin.market_cap_rank,
        price: coin.current_price,
        priceBtc: coin.current_price / 44870.39834657236,
        volume: coin.total_volume,
        marketCap: coin.market_cap,
        availableSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        priceChange1h: coin.price_change_percentage_1h_in_currency || 0,
        priceChange1d: coin.price_change_percentage_24h || 0,
        priceChange1w: coin.price_change_percentage_7d_in_currency || 0,
        redditUrl: `https://www.reddit.com/r/${coin.id}`,
        websiteUrl: coin.links?.homepage?.[0] || "",
        twitterUrl: `https://twitter.com/${coin.id}`,
        explorers: coin.links?.blockchain_site || [],
      })),
      meta: {
        page: 1,
        limit: 20,
        itemCount: data.length,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    };

    return transformedData;
  } catch (error) {
    console.error("Error fetching crypto data:", error);

    return {
      result: [],
      meta: {
        page: 1,
        limit: 20,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    };
  }
}

export async function fetchAssets() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const assets = data.slice(0, 5).map((coin) => ({
      id: coin.id,
      amount: Math.random() * 10,
      price: coin.current_price,
      date: new Date(),
    }));

    return assets;
  } catch (error) {
    console.error("Error fetching assets:", error);

    return [
      {
        id: "bitcoin",
        amount: 0.02,
        price: 26244,
        date: new Date(),
      },
      {
        id: "ethereum",
        amount: 5,
        price: 2400,
        date: new Date(),
      },
    ];
  }
}
