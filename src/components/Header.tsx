import React from 'react';
import { Coins } from 'lucide-react';

interface Props {
  walletAddress: string;
  spkBalance: number;
  ethBalance?: string;
}

export function Header({ walletAddress, spkBalance, ethBalance }: Props) {
  // Only attempt to shorten the address if it exists and is long enough
  const shortenedAddress = walletAddress && walletAddress.length >= 10
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : 'No Wallet Connected';

  return (
    <div className="bg-yellow-100 p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="font-mono">{shortenedAddress}</span>
        {ethBalance && <span>{ethBalance} ETH</span>}
      </div>
      <div className="flex items-center gap-2 bg-yellow-200 px-4 py-2 rounded-full">
        <Coins className="w-5 h-5 text-yellow-600" />
        <span className="font-bold text-yellow-800">{spkBalance} SPK</span>
      </div>
    </div>
  );
}