return (
    <div>
        <input
            className="w-full rounded py-2 px-4 mb-2 border-2 border-blue-500 focus:outline-none focus:ring-0"
            type="text"
            value={tokenContract}
            onChange={(e) => setTokenContract(e.target.value)}
            onFocus={() => setModalOpen(true)}
            placeholder="Enter token contract"
            maxLength={42}
        />
        {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end md:items-center">
                <div className="relative bg-white p-4 rounded shadow-lg w-full md:w-1/2 lg:w-1/4 h-1/2 md:h-2/3 rounded-3xl overflow-y-auto scrollbar-hide">
                    <div className="sticky top-0 bg-white pt-2 pb-4 z-10">
                        <div className="flex justify-between items-center mt-1 mb-4">
                            <div className="font-bold text-gray-700 ml-1">Select a token</div>
                            <button
                                className="absolute right-1 text-gray-700 text-xl font-bold"
                                onClick={() => setModalOpen(false)}
                            >
                                &#10005; {/* X symbol */}
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Search token by name or address"
                            className="p-2 border border-gray-300 rounded w-full focus:outline-none rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {filteredTokens.map((token, index) => (
                        <div
                            key={index}
                            className="flex items-center p-2 hover:bg-gray-100 h-16 cursor-pointer rounded-xl"
                            onClick={() => handleTokenSelect(token)}
                        >
                            <img src={token.logoURI} alt={token.symbol} className="w-9 h-9 mr-4" />
                            <div>
                                <div className="font-medium text-gray-700">{token.name}</div>
                                <div className="text-xs text-gray-700">{token.symbol}</div>
                            </div>
                        </div>
                    ))}
                    {/* ... remaining code ... */}
                </div>
            </div>
        )}
        {/* ... selected token display ... */}
    </div>
)

return (
    <div>
        <input
            className="w-full rounded py-2 px-4 mb-2 border-2 border-blue-500 focus:outline-none  focus:ring-0"
            type="text"
            value={tokenContract}
            onChange={(e) => setTokenContract(e.target.value)}
            onFocus={() => setModalOpen(true)}
            placeholder="Enter token contract"
            maxLength={42}
        />
        {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div
                    ref={modalRef}
                    className="relative bg-white p-4 rounded shadow-lg w-1/4 h-2/3 overflow-y-auto scrollbar-hide rounded-3xl"
                >
                    <div className="flex justify-between items-center mt-1  mb-4">
                        <div className="font-bold text-gray-700 ">Select a token</div>
                        <button
                            className="absolute  right-5 text-gray-700  text-xl font-bold"
                            onClick={() => setModalOpen(false)}
                        >
                            &#10005; {/* X symbol */}
                        </button>
                    </div>
                    <div className="flex justify-between items-center w-full  mb-2 ">
                        <input
                            type="text"
                            placeholder="Search token by name or address"
                            className="p-2 border border-gray-300 rounded w-full focus:outline-none rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {filteredTokens.map((token, index) => (
                        <div
                            key={index}
                            className="flex items-center p-2 hover:bg-gray-100 h-16 cursor-pointer rounded-xl"
                            onClick={() => handleTokenSelect(token)}
                        >
                            <img src={token.logoURI} alt={token.symbol} className="w-9 h-9 mr-4" />
                            <div>
                                <div className="font-medium text-gray-700"> {token.name} </div>
                                <div className="text-xs text-gray-700">{token.symbol}</div>
                            </div>
                        </div>
                    ))}

                    {filteredTokens.length === 0 && !isTokenValid && (
                        <div>
                            <div className="p-2 text-gray-600">No tokens found</div>
                        </div>
                    )}
                    {filteredTokens.length === 0 && isTokenValid && (
                        <div>
                            <div className="p-2 text-gray-600 text-xs">Add custom token</div>
                            <div
                                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={addButton}
                            >
                                <img
                                    src={
                                        "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                                    }
                                    alt={tokenSymbol}
                                    className="w-5 h-5 mr-2"
                                />
                                {tokenName} ({tokenSymbol})
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
        {selectedToken && (
            <div className="flex items-center mt-2">
                <img
                    src={selectedToken.logoURI}
                    alt={selectedToken.symbol}
                    className="w-5 h-5 mr-2"
                />
                <span>
                    {selectedToken.name} ({selectedToken.symbol})
                </span>
            </div>
        )}
    </div>
)

{
    dropdownOpen && buyerState && (
        <div className="origin-top-right absolute ml-right mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1 overflow-y-auto" style={{ maxHeight: "200px" }}>
                {" "}
                {/* Adjust maxHeight as needed */}
                {previousEscrowsBuyer
                    .slice()
                    .reverse()
                    .map((address, index, array) => (
                        <div
                            key={address}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setCurrentEscrow(address)
                                setDropdownOpen(false)
                                setShowInputFields(false)
                            }}
                        >
                            {address}{" "}
                            {index === 0 && ( // Changed from array.length - 1 to 0 for the first item
                                <span className="text-green-500 text-xs ml-4">Latest</span>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}
{
    dropdownOpen && !buyerState && (
        <div className="origin-top-right absolute ml-right mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1 overflow-y-auto" style={{ maxHeight: "200px" }}>
                {" "}
                {/* Adjust maxHeight as needed */}
                {previousEscrowsSeller
                    .slice()
                    .reverse()
                    .map((address, index, array) => (
                        <div
                            key={address}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setCurrentEscrow(address)
                                setDropdownOpen(false)
                                setShowInputFields(false)
                            }}
                        >
                            {address}{" "}
                            {index === 0 && ( // Changed from array.length - 1 to 0 for the first item
                                <span className="text-green-500 text-xs ml-4">Latest</span>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}
