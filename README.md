# Elektroscrow Frontend

![Elektroscrow Banner](assets/banner.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Powered by Next.js](https://img.shields.io/badge/Next.js-12-blue.svg)](https://nextjs.org)

Elektroscrow is the first fully decentralized escrow service built to operate across multiple blockchain networks. This repository contains the frontend implementation of the Elektroscrow platform—developed with React and Next.js—to provide a seamless, responsive user interface for interacting with the underlying smart contracts.

Elektroscrow eliminates reliance on centralized intermediaries by leveraging immutable, self-executing smart contracts. It provides secure, trustless, and private escrow transactions where funds are only released when both parties reach a consensus.

## Project's Development

This project is developed as part of the Elektroscrow decentralized application by [@alqeren1](https://github.com/alqeren1).

## Social Links
- Decentralized Application: [elektroscrow.com](https://elektroscrow.com)
- X (Twitter): [x.com/elektroscrow](https://x.com/elektroscrow)

---

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
  - [User Interface Overview](#user-interface-overview)
  - [Smart Contract Integration](#smart-contract-integration)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Deployment & Testing Commands](#deployment--testing-commands)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Decentralized Interaction:**  
  Seamlessly interact with Elektroscrow smart contracts to initiate and manage escrow transactions without intermediaries.

- **Enhanced Privacy:**  
  Users only need to share their wallet addresses. No personal data is stored, and transaction purposes remain confidential. We have a strict "no log" policy.

- **Responsive Design:**  
  Developed with React and Next.js, ensuring an optimized experience on desktops, tablets, and mobile devices.

- **Secure Wallet Integration:**  
  Connect your wallet securely to access full platform features, including escrow initiation, funding, and withdrawal.

- **Real-Time Data:**  
  Display on-chain escrow statuses and transaction history in real-time for complete transparency.

- **User-Friendly Interface:**  
  Intuitive design that guides users through complex escrow processes with ease.

- **Audited & Verified:**  
  Code audited and developers KYC verified by [SolidProof](https://x.com/SolidProof_io/status/1763958258165764441).

---

## How It Works

### User Interface Overview

The frontend provides a modern, clean UI that allows users to:
- Connect their wallet securely.
- Initiate new escrow transactions by entering required details.
- Monitor active escrows and review historical transactions.
- Receive real-time updates and notifications on transaction progress.

### Smart Contract Integration

The application communicates directly with Elektroscrow smart contracts to:
- Fetch and display escrow data.
- Execute functions such as escrow creation, funding, approval, and dispute resolution.
- Ensure that all interactions remain secure, trustless, and fully verifiable on-chain.

### Escrow Process Overview

Elektroscrow is designed to facilitate secure escrow transactions with the following steps:

1. **Initiate Escrow:**  
   - **Buyer:** Initiates a new escrow by providing the seller’s wallet address, token type, and transaction amount.  
   - **Data Entry:** The buyer fills out the escrow details through the user interface and creates a new escrow contract.

2. **Funding & Approvals:**  
   - Both parties must deposit the required funds into the escrow contract.  
   - **Safety Deposit:** Each party deposits a safety deposit equal to the escrow amount.  
   - **Token Approval:** The contract is authorized to spend the specified tokens from the user’s wallet.

3. **Escrow Decisions:**  
   - Once fully funded, both buyer and seller are prompted with three options: `Accept`, `Decline`, and `Refund`.  
   - The contract executes the transaction only when both parties agree on either releasing funds (upon a successful transaction) or refunding the deposits (in case of disputes).

4. **Finalization:**  
   - **Successful Transaction:** Funds (minus protocol fees) are transferred to the seller, and safety deposits are refunded.  
   - **Refund:** Both parties retrieve their deposits, adjusted for any protocol fee.  
   - **Pending Resolution:** If either party declines, funds remain in the contract until a mutual decision is made.

### Decentralization & Security

- **Trustless Execution:**  
  Smart contracts enforce all rules without human intervention, eliminating risks associated with centralized control.

- **Immutable Code:**  
  Once deployed, the contracts cannot be altered, guaranteeing consistent behavior and integrity of the escrow process.

- **User Autonomy:**  
  Users maintain control over their funds until a consensus is reached, ensuring privacy and reducing exposure to fraud.

---

## Getting Started

### Prerequisites

Before running the application, ensure you have:
- [Node.js (>= 14.x)](https://nodejs.org/)
- npm or yarn package manager
- A modern web browser with MetaMask support

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/alqeren1/Elektroscrow_frontend.git
cd Elektroscrow_frontend
npm install
# or, if you prefer yarn:
# yarn install
```

### Configuration

 
- **Next.js Configuration:**  
  Adjust settings in `next.config.js` if required for your deployment environment.

---

## Usage

### Running the Development Server

Start the development server with:

```bash
npm run dev
# or, using yarn:
# yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.



### Building for Production

Generate a production build with:

```bash
npm run build
# or, using yarn:
# yarn build
```

After building, start the production server:

```bash
npm start
```

---

## Deployment & Testing Commands

For quick reference, here are the essential commands:

- **Development Server:**
  ```bash
  npm run dev
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Start Production Server:**
  ```bash
  npm start
  ```


---

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or further information, please reach out at [alqeren1@gmail.com](mailto:alqeren1@gmail.com).
