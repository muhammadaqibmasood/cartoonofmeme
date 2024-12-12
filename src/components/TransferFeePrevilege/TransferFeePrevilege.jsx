import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  Stack,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import desktop2 from "../../assets/desktop2.png";
import sol from "../../assets/sol.png";
import presale from "../../assets/PresaleSwap.png";
import exchange from "../../assets/exchange.png";
import coin1 from "../../assets/coin1.png";
import button from "../../assets/button.png";
import { CustomizeInput } from "../CustomizeInput";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import BigOrangeButton from "../BigOrangeButton";
import {
  Keypair,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { mint } from "../utils/constants";
import {
  findAssociatedTokenAccountPublicKey,
  sendTransaction,
  usePresaleProgram,
} from "../utils/hooks";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createWithdrawWithheldTokensFromAccountsInstruction,
  getAccount,
  getMint,
  getOrCreateAssociatedTokenAccount,
  getTransferFeeAmount,
  unpackAccount,
} from "@solana/spl-token";
import { formatUnits, parseUnits } from "@ethersproject/units";
import NotificationModal from "../NotificationModal/NotificationModal";
import { CustomizedSelect } from "../Home/AppComponents";
import { Transaction } from "@solana/web3.js";
const TransferFeePrevilege = () => {
  const { publicKey, sendTransaction: sendWalletTx } = useWallet();
  const wallet = useWallet();
  const { connection } = useConnection();
  const [loading, setloading] = useState(false);
  const [feeAmount, setfeeAmount] = useState(0);
  const [withdrawalAccounts, setwithdrawalAccounts] = useState([]);
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });

  let getData = async () => {
    try {
      const [allAccounts, { decimals }] = await Promise.all([
        connection.getProgramAccounts(TOKEN_2022_PROGRAM_ID, {
          commitment: "confirmed",
          filters: [
            {
              memcmp: {
                offset: 0,
                bytes: mint.toString(),
              },
            },
          ],
        }),
        getMint(connection, mint, undefined, TOKEN_2022_PROGRAM_ID),
      ]);
      const accountsToWithdrawFrom = [];
      let withdrawalFee = 0;
      for (const accountInfo of allAccounts) {
        const account = unpackAccount(
          accountInfo.pubkey,
          accountInfo.account,
          TOKEN_2022_PROGRAM_ID
        );
        const transferFeeAmount = getTransferFeeAmount(account);
        if (
          transferFeeAmount !== null &&
          transferFeeAmount.withheldAmount > BigInt(0)
        ) {
          withdrawalFee += +formatUnits(
            transferFeeAmount.withheldAmount.toString(),
            decimals
          );
          console.log(
            +formatUnits(transferFeeAmount.withheldAmount.toString(), decimals),
            "fee"
          );
          accountsToWithdrawFrom.push(accountInfo.pubkey);
        }
      }
      setfeeAmount(withdrawalFee);
      setwithdrawalAccounts(accountsToWithdrawFrom);
    } catch (error) {
      console.log(error, "+++++++++++++");
    }
  };
  useEffect(() => {
    if (connection && publicKey) {
      getData();
    }
  }, [publicKey, connection]);
  const claimFeeHandler = async () => {
    try {
      if (feeAmount <= 0) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Nothing to claim.",
        });
      }
      setloading(true);
      // cont mintInfo=new Mint
      let associateAccount;
      const [associateTokenAccount] = await Promise.all([
        findAssociatedTokenAccountPublicKey(publicKey, mint),
      ]);
      const AccountData = await connection.getParsedAccountInfo(
        associateTokenAccount
      );
      if (AccountData.value) {
        associateAccount = associateTokenAccount;
      } else {
        const ix = new TransactionInstruction({
          programId: ASSOCIATED_TOKEN_PROGRAM_ID,
          data: Buffer.from([]),
          keys: [
            { pubkey: publicKey, isSigner: true, isWritable: true },
            {
              pubkey: associateTokenAccount,
              isSigner: false,
              isWritable: true,
            },
            { pubkey: publicKey, isSigner: false, isWritable: false },
            {
              pubkey: mint,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: SystemProgram.programId,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: TOKEN_2022_PROGRAM_ID,
              isSigner: false,
              isWritable: false,
            },
            {
              pubkey: SYSVAR_RENT_PUBKEY,
              isSigner: false,
              isWritable: false,
            },
          ],
        });
        await sendTransaction(connection, wallet, [ix], []);
        associateAccount = associateTokenAccount;
      }
      const tx = await createWithdrawWithheldTokensFromAccountsInstruction(
        mint,
        associateAccount,
        publicKey,
        [],
        withdrawalAccounts,
        TOKEN_2022_PROGRAM_ID
      );
      const transaction = new Transaction();

      transaction.add(tx);

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;
      transaction.feePayer = publicKey;

      console.log(transaction);
      const signedTransaction = await sendWalletTx(transaction, connection);
      console.log(signedTransaction);
      // const signature = await connection.sendRawTransaction(
      //   signedTransaction.serialize()
      // );

      // tx.recentBlockhash = blockhash;
      // tx.lastValidBlockHeight = lastValidBlockHeight;
      // tx.feePayer = publicKey;
      // const sign = await sendWalletTx(tx, connection, {
      //   signers: [],
      // });
      await connection.confirmTransaction({
        signature: signedTransaction,
        blockhash,
        lastValidBlockHeight,
      });
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });
      getData();

      setloading(false);
    } catch (error) {
      console.log(error, "error==>");
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message:
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error,
      });
      setloading(false);
    }
  };
  return (
    <>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Box
        sx={{
          backgroundImage: `url(${desktop2})`,
          backgroundPosition: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          overflow: "hidden",
          py: 3,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              bgcolor: "#301B00",
              border: "1px solid #504c54",
              boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
              borderRadius: "18px",
              p: { xs: 2, sm: 4 },
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h4" textAlign="center" color="white" mb={2}>
                Transfer Fee Claim
              </Typography>
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "13px", sm: "16px" },
              }}
              color="white"
              my={0}
            >
              Claimable Transfer Fee : {feeAmount.toFixed(3)} Cartoon
            </Typography>
            <Stack direction="row" justifyContent="center" my={2}>
              <BigOrangeButton onClick={claimFeeHandler} loading={loading}>
                Claim
              </BigOrangeButton>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TransferFeePrevilege;
