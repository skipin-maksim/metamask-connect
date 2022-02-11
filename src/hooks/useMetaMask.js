import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";

const ethereum = window?.ethereum;

const useMetaMask = (withListener = false) => {
  const [wallet, setWallet] = useState(null);

  const web3Provider = useMemo(
    () => ethereum && new ethers.providers.Web3Provider(ethereum, "any"),
    []
  );

  const checkProvider = provider => provider?.connection.url === "metamask";

  const isMetaMaskInstalled = () => web3Provider && checkProvider(web3Provider);

  const getWallet = async () => {
    try {
      setWallet(await web3Provider.send("eth_requestAccounts", []));
    } catch (e) {
      if (e.code === 4001) return [];
    }
  };

  useEffect(() => {
    if (web3Provider && withListener) {
      web3Provider.provider.on("accountsChanged", setWallet);
      return () => {
        web3Provider.provider.removeListener("accountsChanged", setWallet);
      };
    }
  }, [web3Provider, withListener]);

  return { isMetaMaskInstalled, getWallet, wallet };
};

export default useMetaMask;
