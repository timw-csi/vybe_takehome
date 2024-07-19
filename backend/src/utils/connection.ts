// create single Connection instance and PublicKey class export to reuse across services.
// DRY & make it easier for future changes.

import { Connection, PublicKey } from "@solana/web3.js";
import { SOLANA_RPC_ENDPOINT } from "../config/constants";

const connection = new Connection(SOLANA_RPC_ENDPOINT);

export { connection, PublicKey };
