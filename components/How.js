import { useMoralis, useChain } from "react-moralis"

import React, { useState, useRef, useEffect } from "react"

function How() {
    return (
        <div className=" w-[850px] text-justify">
            <div className=" py-4">
                <h1 className="font-bold text-4xl">How does Elektroscrow work?</h1>
                <h1 className="font-medium text-2xl mt-20">Working principles</h1>

                <div className="mt-4">
                    <div>
                        Elektroscrow is the{" "}
                        <span className="font-bold text-gray-900 ">first fully decentralized</span>{" "}
                        escrow service on any blockchain network. Project's main concerns are
                        privacy, decentralization and safety. Elektroscrow's competitors does not
                        have the full decentralization level that Elektroscrow has achieved with
                        it's simple but effective working principles. Alternative services
                        generally use mediators to solve disputes between parties and does not
                        solve this problem by only utilizing smart contracts, thus creating
                        centralization and decreasing user trust to their platforms. Elektroscrow
                        has simplified the problem of solving disputes to two parties having a
                        necessity to reconcilate with each other in order to get an outcome both of
                        them are satisfied with. Elektroscrow utilizes smart contracts to enforce
                        this necessity, guaranteeing there is not a chance for any party to have an
                        unfortunate outcome. Escrow transaction actualizes only when reciever and
                        provider has come to the same decision.
                    </div>
                </div>
            </div>
            <div className=" py-4">
                <h1 className="font-medium text-2xl mt-10">Decentralization logic</h1>
                <div className="bg-black h-[478px] w-[850px] mt-4"></div>
                <div className="mt-10">
                    <div className="font-medium mb-2">Beginning of the escrow:</div>
                    <div>
                        In order to start an escrow, the buyer should create a new escrow contract
                        with providing the correct data, then both parties must deposit the
                        required amounts to the created contract. There is a concept called{" "}
                        <span className="font-bold text-gray-900 ">safety deposit</span>. It is
                        required by both parties before initializing an escrow and it is to enforce
                        the reconciliation rule that the protocol possess. It is the same amount as
                        the escrow amount. So the reciever always deposits double the amount of the
                        escrow, provider should deposit the escrow amount.
                        <div className="mt-10 mb-10 italic bg-yellow-100 bg-opacity-30 rounded-xl p-4">
                            <div className="mb-6 underline decoration-dotted underline-offset-4">
                                <span className="font-medium ">Example: </span> Lets say the escrow
                                amount is <span className="font-bold">x</span> amount of tokens and{" "}
                                <span className="font-bold">fee</span> is the protocol fee:{" "}
                            </div>
                            <div className="flex mt-2">
                                <div className="font-medium">
                                    <div className="">Required amounts to deposit:</div>
                                    <div className="mt-7 mb-1">
                                        Transfered amounts after successfull escrow:
                                    </div>
                                    <div className=" ">
                                        Refunded amounts after mutual refund decision:
                                    </div>
                                </div>
                                <div className="ml-16 ">
                                    <div className="font-medium ">
                                        Buyer: <span className="font-normal">2x</span>
                                    </div>
                                    <div className="font-normal text-xxs">
                                        (Safety deposit + escrow amount)
                                    </div>

                                    <div className="flex mt-3 mb-1">
                                        <div className="font-medium ">
                                            Buyer: <span className="font-normal">(x - fee/2)</span>
                                        </div>
                                    </div>
                                    <div className="flex  ">
                                        <div className="font-medium ">
                                            Buyer:{" "}
                                            <span className="font-normal">(2x - fee/2)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-10 font-medium">
                                    <div className="  ">
                                        Seller: <span className="font-normal">x</span>
                                        <div className="font-normal text-xxs">
                                            (Safety deposit)
                                        </div>
                                    </div>
                                    <div className=" mt-3 mb-1">
                                        Seller: <span className="font-normal">(2x - fee/2)</span>
                                    </div>
                                    <div className="  ">
                                        Seller: <span className="font-normal">(x - fee/2)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        The safety deposits are refunded after the escrow ends. The protocol fee
                        amount is divided to two and deducted from these safety deposits. The
                        funded amounts are{" "}
                        <span className="font-bold text-gray-900">always withdrawable</span> and{" "}
                        <span className="font-bold text-gray-900">
                            not subject to the protocol fee{" "}
                        </span>
                        before the contract{" "}
                        <span className="font-bold text-gray-900">initializes</span>. When{" "}
                        <span className="font-bold text-gray-900">both parties</span> fund the
                        contract with required amounts, including safety deposits, the contract
                        initializes and the withdrawals are disabled. However, when the
                        counter-party doesn't fund the contract, other party can always withdraw
                        his funds without a protocol fee. Only way to end this escrow contract
                        after it is funded by both parties and initialized, is by having the same
                        decision about the escrow's outcome between reciever and provider.{" "}
                        <div className="font-medium mt-20 mb-2">Post-initialization:</div>
                        <div className="">
                            After the created contract is initialized by funding, there are three
                            possible outcome scenarios. If both of the participants accept the
                            escrow, the transaction ends and transfer is done successfully. If both
                            of the participants ask for a refund, contract ends and both users get
                            their initial deposits, minus protocol fee. Last scenario is, escrow
                            tokens staying in the contract until one of the previous scenarios
                            happen. If either one or both of the parties have selected the decision
                            of decline, nothing happens and the contract continues to safekeep the
                            assets until an agreement about the outcome between parties. By the
                            nature of this logic, the protocol enforces parties to collaberate for
                            the best outcome, as otherwise both of their assets will be locked
                            until a reconciliation. Elektroscrow has achieved{" "}
                            <span className="font-bold text-gray-900 ">full decentralization</span>{" "}
                            with forcing the participants to solve the problem between themselves
                            and enforcing the rules by smart contracts{" "}
                            <span className="font-bold text-gray-900 ">
                                without a need for a third party moderator
                            </span>
                            .
                        </div>
                        <div className="mt-10 mb-10 italic bg-yellow-100 bg-opacity-30 rounded-xl p-4">
                            <div className="mb-6 underline decoration-dotted underline-offset-4">
                                <span className="font-medium ">All possible scenarios: </span>
                            </div>
                            <div className="flex mt-2">
                                <div className="font-medium">
                                    <div className="">Decisions:</div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer: <span className=" text-greeen">Accept</span>
                                        </div>
                                    </div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer:{" "}
                                            <span className=" text-writingdark">Refund</span>
                                        </div>
                                    </div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer: <span className=" text-greeen">Accept</span>
                                        </div>
                                    </div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer:{" "}
                                            <span className=" text-writingdark">Refund</span>
                                        </div>
                                    </div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer: <span className=" text-reed">Decline</span>
                                        </div>
                                    </div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer: <span className=" text-greeen">Accept</span>
                                        </div>
                                    </div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer:{" "}
                                            <span className=" text-writingdark">Refund</span>
                                        </div>
                                    </div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer: <span className=" text-reed">Decline</span>
                                        </div>
                                    </div>
                                    <div className="flex font-medium mt-4">
                                        <div className=" ">
                                            Buyer: <span className=" text-reed">Decline</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="font-medium">
                                    <div className="ml-4 mt-10 ">
                                        Seller: <span className=" text-greeen ">Accept</span>
                                    </div>
                                    <div className="ml-4 mt-4 ">
                                        Seller: <span className=" text-writingdark">Refund</span>
                                    </div>
                                    <div className="ml-4 mt-4">
                                        Seller: <span className=" text-writingdark">Refund</span>
                                    </div>
                                    <div className="ml-4 mt-4">
                                        Seller: <span className=" text-greeen">Accept</span>
                                    </div>
                                    <div className="ml-4 mt-4">
                                        Seller: <span className=" text-greeen">Accept</span>
                                    </div>
                                    <div className="ml-4 mt-4">
                                        Seller: <span className=" text-reed">Decline</span>
                                    </div>
                                    <div className="ml-4 mt-4">
                                        Seller: <span className=" text-reed">Decline</span>
                                    </div>
                                    <div className="ml-4 mt-4">
                                        Seller: <span className=" text-writingdark">Refund</span>
                                    </div>
                                    <div className="ml-4 mt-4">
                                        Seller: <span className=" text-reed">Decline</span>
                                    </div>
                                </div>
                                <div className="ml-32 ">
                                    <div className="font-medium ">Outcomes:</div>

                                    <div className="flex mt-4  ">
                                        <div className="font-normal ">A successfull transfer</div>
                                    </div>
                                    <div className="flex mt-4  ">
                                        <div className="font-normal ">Refund</div>
                                    </div>
                                    <div className="flex mt-4  ">
                                        <div className="font-normal ">
                                            Contract continues to safekeep tokens
                                        </div>
                                    </div>
                                    <div className="flex mt-4  ">
                                        <div className="font-normal ">
                                            Contract continues to safekeep tokens
                                        </div>
                                    </div>
                                    <div className="flex mt-4  ">
                                        <div className="font-normal ">
                                            Contract continues to safekeep tokens
                                        </div>
                                    </div>
                                    <div className="flex mt-4  ">
                                        <div className="font-normal ">
                                            Contract continues to safekeep tokens
                                        </div>
                                    </div>
                                    <div className="flex mt-4 ">
                                        <div className="font-normal ">
                                            Contract continues to safekeep tokens
                                        </div>
                                    </div>
                                    <div className="flex mt-4 ">
                                        <div className="font-normal ">
                                            Contract continues to safekeep tokens
                                        </div>
                                    </div>
                                    <div className="flex mt-4">
                                        <div className="font-normal ">
                                            Contract continues to safekeep tokens
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" py-4">
                <h1 className="font-medium text-2xl mt-10">Starting a new escrow</h1>
                <div className="bg-black h-[478px] w-[850px] mt-4"></div>
                <div className="mt-4">
                    <div>
                        An escrow contract can only be created by the buyer party, thus you are
                        able to initialize it only if you are the one that requests a service or
                        buys an asset. If you are the provider/seller, you should inform the buyer
                        for this process to be beginned.{" "}
                    </div>
                    <div className="mt-4">
                        In order to create an escrow contract between the reciever and the
                        provider, buyer should input the seller's contract address data to the
                        appropriate field. Then the buyer should input the amount of tokens to be
                        transfered after the contract is finished. Finally, buyer should select a
                        token contract to be used for this escrow from either the list of tokens
                        currently available on Elektroscrow or input a custom token to be used.{" "}
                        <span className="opacity-80 italic ">
                            (Always DYOR when using custom tokens)
                        </span>{" "}
                        Finally, after all the fields are filled with{" "}
                        <span className="font-bold text-gray-900 ">correct data</span>, the buyer
                        should press the{" "}
                        <span className="font-bold text-gray-900 ">Start Escrow</span> button the
                        create a contract.
                    </div>
                </div>
            </div>
            <div className=" py-4">
                <h1 className="font-bold text-xl">Header1</h1>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis nulla
                    et erat interdum, at varius arcu sodales. In consectetur dolor velit, sit amet
                    egestas orci scelerisque eu. In sit amet viverra lorem. Maecenas venenatis
                    dolor in dolor fringilla accumsan. Duis congue facilisis ultrices. Sed eu sem
                    et odio volutpat sodales. Maecenas at tristique turpis, eget porttitor mi.
                    Vestibulum cursus lectus in ex molestie, ut tristique augue dignissim. Donec
                    ullamcorper nunc in neque tincidunt interdum. Sed interdum, erat eu maximus
                    dignissim, nisi tellus tempus nunc, nec mollis mauris odio a ante. Suspendisse
                    vel nibh id dolor facilisis mattis sed eu nisi.
                </div>
            </div>
            <div className=" py-4">
                <h1 className="font-bold text-xl">Header1</h1>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis nulla
                    et erat interdum, at varius arcu sodales. In consectetur dolor velit, sit amet
                    egestas orci scelerisque eu. In sit amet viverra lorem. Maecenas venenatis
                    dolor in dolor fringilla accumsan. Duis congue facilisis ultrices. Sed eu sem
                    et odio volutpat sodales. Maecenas at tristique turpis, eget porttitor mi.
                    Vestibulum cursus lectus in ex molestie, ut tristique augue dignissim. Donec
                    ullamcorper nunc in neque tincidunt interdum. Sed interdum, erat eu maximus
                    dignissim, nisi tellus tempus nunc, nec mollis mauris odio a ante. Suspendisse
                    vel nibh id dolor facilisis mattis sed eu nisi.
                </div>
            </div>
            <div className=" py-4">
                <h1 className="font-bold text-xl">Header1</h1>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis nulla
                    et erat interdum, at varius arcu sodales. In consectetur dolor velit, sit amet
                    egestas orci scelerisque eu. In sit amet viverra lorem. Maecenas venenatis
                    dolor in dolor fringilla accumsan. Duis congue facilisis ultrices. Sed eu sem
                    et odio volutpat sodales. Maecenas at tristique turpis, eget porttitor mi.
                    Vestibulum cursus lectus in ex molestie, ut tristique augue dignissim. Donec
                    ullamcorper nunc in neque tincidunt interdum. Sed interdum, erat eu maximus
                    dignissim, nisi tellus tempus nunc, nec mollis mauris odio a ante. Suspendisse
                    vel nibh id dolor facilisis mattis sed eu nisi.
                </div>
            </div>
            <div className=" py-4">
                <h1 className="font-bold text-xl">Header1</h1>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis nulla
                    et erat interdum, at varius arcu sodales. In consectetur dolor velit, sit amet
                    egestas orci scelerisque eu. In sit amet viverra lorem. Maecenas venenatis
                    dolor in dolor fringilla accumsan. Duis congue facilisis ultrices. Sed eu sem
                    et odio volutpat sodales. Maecenas at tristique turpis, eget porttitor mi.
                    Vestibulum cursus lectus in ex molestie, ut tristique augue dignissim. Donec
                    ullamcorper nunc in neque tincidunt interdum. Sed interdum, erat eu maximus
                    dignissim, nisi tellus tempus nunc, nec mollis mauris odio a ante. Suspendisse
                    vel nibh id dolor facilisis mattis sed eu nisi.
                </div>
            </div>
        </div>
    )
}
export default How
