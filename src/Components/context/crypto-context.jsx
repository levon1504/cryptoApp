import { createContext, useState, useEffect, useContext } from "react";
import { procentsDifferens } from "../../UtilFn";
import { fakeFetchCrypto, fetchAssets } from "../../Api";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAsset] = useState([]);

  function mapAssets(assetsArray, cryptoArray) {
    return assetsArray.map((asset) => {
      const coin = cryptoArray.find((c) => c.id === asset.id);
      return {
        ...asset,
        grow: coin ? asset.price < coin.price : false,
        growProcent: coin ? procentsDifferens(asset.price, coin.price) : 0,
        totalAmount: coin ? asset.amount * coin.price : 0,
        totalProfit: coin
          ? asset.amount * coin.price - asset.amount * asset.price
          : 0,
        name: coin.name,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();

      setAsset(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAsset((prev) => mapAssets([...prev, newAsset], crypto));
  }

  function removeAsset(assetId) {
    setAsset((prev) => prev.filter((asset) => asset.id !== assetId));
  }

  return (
    <CryptoContext.Provider
      value={{ loading, crypto, assets, addAsset, removeAsset }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
