import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import desktop2 from "../../assets/desktop2.png";

import sol from "../../assets/sol.png";
import presale from "../../assets/PresaleSwap.png";
import exchange from "../../assets/exchange.png";
import coin1 from "../../assets/coin1.png";
import button from "../../assets/button.png";
import { CustomizeInput } from "../CustomizeInput";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  findAssociatedTokenAccountPublicKey,
  sendTransaction,
  usePresaleProgram,
} from "../utils/hooks";
import NotificationModal from "../NotificationModal/NotificationModal";
import {
  Connection,
  Keypair,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
  clusterApiUrl,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import {
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import BigOrangeButton from "../BigOrangeButton";
import { chainlinkFeed, chainlinkProgram, mint } from "../utils/constants";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { formatUnits, parseUnits } from "@ethersproject/units";
import axios from "axios";
const Presale = () => {
  const match = useMediaQuery("(max-width:900px)");
  const { publicKey, sendTransaction: sendWalletTx } = useWallet();
  const wallet = useWallet();
  const [From, setFrom] = useState("");
  const [ToToken, setToToken] = useState("");
  const presaleProgram = usePresaleProgram();
  const [tokenTransfer, settokenTransfer] = useState("");
  const { connection } = useConnection();
  const [loading, setloading] = useState(false);
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [presaleData, setpresaleData] = useState(undefined);
  const [userData, setuserData] = useState(undefined);

  let getData = async () => {
    try {
      let [
        [presaleAccount],
        { decimals },
        {
          data: { USD },
        },
      ] = await Promise.all([
        presaleProgram.account.presaleAccount.all(),
        getMint(connection, mint, undefined, TOKEN_2022_PROGRAM_ID),
        axios.get(
          "https://min-api.cryptocompare.com/data/price?fsym=SOL&tsyms=USD"
        ),
      ]);

      if (presaleAccount) {
        let obtain = +formatUnits(
          presaleAccount?.account?.stages?.[
            Number(presaleAccount.account?.activeStage) >
            presaleAccount.account.stages.length - 1
              ? presaleAccount.account.stages.length - 1
              : Number(presaleAccount.account?.activeStage)
          ]?.soldTokens.toString(),
          decimals.toString()
        );
        let total = +formatUnits(
          presaleAccount?.account?.stages?.[
            Number(presaleAccount.account?.activeStage) >
            presaleAccount.account.stages.length - 1
              ? presaleAccount.account.stages.length - 1
              : Number(presaleAccount.account?.activeStage)
          ]?.allocation.toString(),
          decimals
        );

        let solRaised = +formatUnits(
          presaleAccount?.account?.solRaised.toString(),
          9
        );
        let totalRaised = (+solRaised).toFixed(2);
        let percentage = +((+obtain / total) * 100).toFixed(2);
        setpresaleData({
          percentage,
          ...presaleAccount.account,
          remaining: total - obtain,
          presaleAccount: presaleAccount.publicKey,
          currentTokenPrice: (
            1 /
            +formatUnits(
              presaleAccount.account.stages[
                Number(presaleAccount.account?.activeStage) >
                presaleAccount.account.stages.length - 1
                  ? presaleAccount.account.stages.length - 1
                  : Number(presaleAccount.account?.activeStage)
              ].price.toString(),
              decimals
            )
          ).toFixed(9),
          tokenPrice: +formatUnits(
            presaleAccount.account.stages[
              Number(presaleAccount.account?.activeStage) >
              presaleAccount.account.stages.length - 1
                ? presaleAccount.account.stages.length - 1
                : Number(presaleAccount.account?.activeStage)
            ].price.toString(),
            decimals
          ),
          soldTokens: +formatUnits(
            presaleAccount.account.stages[
              Number(presaleAccount.account?.activeStage) >
              presaleAccount.account.stages.length - 1
                ? presaleAccount.account.stages.length - 1
                : Number(presaleAccount.account?.activeStage)
            ].soldTokens.toString(),
            decimals
          ),
          allocation: +formatUnits(
            presaleAccount.account.stages[
              Number(presaleAccount.account?.activeStage) >
              presaleAccount.account.stages.length - 1
                ? presaleAccount.account.stages.length - 1
                : Number(presaleAccount.account?.activeStage)
            ].allocation.toString(),
            decimals
          ),
          nextTokenPrice:
            Number(presaleAccount.account?.activeStage + 1) >
            presaleAccount.account.stages.length - 1
              ? 0.01
              : (
                  1 /
                  +formatUnits(
                    presaleAccount.account.stages[
                      Number(presaleAccount.account?.activeStage + 1)
                    ]?.price.toString(),
                    decimals
                  )
                ).toFixed(9),
          oneSolPrice: USD,
          totalRaised,
        });
      }
      if (publicKey) {
        let userAccounts = await presaleProgram.account.userAccount.all();
        let tokens = 0;
        userAccounts.map(({ account, publicKey }) => {
          tokens += +formatUnits(account.totalTokens.toString(), decimals);
        });
        userAccounts = userAccounts.find(({ account: { user } }) =>
          user.equals(publicKey)
        );
        if (userAccounts?.publicKey) {
          setuserData({
            userAccount: userAccounts.publicKey,
            ...userAccounts.account,
            totalTokens:
              +formatUnits(
                userAccounts.account.totalTokens.toString(),
                decimals
              ) -
              +formatUnits(
                userAccounts.account.claimedTokens.toString(),
                decimals
              ),
          });
        }
      }
    } catch (error) {
      console.log(error, "+++++++++++++");
    }
  };
  useEffect(() => {
    if (connection) {
      getData();
    }
  }, [connection, publicKey]);

  const buyHandler = async () => {
    try {
      if (!From || From <= 0 || isNaN(From)) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid value of SOL.",
        });
      }
      setloading(true);
      let { presaleAccount, owner } = presaleData;
      console.log(presaleData, "presaleData");

      const userAccount = Keypair.generate();
      const [[presalePda, bump], { blockhash, lastValidBlockHeight }] =
        await Promise.all([
          PublicKey.findProgramAddressSync(
            [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
            presaleProgram.programId
          ),
          connection.getLatestBlockhash("confirmed"),
        ]);

      if (userData?.userAccount) {
        const tx = await presaleProgram.methods
          .existingBuy(new anchor.BN(+parseUnits(From.toString(), 9)))
          .accounts({
            userAccount: userData.userAccount,
            presalePda,
            chainlinkFeed,
            chainlinkProgram,
            presaleAccount,
            owner,
            user: publicKey,
            rent: SYSVAR_RENT_PUBKEY,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .transaction();
        tx.recentBlockhash = blockhash;
        tx.lastValidBlockHeight = lastValidBlockHeight;
        tx.feePayer = publicKey;
        const sign = await sendWalletTx(tx, connection, {
          signers: [],
        });
        await connection.confirmTransaction({
          signature: sign,
          blockhash,
          lastValidBlockHeight,
        });
      } else {
        const tx = await presaleProgram.methods
          .buy(new anchor.BN(+parseUnits(From.toString(), 9)))
          .accounts({
            userAccount: userAccount.publicKey,
            presalePda,
            chainlinkFeed,
            chainlinkProgram,
            presaleAccount,
            owner,
            user: publicKey,
            rent: SYSVAR_RENT_PUBKEY,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([userAccount])
          .transaction();
        tx.recentBlockhash = blockhash;
        tx.lastValidBlockHeight = lastValidBlockHeight;
        tx.feePayer = publicKey;
        const sign = await sendWalletTx(tx, connection, {
          signers: [userAccount],
        });
        await connection.confirmTransaction({
          signature: sign,
          blockhash,
          lastValidBlockHeight,
        });
      }
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
          error?.name,
      });
      setloading(false);
    }
  };
  const claimHandler = async () => {
    try {
      if (
        Number(presaleData?.claimedTokens) >= Number(presaleData?.totalTokens)
      ) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "You dont have any token to claim.",
        });
      }
      let { presaleAccount, owner, presaleTokenVault, mint } = presaleData;

      setloading(true);
      let associateAccount;
      const [
        [presalePda, bump],
        associateTokenAccount,
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        findAssociatedTokenAccountPublicKey(publicKey, mint),
        connection.getLatestBlockhash("confirmed"),
      ]);

      const AccountData = await connection.getParsedAccountInfo(
        associateTokenAccount
      );
      if (AccountData.value) {
        associateAccount = associateTokenAccount;
      } else {
        const ix = new TransactionInstruction({
          programId: ASSOCIATED_PROGRAM_ID,
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

      let { userAccount } = userData;
      const tx = await presaleProgram.methods
        .claim()
        .accounts({
          presaleAccount,
          presalePda,
          userAccount,
          presaleTokenVault,
          userTokenAccount: associateAccount,
          owner,
          user: publicKey,
          mint: mint,
          rent: SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [],
      });
      await connection.confirmTransaction({
        signature: sign,
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
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
      setloading(false);
    }
  };
  console.log(presaleData?.soldTokens?.toString());
  return (
    <>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Box
        id="buy"
        sx={{
          backgroundImage: `url(${desktop2})`,
          backgroundPosition: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          overflow: "hidden",
          pt: 3,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            transition={{
              type: "spring",
              damping: 100,
              stiffness: 200,
            }}
            initial={{ x: 5, opacity: 0, y: 0 }}
            whileInView={{ y: [-100, 0], opacity: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pb: 3,
                // marginLeft: { md: "-130px", xs: "0px" },
              }}
            >
              <img
                src={presale}
                alt=""
                style={{ width: "250px", objectFit: "contain" }}
              />
              <Typography
                variant="h5"
                color="#ffff"
                mb={2}
                sx={{
                  color: "#fff",

                  fontSize: { md: "30px", xs: "15px" },
                }}
              >
                Trade tokens in an instant
              </Typography>
              <WalletMultiButton />
            </Box>
          </motion.div>
          <Box
            sx={{
              background: "#301B00",
              border: "1px solid #504c54",
              boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
              borderRadius: "18px",
              p: { xs: 2, sm: 4 },
              textAlign: "center",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              rowGap={3}
            >
              <Typography
                fontFamily="Archivo"
                variant="h5"
                mb={0}
                sx={{
                  color: "#fff",

                  fontSize: { md: "30px", xs: "20px" },
                }}
              >
                Cartoon Presale
              </Typography>
            </Stack>

            <Stack my={2}>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={8} sm={6} md={4}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      py: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#E5E5E5",
                      borderRadius: "12px",
                      boxShadow:
                        "0px 4.07px 10.18px 0px #00000026,0px 0.97px 1.21px 0px #FFFFFF inset",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#151515",
                        fontSize: { xs: "14px", sm: "16px" },
                        fontFamily: "Montserrat",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Stage{" "}
                      {Number(presaleData?.activeStage ?? 0) + 1 >
                      presaleData?.stages?.length
                        ? presaleData?.stages?.length
                        : Number(presaleData?.activeStage ?? 0) + 1}{" "}
                      / {presaleData?.stages?.length}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={8} sm={6} md={4}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      py: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#4F320F",
                      borderRadius: "12px",
                      boxShadow:
                        "0px 4.07px 10.18px 0px #000028,0px 0.97px 1.21px 0px #FFFFFF inset",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#E5E5E5",
                        fontSize: { xs: "14px", sm: "16px" },
                        fontFamily: "Montserrat",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Cartoon = $
                      {parseFloat(presaleData?.currentTokenPrice ?? 0)?.toFixed(
                        2
                      ) ?? 0.0}{" "}
                    </Typography>
                  </Stack>
                </Grid>

                {/* <Grid item xs={8} sm={6} md={4}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    py: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(90deg, #5F3289 0%, #9FE970 100%)",
                    borderRadius: "12px",
                    boxShadow:
                      "0px 4.07px 10.18px 0px #00000026,0px 0.97px 1.21px 0px #FFFFFF inset",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#ffffff",
                      fontSize: { xs: "14px", sm: "16px" },
                      fontFamily: "Montserrat",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    Listing Price 0.00001 SOL
                  </Typography>
                </Stack>
              </Grid> */}

                <Grid item xs={8} sm={6} md={4}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      py: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#F68800",
                      borderRadius: "12px",
                      boxShadow:
                        "0px 4.07px 10.18px 0px #00000026,0px 0.97px 1.21px 0px #FFFFFF inset",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#FFFFFF",
                        fontSize: { xs: "14px", sm: "16px" },
                        fontFamily: "Montserrat",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Next Price $
                      {parseFloat(presaleData?.nextTokenPrice ?? 0)?.toFixed(2)}{" "}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            <Stack
              sx={{
                position: "relative",
                px: 1,
                my: 1,
              }}
            >
              <Stack
                sx={{
                  height: "22px",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  // position: "relative",
                }}
              >
                <Stack
                  sx={{
                    alignItems: "end",
                    width: `${presaleData?.percentage ?? 0}%`,
                    height: "22px",
                    background: "#F68800",
                    position: "relative",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    component={"img"}
                    alt=""
                    src={coin1}
                    sx={{
                      height: { xs: "35px", sm: "40px" },
                      width: { xs: "35px", sm: "40px" },
                      position: "relative",
                      top: { xs: "-5px", sm: "-10px" },
                      right: "-20px",
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack
              flexDirection={{ xs: "column", sm: "row" }}
              gap={{ xs: 2, sm: 4 }}
              alignItems={"center"}
              justifyContent={"center"}
              my={2}
            >
              <Stack
                gap={0.5}
                width={{ xs: "100%", sm: "50%" }}
                alignItems={"center"}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ffffff",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontFamily: "Montserrat",
                    textAlign: "center",
                    fontWeight: "600",
                    lineHeight: "30px",
                    textTransform: "capitalize",
                  }}
                >
                  Tokens Sold
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ffffff",
                    fontSize: { xs: "20px", sm: "24px" },
                    fontFamily: "Saira Stencil One",
                    textAlign: "center",
                    fontWeight: "400",
                    lineHeight: "30px",
                    textTransform: "capitalize",
                  }}
                >
                  {(presaleData?.soldTokens ?? 0.0).toFixed(2)} /{" "}
                  {presaleData?.allocation ?? 0.0}
                </Typography>
              </Stack>
              <Stack
                gap={0.5}
                width={{ xs: "100%", sm: "50%" }}
                alignItems={"center"}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ffffff",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontFamily: "Montserrat",
                    textAlign: "center",
                    fontWeight: "600",
                    lineHeight: "30px",
                    textTransform: "capitalize",
                  }}
                >
                  SOL Raised
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ffffff",
                    fontSize: { xs: "20px", sm: "24px" },
                    fontFamily: "Saira Stencil One",
                    textAlign: "center",
                    fontWeight: "400",
                    lineHeight: "30px",
                    textTransform: "capitalize",
                  }}
                >
                  {presaleData?.totalRaised ?? 0.0} /{" "}
                  {presaleData?.allocation
                    ? (
                        presaleData?.allocation / presaleData?.oneSolPrice
                      ).toFixed(2)
                    : 0.0}
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                bgcolor: "#301B00",
                border: "1px solid #504c54",
                boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                borderRadius: "18px",
                px: 1,
                py: 1,
                textAlign: "left",
                mb: 2,
              }}
            >
              <Typography
                fontFamily="Archivo"
                variant="h6"
                sx={{
                  fontSize: { xs: "13px", sm: "16px" },
                }}
                color="white"
                my={0}
              >
                You pay
              </Typography>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={6} sm={8}>
                  <CustomizeInput
                    type="number"
                    placeholder="1"
                    value={From}
                    inputProps={{
                      min: 0,
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFrom(e.target.value);
                      if (value > 0) {
                        console.log(presaleData?.oneSolPrice);
                        const toValue =
                          +presaleData?.tokenPrice *
                          +presaleData?.oneSolPrice *
                          value;
                        setToToken(toValue);
                      } else {
                        setToToken(0);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack alignItems="flex-end">
                    <Button
                      id="basic-button"
                      sx={{
                        bgcolor: "#301B00",
                        borderRadius: "24px",
                        color: "white",
                        px: 2,
                        fontWeight: "bold",
                      }}
                      startIcon={<img src={sol} width="35px" />}
                    >
                      SOL
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                bgcolor: "#301B00",
                boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                border: "1px solid #504c54",
                borderRadius: "18px",
                px: 1,
                py: 1,
                textAlign: "left",
                mb: 2,
              }}
            >
              <Typography
                fontFamily="Archivo"
                variant="h6"
                sx={{
                  fontSize: { xs: "13px", sm: "16px" },
                }}
                color="white"
                my={0}
              >
                You receive
              </Typography>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={6} sm={8}>
                  <CustomizeInput
                    type="number"
                    placeholder="1"
                    inputProps={{
                      min: 0,
                      readOnly: true,
                    }}
                    value={ToToken}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack alignItems="flex-end">
                    <Button
                      id="basic-button"
                      sx={{
                        bgcolor: "#301B00",
                        borderRadius: "24px",
                        color: "white",
                        px: 2,
                        fontWeight: "bold",
                      }}
                      startIcon={<img src={coin1} width="35px" />}
                    >
                      Cartoon
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            <Stack>
              {publicKey ? (
                <BigOrangeButton onClick={buyHandler} loading={loading}>
                  Buy Now
                </BigOrangeButton>
              ) : (
                <WalletMultiButton
                  style={{
                    textTransform: "capitalize",
                    backgroundColor: "#F68800",
                    color: "#ffffff",
                    borderRadius: "47px",
                    fontSize: "25px",
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                    justifyContent: "center",
                    boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                    "&:hover,&:disabled": {
                      backgroundColor: "#F68800a1",
                    },
                  }}
                />
              )}
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#ffffff",
                  fontSize: { xs: "14px", sm: "16px" },
                  fontFamily: "Montserrat",
                  textAlign: "center",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                Balance:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#ffffff",
                  fontSize: { xs: "20px", sm: "24px" },
                  fontFamily: "Saira Stencil One",
                  textAlign: "center",
                  fontWeight: "400",
                  lineHeight: "30px",
                  textTransform: "capitalize",
                  ml: 0.5,
                }}
              >
                {(userData?.totalTokens ?? 0.0).toFixed(2)}
              </Typography>
            </Stack>
            {publicKey ? (
              <BigOrangeButton
                onClick={claimHandler}
                loading={loading}
                fullWidth
                disabled={
                  !presaleData ||
                  !userData ||
                  userData?.totalTokens === 0 ||
                  Number(presaleData?.vesting) === 0
                }
              >
                {Number(presaleData?.vesting) === 1
                  ? !userData
                    ? "Nothing to Claim"
                    : "Claim Tokens"
                  : userData?.totalTokens === 0
                  ? "Claimed"
                  : "Claiming Not Started"}
              </BigOrangeButton>
            ) : (
              <WalletMultiButton
                style={{
                  textTransform: "capitalize",
                  color: "#ffffff",
                  border: "0.51px solid",
                  background: "#B266FF",
                  fontSize: "18px",
                  boxShadow:
                    "0px 4.07px 10.18px 0px #00000026,0px 0.97px 1.21px 0px #FFFFFF inset",
                  width: "100%",
                  justifyContent: "center",
                  fontFamily: "Saira Stencil One",
                  borderRadius: "12px",
                }}
              />
            )}
          </Box>

          {/* <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item md={5} xs={12}>
              <Box
                sx={{
                  backgroundColor: "#301B00",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="h6" color="#fff">
                  From
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "20px",
                    flexGrow: 1,
                    height: "100%",
                  }}
                >
                  <img
                    src={sol}
                    alt=""
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "contain",
                    }}
                  />
                  <Typography variant="caption" color="#959697">
                    SOL
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  <CustomizeInput
                    inputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    value="SOLANA"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={5} xs={12}>
              <Box
                sx={{
                  backgroundColor: "#301B00",
                  padding: "68px 20px 20px 20px",
                  borderRadius: "10px",
                  flexGrow: 1,
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                  }}
                >
                  <Typography variant="caption" color="#959697">
                    You will pay
                  </Typography>
                  <CustomizeInput
                    type="number"
                    placeholder="1"
                    value={From}
                    inputProps={{
                      min: 0,
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFrom(e.target.value);
                      if (value > 0) {
                        console.log(+presaleData?.tokenPrice);
                        const toValue = +value * +presaleData?.tokenPrice;
                        setToToken(toValue);
                      } else {
                        setToToken(0);
                      }
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid> */}

          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: { md: "-5px", xs: "0px" },
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            >
              <img
                src={exchange}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>

          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item md={5} xs={12}>
              <Box
                sx={{
                  backgroundColor: "#301B00",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="h6" color="#fff">
                  To
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "20px",
                    flexGrow: 1,
                    height: "100%",
                  }}
                >
                  <img
                    src={coin1}
                    alt=""
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "contain",
                    }}
                  />
                  <Typography variant="caption" color="#959697">
                    Cartoon COIN
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: "30px",
                  }}
                >
                  <CustomizeInput
                    inputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    value="Cartoon COIN"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={5} xs={12}>
              <Box
                sx={{
                  backgroundColor: "#301B00",
                  padding: "82px 20px 20px 20px",
                  borderRadius: "10px",
                  flexGrow: 1,
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                  }}
                >
                  <Typography variant="caption" color="#959697">
                    You Get
                  </Typography>
                  <CustomizeInput
                    type="number"
                    inputProps={{ readOnly: true }}
                    value={ToToken}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="center">
                {publicKey ? (
                  <BigOrangeButton onClick={buyHandler} loading={loading}>
                    Buy
                  </BigOrangeButton>
                ) : (
                  <WalletMultiButton />
                )}
              </Stack>
            </Grid>
          </Grid> */}
        </Container>
      
      </Box>
    </>
  );
};

export default Presale;
