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
import coin1 from "../../assets/coin1.png";
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
import { adminPublickey, mint } from "../utils/constants";
import {
  findAssociatedTokenAccountPublicKey,
  sendTransaction,
  usePresaleProgram,
} from "../utils/hooks";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAccount,
  getMint,
} from "@solana/spl-token";
import { formatUnits, parseUnits } from "@ethersproject/units";
import NotificationModal from "../NotificationModal/NotificationModal";
import { CustomizedSelect } from "../Home/AppComponents";
import { Transaction } from "@solana/web3.js";
const OwnerPrevilege = () => {
  const {
    publicKey,
    sendTransaction: sendWalletTx,
    signTransaction,
  } = useWallet();
  const wallet = useWallet();
  const presaleProgram = usePresaleProgram();
  const [tokenTransfer, settokenTransfer] = useState("");
  const { connection } = useConnection();
  const [loading, setloading] = useState(false);
  const [activeStage, setactiveStage] = useState(0);
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [presaleData, setpresaleData] = useState(undefined);

  let getData = async () => {
    try {
      let [presaleAccount] = await presaleProgram.account.presaleAccount.all();

      const { amount } = await getAccount(
        connection,
        presaleAccount.account.presaleTokenVault,
        undefined,
        TOKEN_2022_PROGRAM_ID
      );

      setactiveStage(Number(presaleAccount.account.activeStage));
      if (presaleAccount) {
        setpresaleData({
          ...presaleAccount.account,
          presaleTokenVaultBalance: formatUnits(
            amount,
            presaleAccount.account.decimals.toString()
          ),
          presaleAccount: presaleAccount.publicKey,
        });
      }
    } catch (error) {
      console.log(error, "+++++++++++++");
    }
  };
  useEffect(() => {
    if (connection && publicKey) {
      getData();
    }
  }, [publicKey, connection]);
  const initializeHandler = async () => {
    try {
      setloading(true);

      const presaleAccount = Keypair.generate();
      const presaleTokenVault = Keypair.generate();
      // cont mintInfo=new Mint
      const [
        [presalePda, bump],
        { decimals },
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        getMint(connection, mint, undefined, TOKEN_2022_PROGRAM_ID),
        connection.getLatestBlockhash("confirmed"),
      ]);
      console.log(decimals, "decimals");
      const tx = await presaleProgram.methods
        .initializePresale(
          bump,
          [
            {
              price: new anchor.BN(100),
              allocation: new anchor.BN(100000000),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(50),
              allocation: new anchor.BN(100000000),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
            },
          ],
          decimals
        )
        .accounts({
          presaleAccount: presaleAccount.publicKey,
          presaleTokenVault: presaleTokenVault.publicKey,
          mint,
          owner: adminPublickey,
          admin: adminPublickey,
          presalePda,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
        })
        .signers([presaleAccount, presaleTokenVault])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [presaleAccount, presaleTokenVault],
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
  const changeVestingHandler = async (state) => {
    try {
      setloading(true);
      let { presaleAccount } = presaleData;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      const tx = await presaleProgram.methods
        .changeVesting(new anchor.BN(state))
        .accounts({
          presaleAccount: presaleAccount,
          admin: publicKey,
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
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

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
  const deletePresaleHandler = async (state) => {
    try {
      setloading(true);
      let { presaleAccount } = presaleData;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      const tx = await presaleProgram.methods
        .deletePresale()
        .accounts({
          presaleAccount: presaleAccount,
          admin: publicKey,
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
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

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
  const changeActiveStageHandler = async () => {
    try {
      setloading(true);

      let { presaleAccount } = presaleData;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      const tx = await presaleProgram.methods
        .changeStage(new anchor.BN(activeStage))
        .accounts({
          presaleAccount: presaleAccount,
          admin: publicKey,
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
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

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

  const transferHandler = async () => {
    try {
      if (!tokenTransfer || tokenTransfer <= 0 || isNaN(tokenTransfer)) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid token transfer value.",
        });
      }
      setloading(true);
      let { presaleAccount, presaleTokenVault } = presaleData;
      console.log(presaleData, "presaleData");
      // cont mintInfo=new Mint
      let associateAccount;
      const [[presalePda, bump], { decimals }, associateTokenAccount] =
        await Promise.all([
          PublicKey.findProgramAddressSync(
            [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
            presaleProgram.programId
          ),
          getMint(connection, mint, undefined, TOKEN_2022_PROGRAM_ID),
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
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      console.log(presaleAccount.toString());
      const tx = await presaleProgram.methods
        .transferToken(new anchor.BN(tokenTransfer), new anchor.BN(decimals))
        .accounts({
          presaleAccount: presaleAccount,
          presaleTokenVault: presaleTokenVault,
          mint,
          ownerTokenAccount: associateAccount,
          presalePda,
          owner: publicKey,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
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
                Admin Panel
              </Typography>
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
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="white">
                  Initialize Presale
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    loading={loading}
                    onClick={initializeHandler}
                    disabled={presaleData || loading}
                  >
                    {presaleData ? "Already Initilized" : "Initialize Presale"}
                  </BigOrangeButton>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="white">
                  Start Claiming
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    loading={loading}
                    onClick={() =>
                      changeVestingHandler(
                        Number(presaleData?.vesting) == 1 ? 0 : 1
                      )
                    }
                    disabled={loading}
                  >
                    {Number(presaleData?.vesting) == 1
                      ? "Stop Claiming"
                      : "Start Claiming"}
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>
            <Typography variant="h6" color="white">
              Send tokens to presale token vault
            </Typography>
            <Typography variant="h6" color="white">
              Presale token vault Balance:{" "}
              {presaleData?.presaleTokenVaultBalance ?? 0.0} Cartoon
            </Typography>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12}>
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
                    variant="h6"
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                    }}
                    color="white"
                    my={0}
                  >
                    Send Cartoon to presale token vault
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
                        }}
                        onChange={(e) => settokenTransfer(e.target.value)}
                        value={tokenTransfer}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Stack alignItems="flex-end">
                        <Button
                          id="basic-button"
                          sx={{
                            bgcolor: "#212024",
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
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton onClick={transferHandler} loading={loading}>
                    Transfer Tokens
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Grid item xs={12}>
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
                    variant="h6"
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                    }}
                    color="white"
                    my={0}
                  >
                    Modify Stages
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
                      <CustomizedSelect
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={activeStage}
                        onChange={(e) => setactiveStage(e.target.value)}
                        label="Current Membership"
                      >
                        {presaleData?.stages?.map(({}, index) => (
                          <MenuItem
                            style={{ color: "black" }}
                            value={index}
                            key={"Stage" + index}
                          >
                            <Box>Stage {index + 1}</Box>
                          </MenuItem>
                        ))}
                        <MenuItem
                          style={{ color: "black" }}
                          value={presaleData?.stages?.length}
                        >
                          <Box>End Presale</Box>
                        </MenuItem>
                      </CustomizedSelect>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    onClick={changeActiveStageHandler}
                    loading={loading}
                  >
                    Set Stage
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>

            <Box
              sx={{
                bgcolor: "#301B00",
                border: "1px solid #504c54",
                boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                borderRadius: "18px",
                px: 1,
                py: 1,
                textAlign: "left",
                my: 2,
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                rowSpacing={1}
                columnSpacing={1}
              >
                {presaleData && (
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        bgcolor: "#301B00",
                        border: "1px solid #504c54",
                        boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                        borderRadius: "18px",
                        px: 1,
                        py: 1,
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="white"
                        my={0}
                      >
                        Global Data
                      </Typography>
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="white"
                        my={0}
                      >
                        Total Token Sold :{" "}
                        {formatUnits(
                          presaleData?.soldTokens?.toString(),
                          presaleData?.decimals?.toString()
                        )}
                      </Typography>
                      <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="white"
                        my={0}
                      >
                        SOL Raised :{" "}
                        {formatUnits(presaleData?.solRaised?.toString(), 9)}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "13px", sm: "16px" },
                }}
                color="white"
                my={0}
              >
                Stages Info
              </Typography>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                rowSpacing={1}
                columnSpacing={1}
              >
                {presaleData &&
                  presaleData?.stages?.map(
                    ({ allocation, soldTokens, solRaised, price }, index) => (
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            bgcolor: "#301B00",
                            border: `1px solid ${
                              presaleData?.activeStage === index
                                ? "orange"
                                : "#504c54"
                            }`,
                            borderRadius: "18px",
                            px: 1,
                            py: 1,
                            textAlign: "left",
                          }}
                          key={index}
                        >
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="white"
                            my={0}
                          >
                            {presaleData.activeStage === index && "Active"}{" "}
                            Stage {index + 1}
                          </Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="white"
                            my={0}
                          >
                            Allocation :{" "}
                            {formatUnits(
                              allocation.toString(),
                              presaleData.decimals
                            )}
                          </Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="white"
                            my={0}
                          >
                            Token Price : $
                            {(
                              1 /
                              +formatUnits(
                                price.toString(),
                                presaleData.decimals
                              )
                            ).toFixed(2)}
                          </Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="white"
                            my={0}
                          >
                            Sold Tokens :{" "}
                            {formatUnits(
                              soldTokens.toString(),
                              presaleData?.decimals?.toString()
                            )}
                          </Typography>
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="white"
                            my={0}
                          >
                            SOL Raised : {formatUnits(solRaised.toString(), 9)}
                          </Typography>
                        </Box>
                      </Grid>
                    )
                  )}
              </Grid>
            </Box>

            {/* <Grid item xs={12}>
              <Stack direction="row" justifyContent="center">
                <BigOrangeButton
                  onClick={deletePresaleHandler}
                  loading={loading}
                >
                  Delete Presale
                </BigOrangeButton>
              </Stack>
            </Grid> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OwnerPrevilege;
