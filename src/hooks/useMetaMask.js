import { useEffect, useState } from "react";

const { ethereum } = window;

const useMetaMask = (withListener = false) => {
  const [currentWallets, setCurrentWallets] = useState([]);

  const connectWallet = async callback => {
    try {
      const wallets = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentWallets(wallets);
      callback(false);
    } catch (e) {
      console.error(e);
      if (e.code === -32002) return "connection";
    }
  };

  const getWallets = async () => {
    try {
      return await ethereum.request({ method: "eth_accounts" });
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const checkIfWalletIsConnect = async callback => {
    try {
      if (!ethereum) return Boolean(ethereum);

      const wallets = await getWallets();

      if (wallets.length) {
        setCurrentWallets(wallets);
      } else {
        callback(true);
      }

      return Boolean(ethereum);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (ethereum && withListener) {
      ethereum.on("accountsChanged", setCurrentWallets);
      return () => {
        ethereum.removeListener("accountsChanged", setCurrentWallets);
      };
    }
  }, [withListener]);

  return {
    connectWallet,
    checkIfWalletIsConnect,
    currentWallets,
  };
};

export default useMetaMask;
