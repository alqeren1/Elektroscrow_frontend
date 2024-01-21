import { useMoralis, useChain } from "react-moralis"

import React, { useState, useRef, useEffect } from "react"

function How() {
    return (
        <div className=" w-full px-6 wdefinedlg:px-0 wdefinedlg:w-[850px] text-justify">
            <div className=" py-4">
                <h1 className="font-bold text-4xl text-left">How does Elektroscrow work?</h1>
                <h1 className="font-medium text-2xl mt-20">Elektroscrow's Ethos</h1>

                <div className="mt-4">
                    <div>
                        Elektroscrow stands as the{" "}
                        <span className="font-bold text-gray-900">
                            {" "}
                            first fully decentralized{" "}
                        </span>{" "}
                        escrow service across blockchain networks, with a strong emphasis on
                        <span className="font-bold text-gray-900">
                            {" "}
                            privacy, decentralization,{" "}
                        </span>{" "}
                        and <span className="font-bold text-gray-900"> security </span>. Distinct
                        from its competitors, Elektroscrow achieves an unparalleled level of
                        decentralization, bolstering trustworthiness by automating dispute
                        resolution{" "}
                        <span className="font-bold text-gray-900">
                            {" "}
                            without human intervention
                        </span>
                        . This approach{" "}
                        <span className="font-bold text-gray-900"> terminates </span> the risk of{" "}
                        <span className="font-bold text-gray-900"> human errors </span> while
                        solving disputes, ensuring{" "}
                        <span className="font-bold text-gray-900"> fair </span> and{" "}
                        <span className="font-bold text-gray-900"> unbiased </span> outcomes.
                        Traditional escrow services often rely on intermediaries to resolve
                        disputes, which introduces a level of centralization and potentially
                        diminishes user confidence in their platforms. Elektroscrow, however,
                        revolutionizes dispute resolution by necessitating mutual reconciliation
                        between parties to reach a mutually satisfactory resolution by leveraging
                        smart contracts. The escrow transaction is executed only when both the
                        recipient and provider reach a{" "}
                        <span className="font-bold text-gray-900"> consensus</span>, thus creating
                        a <span className="font-bold text-gray-900"> self-governed </span> and
                        <span className="font-bold text-gray-900"> automated </span> process
                        ensuring transparency and trust. Unlike many competitors, Elektroscrow{" "}
                        <span className="font-bold text-gray-900"> does not require </span> users
                        to share their wallet{" "}
                        <span className="font-bold text-gray-900"> secret phrases</span>,
                        maintaining the integrity and security of user assets. The process is
                        remarkably user-friendly; users simply connect their wallets to the
                        protocol, streamlining the experience while ensuring maximum security.
                    </div>
                    <div className="mt-10">
                        In terms of <span className="font-bold text-gray-900"> privacy</span>,
                        Elektroscrow sets a high standard by{" "}
                        <span className="font-bold text-gray-900"> not retaining any logs </span>{" "}
                        or requiring more information than the user’s wallet address. The nature of
                        the escrow transaction{" "}
                        <span className="font-bold text-gray-900"> remains confidential</span>, as
                        the protocol{" "}
                        <span className="font-bold text-gray-900"> does not inquire </span> about
                        the <span className="font-bold text-gray-900"> purpose </span> of the
                        escrow, reflecting our deep commitment to user{" "}
                        <span className="font-bold text-gray-900"> privacy</span>. This policy
                        reinforces the core tenets of Web3, focusing on decentralization and
                        self-governance, and establishes Elektroscrow as a
                        <span className="font-bold text-gray-900"> trust-centric </span> and{" "}
                        <span className="font-bold text-gray-900"> privacy-focused </span>{" "}
                        platform. Users can engage in transactions with the assurance of
                        transparency and trust, knowing that their privacy is respected and their
                        transactions are secure.
                    </div>
                </div>
            </div>
            <div className=" py-4">
                <h1 className="font-medium text-2xl mt-10">Decentralization logic</h1>

                <img
                    src="/how_illustrate.png"
                    alt="Escrow Process Illustration"
                    className=" flex mt-4 mb-4 rounded-3xl"
                />
                <div className="mt-10">
                    <div className="font-medium mb-2">Initiating the Escrow Process:</div>
                    <div>
                        To initiate an escrow, the buyer is required to establish a new escrow
                        contract by submitting accurate data. Subsequently, both parties must
                        transfer the stipulated amounts into the newly created contract. A pivotal
                        feature of this system is the{" "}
                        <span className="font-bold text-gray-900">safety deposit</span>, which is
                        mandatory for both parties prior to activating the escrow. This mechanism
                        is integral to enforcing the protocol’s reconciliation rule. The safety
                        deposit amount is equivalent to the transaction value within the escrow.
                        Consequently, the receiver is obligated to deposit a sum double the value
                        of the escrow, while the provider deposits an amount equal to the escrow
                        value. This process ensures enhanced security and commitment from both
                        parties, aligning with the core principles of decentralized finance and
                        fostering trust in the transaction.
                        <div className="mt-10 mb-10 italic bg-yellow-100 bg-opacity-30 rounded-3xl p-4">
                            <div className="mb-6 underline decoration-dotted underline-offset-4">
                                <span className="font-medium ">Example: </span> Lets say the escrow
                                amount is <span className="font-bold">x</span> amount of tokens and{" "}
                                <span className="font-bold">fee</span> is the protocol fee:{" "}
                            </div>
                            <div className="flex mt-2">
                                <div className="font-medium">
                                    <div className="">Required amounts to deposit:</div>
                                    <div className="mt-11 mb-1">
                                        Transfered amounts after successfull escrow:
                                    </div>
                                    <div className=" mt-8">
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

                                    <div className="flex wdefined:mt-7 mt-8 ">
                                        <div className="font-medium ">
                                            Buyer: <span className="font-normal">(x - fee/2)</span>
                                        </div>
                                    </div>
                                    <div className="flex  ">
                                        <div className="font-medium wdefined:mt-8 mt-16">
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
                                    <div className=" wdefined:mt-7 mt-16 mb-1">
                                        Seller: <span className="font-normal">(2x - fee/2)</span>
                                    </div>
                                    <div className=" wdefined:mt-8 mt-16">
                                        Seller: <span className="font-normal">(x - fee/2)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            Safety deposits are refunded upon the conclusion of the escrow. The
                            protocol fee is equally divided and deducted from these safety
                            deposits. The funds are{" "}
                            <span className="font-bold text-gray-900">always withdrawable</span>{" "}
                            and{" "}
                            <span className="font-bold text-gray-900">
                                not subject to the protocol fee
                            </span>{" "}
                            prior to the contract{" "}
                            <span className="font-bold text-gray-900">initializing</span>. The
                            contract is activated when{" "}
                            <span className="font-bold text-gray-900">both parties</span> have
                            contributed the necessary amounts, including safety deposits. Once
                            initialized, withdrawals are disabled. However, if one party has not
                            funded the contract, the other party can always withdraw their funds
                            without incurring a protocol fee. The only way to end an escrow
                            contract after initialization and full funding by both parties is,
                            through a mutual decision regarding the escrow's outcome.
                            <div className="font-medium mt-20 mb-2">Post-Initialization:</div>
                            <div>
                                After funding and initialization of the contract, there are three
                                potential outcomes. If both participants approve the escrow, the
                                transaction is successfully completed and funds are transferred. If
                                both request a refund, the contract concludes, and each party
                                retrieves their initial deposits, minus the protocol fee. The last
                                scenario involves the escrow tokens remaining in the contract until
                                one of the aforementioned outcomes occurs. Should either or both
                                parties opt to decline, the contract persists, safeguarding the
                                assets until a consensus is reached. This structure compels parties
                                to collaborate towards an optimal resolution, as their assets
                                remain locked until an agreement is made. Elektroscrow achieves{" "}
                                <span className="font-bold text-gray-900">
                                    full decentralization
                                </span>{" "}
                                by obliging participants to resolve disputes autonomously, governed
                                by smart contracts, thereby{" "}
                                <span className="font-bold text-gray-900">
                                    eliminating the need for a third-party moderator
                                </span>
                                .
                            </div>
                        </div>
                        <div className="mt-10 mb-10 italic bg-yellow-100 bg-opacity-30 rounded-3xl p-4">
                            <div className="mb-6 underline decoration-dotted underline-offset-4">
                                <span className="font-medium ">
                                    All possible scenarios after decisions are made:{" "}
                                </span>
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
                                    <div className="wdefinedsmlg:ml-4  mt-10 ">
                                        Seller: <span className=" text-greeen ">Accept</span>
                                    </div>
                                    <div className="wdefinedsmlg:ml-4  mt-4 ">
                                        Seller: <span className=" text-writingdark">Refund</span>
                                    </div>
                                    <div className="wdefinedsmlg:ml-4  mt-4">
                                        Seller: <span className=" text-writingdark">Refund</span>
                                    </div>
                                    <div className="wdefinedsmlg:ml-4  mt-4">
                                        Seller: <span className=" text-greeen">Accept</span>
                                    </div>
                                    <div className="wdefinedsmlg:ml-4  mt-4">
                                        Seller: <span className=" text-greeen">Accept</span>
                                    </div>
                                    <div className="wdefinedsmlg:ml-4  mt-4">
                                        Seller: <span className=" text-reed">Decline</span>
                                    </div>
                                    <div className="wdefinedsmlg:ml-4  mt-4">
                                        Seller: <span className=" text-reed">Decline</span>
                                    </div>
                                    <div className="wdefinedsmlg:ml-4  mt-4">
                                        Seller: <span className=" text-writingdark">Refund</span>
                                    </div>
                                    <div className="wdefinedsmlg:ml-4  mt-4">
                                        Seller: <span className=" text-reed">Decline</span>
                                    </div>
                                </div>
                                <div className="wdefinedsmlg:ml-32 ml-4 wdefined:w-auto w-full">
                                    <div className="font-medium ">Outcomes:</div>

                                    <div className="flex wdefinedmt-6 mt-4 bg-green-100 bg-opacity-50 px-2 rounded-md ">
                                        <div className="font-normal ">Successfull transfer</div>
                                    </div>
                                    <div className="flex wdefined:mt-4 mt-11 w-auto bg-yellow-100 bg-opacity-90 px-2 rounded-md">
                                        <div className="font-normal ">Refund</div>
                                    </div>
                                    <div className="flex wdefined:mt-4 mt-10 ">
                                        <div className="font-normal ">Safekeeping*</div>
                                    </div>
                                    <div className="flex wdefined:mt-4 mt-10 ">
                                        <div className="font-normal ">Safekeeping*</div>
                                    </div>
                                    <div className="flex wdefined:mt-4 mt-10  ">
                                        <div className="font-normal ">Safekeeping*</div>
                                    </div>
                                    <div className="flex wdefined:mt-4 mt-10 ">
                                        <div className="font-normal ">Safekeeping*</div>
                                    </div>
                                    <div className="flex wdefined:mt-4 mt-10 ">
                                        <div className="font-normal ">Safekeeping*</div>
                                    </div>
                                    <div className="flex wdefined:mt-4 mt-9 ">
                                        <div className="font-normal ">Safekeeping*</div>
                                    </div>
                                    <div className="flex wdefined:mt-4 mt-10">
                                        <div className="font-normal ">Safekeeping*</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10  ">
                                <span className="font-medium mr-2 ">Safekeeping*</span>= Funds are
                                securely kept inside the contract until either{" "}
                                <span className="font-medium  "> refund </span> or{" "}
                                <span className="font-medium  "> transfer </span>
                                outcomes happen
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <h1 className="font-medium text-2xl mt-10">Starting a New Escrow</h1>
                <div className="flex mt-6">
                    <div className="mt-4 wdefinedlg:mr-6">
                        <div className="flex justify-center">
                            <img
                                src="/how1.png"
                                alt="Escrow Process Illustration"
                                className="wdefinedlg:hidden flex mt-4 mb-4 w-96 rounded-xl"
                            />
                        </div>
                        <div>
                            The creation of an escrow contract is exclusively initiated by the
                            buyer. This means it can only be initialized if you are the party
                            requesting a service or purchasing an asset. Providers or sellers must
                            inform the buyer to commence this process.
                        </div>
                        <div className="mt-4">
                            To establish an escrow contract between the receiver and the provider,
                            the buyer must input the seller’s contract address into the designated
                            field. Subsequently, the buyer specifies the amount of tokens to be
                            transferred upon the contract's completion. The next step involves
                            selecting a token contract for the escrow, either from Elektroscrow's
                            listed tokens or by entering a custom token.{" "}
                            <span className="opacity-80 italic">
                                (Always conduct due diligence when using custom tokens)
                            </span>{" "}
                            Once all fields are populated with{" "}
                            <span className="font-bold text-gray-900">correct data</span>, the
                            buyer finalizes the process by clicking the{" "}
                            <span className="font-bold text-gray-900">Start Escrow</span> button to
                            create the contract.
                        </div>
                    </div>
                    <img
                        src="/how1.png"
                        alt="Escrow Process Illustration"
                        className="hidden wdefinedlg:flex mt-4 w-96 rounded-xl"
                    />
                </div>
            </div>

            <div className="py-4">
                <h1 className="font-medium text-2xl mt-10">Approving Tokens</h1>

                <div className="mt-4 flex justify-center">
                    <div>
                        <img
                            src="/howApprove.png"
                            alt="Token Approval Process"
                            className="mt-4 w-96 rounded-xl"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    Once an escrow contract is established, the next step involves authorizing the
                    contract to access your tokens for the escrow transaction. To do this, click
                    the <span className="font-bold text-gray-900">Approve</span> button, followed
                    by confirming the transaction in your wallet. This approval is a crucial step
                    to ensure the secure and authorized usage of your tokens in the escrow process,
                    aligning with the principles of decentralized finance and smart contract
                    operations.
                </div>
            </div>

            <div className="py-4">
                <h1 className="font-medium text-2xl mt-10">Funding the Contract</h1>

                <div className="mt-4 flex justify-center">
                    <div>
                        <img
                            src="/howFund.png"
                            alt="Contract Funding Process"
                            className="mt-4 w-96 rounded-xl"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    Once the escrow contract has been approved, the next crucial step is funding
                    it. The specific deposit amount required from you is displayed in the{" "}
                    <span className="font-bold text-gray-900">Deposit</span> section, located at
                    the bottom right of the interface. By pressing the{" "}
                    <span className="font-bold text-gray-900">Fund</span> button, the token amount
                    indicated under the "Deposit" section will be transferred from your wallet to
                    the escrow contract. It is essential that both parties fund the contract for it
                    to be successfully initialized, ensuring a secure and equitable transaction
                    process.
                </div>
            </div>

            <div className="py-4">
                <h1 className="font-medium text-2xl mt-10">Withdrawing Funded Assets</h1>

                <div className="mt-4 flex justify-center">
                    <div>
                        <img
                            src="/howWithdraw.png"
                            alt="Asset Withdrawal Process"
                            className="mt-4 w-96 rounded-xl"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    You have the option to withdraw your funded assets prior to the{" "}
                    <span className="font-bold text-gray-900">initialization</span> of the
                    contract. Assets withdrawn at this stage are exempt from the protocol fee. Upon
                    clicking the <span className="font-bold text-gray-900">Withdraw</span> button,
                    your initial deposit will be transferred back to your wallet in full, with no
                    deductions. This feature is to ensure trust and flexibility for users.
                </div>
            </div>

            <div className="py-4">
                <h1 className="font-medium text-2xl mt-10">Escrow Decisions</h1>

                <div className="mt-4 flex justify-center">
                    <div>
                        <img
                            src="/howDecisions.png"
                            alt="Decision Making Process in Escrow"
                            className="mt-4 w-96 rounded-xl"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    Once the contract is initialized, both parties are presented with{" "}
                    <span className="font-bold text-gray-900">three decision buttons</span>.
                    Initially, the default decision for both parties is set to{" "}
                    <span className="font-bold text-gray-900">Decline</span>. Upon reaching a{" "}
                    <span className="font-bold text-gray-900">reconciliation</span> of decisions,
                    the contract will either{" "}
                    <span className="font-bold text-gray-900">refund</span> the initial deposits or{" "}
                    <span className="font-bold text-gray-900">transfer</span> the escrow amount to
                    the seller/provider, after the protocol fee deduction.{" "}
                    <span className="font-bold text-gray-900">No action is taken</span> if at least
                    one party continues to decline, with the protocol securely safeguarding the
                    assets until an agreement is reached. This mechanism ensures a fair and secure
                    transaction process, adhering to the decentralized ethos of trustless
                    transactions.
                </div>
            </div>

            <div className="py-4">
                <h1 className="font-medium text-2xl mt-10">Ending of an Escrow</h1>

                <div className="mt-4 flex justify-center">
                    <div>
                        <img
                            src="/howEnded.png"
                            alt="Escrow Completion Process"
                            className="mt-4 w-96 rounded-xl"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    Once the parties reach a{" "}
                    <span className="font-bold text-gray-900"> mutual decision</span> regarding the
                    escrow outcome, the contract concludes and becomes inoperative for future use.
                    Each escrow contract is designed for a{" "}
                    <span className="font-bold text-gray-900">single use</span>; following its
                    conclusion, a new contract must be established for any subsequent escrow
                    transactions. At the end of a contract, its balance is depleted to zero, and
                    the assets are either refunded to the participants or the escrow amount is
                    transferred to the seller/provider. Additionally, safety deposits are returned
                    to both parties. This process ensures a clear, secure, and final resolution to
                    each escrow transaction.
                </div>
            </div>

            <div className="py-4 mb-16">
                <h1 className="font-medium text-2xl mt-10">Past Escrow Contracts</h1>

                <div className="mt-4 flex justify-center">
                    <div>
                        <img
                            src="/howPastEscrows.png"
                            alt="Reviewing Past Escrow Contracts"
                            className="mt-4 w-96 rounded-3xl"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    Users have the ability to review their previous escrow contracts by clicking
                    the button located beneath the{" "}
                    <span className="font-bold text-gray-900">Current Escrow</span> section. The
                    displayed list varies based on whether the user's wallet participated as a{" "}
                    <span className="font-bold text-gray-900">Buyer</span> or a{" "}
                    <span className="font-bold text-gray-900">Seller</span> in a contract.
                    Additionally, each contract in the list is accompanied by its status,
                    distinctly marked as either{" "}
                    <span className="font-bold text-gray-900">Live</span> or{" "}
                    <span className="font-bold text-gray-900">Ended</span>. This feature enhances
                    transparency and enables users to easily track and manage their escrow
                    transactions.
                </div>
            </div>
        </div>
    )
}
export default How
