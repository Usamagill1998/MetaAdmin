/**
=========================================================
* Beta Magic React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import choose from "../../assets/images/choose.jpg";

// Beta Magic React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Formik, setNestedObjectValues } from "formik";
import * as yup from "yup";
import server from "../../apis/server";
// import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useWallet } from "use-wallet";
import Web3 from "web3";
import { getNativeSelectUtilityClasses } from "@mui/material";
const poolAbi = require("../../abis/pool.json");
// var provider = process.env.REACT_APP_HTTP_NODE;
// var web3Provider = new Web3.providers.HttpProvider(provider);
// var web3 = new Web3(web3Provider);
var web3 = new Web3();
const poolAddress = process.env.REACT_APP_POOLADDRESS;
const contractAbi = poolAbi.abi;

function Cover() {
  const [state, setState] = useState({
    addReward: "",
    bnbFee: "",
    tokenFee: "",
    burnFee: "",
  });

  const [values, setValue] = useState({
    bnbFee: "",
    tokenFee: "",
    burnFee: "",
    unstakeFee: "",
  });
  const wallet = useWallet();
  useEffect(async () => {
    setValues();
  }, []);

  const setValues = async () => {
    wallet.connect();
    web3.setProvider(
      new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
    );
    const pool = new web3.eth.Contract(contractAbi, poolAddress);
    const bnb = await pool.methods.getBnbFee().call();
    const tokenFee = await pool.methods.getTokenFee().call();
    const burnFee = await pool.methods.getBurnFee().call();
    const unstakeFee = await pool.methods.getUnstakeFee().call();
    const ethToken = web3.utils.fromWei(tokenFee, "ether");
    const ethAmount = web3.utils.fromWei(bnb, "ether");
    setValue({ bnbFee: ethAmount, tokenFee: ethToken, burnFee: burnFee, unstakeFee });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };
  const addRewardFunc = () => {
    wallet.connect();
    web3.setProvider(wallet.ethereum);
    const pool = new web3.eth.Contract(contractAbi, poolAddress);
    const weiAmount = web3.utils.toWei(state.addReward, "ether");
    pool.methods
      .addReward(weiAmount)
      .send({ from: wallet?.account }, async function (result) {
        console.log(result);
      })
      .on("transactionHash", async function (hash) {})
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        // toast.error(e?.message);
        console.log(e);
      });
  };

  const setBnbFee = () => {
    wallet.connect();
    web3.setProvider(wallet.ethereum);
    const pool = new web3.eth.Contract(contractAbi, poolAddress);
    const weiAmount = web3.utils.toWei(state.bnbFee, "ether");
    pool.methods
      .setBnbFee(weiAmount)
      .send({ from: wallet?.account }, async function (result) {
        console.log(result);
      })
      .on("transactionHash", async function (hash) {})
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        // toast.error(e?.message);
        console.log(e);
      });
  };

  const setTokenFee = () => {
    wallet.connect();
    web3.setProvider(wallet.ethereum);
    const pool = new web3.eth.Contract(contractAbi, poolAddress);
    const weiAmount = web3.utils.toWei(state.tokenFee, "ether");
    pool.methods
      .setTokenFee(weiAmount)
      .send({ from: wallet?.account }, async function (result) {
        console.log(result);
      })
      .on("transactionHash", async function (hash) {})
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        // toast.error(e?.message);
        console.log(e);
      });
  };

  const setburnFee = () => {
    wallet.connect();
    web3.setProvider(wallet.ethereum);
    const pool = new web3.eth.Contract(contractAbi, poolAddress);
    pool.methods
      .setBurnFee(state.burnFee)
      .send({ from: wallet?.account }, async function (result) {
        console.log(result);
      })
      .on("transactionHash", async function (hash) {})
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        // toast.error(e?.message);
        console.log(e);
      });
  };

  const setMinAmount = () => {
    wallet.connect();
    web3.setProvider(wallet.ethereum);
    const pool = new web3.eth.Contract(contractAbi, poolAddress);
    const weiAmount = web3.utils.toWei(state.minLimit, "ether");
    pool.methods
      .setMinAmount(weiAmount)
      .send({ from: wallet?.account }, async function (result) {
        console.log(result);
      })
      .on("transactionHash", async function (hash) {})
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        // toast.error(e?.message);
        console.log(e);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <CoverLayout image={bgImage}> */}
      <MDBox mb={2} />

      <Formik
        initialValues={{ name: "", description: "", amount: 1 }}
        enableReinitialize
        // validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSignup(values, resetForm);
        }}
      >
        {(formikProps) => (
          <>
            <Card>
              <MDBox pt={4} mb={2} pb={3} px={3}>
                <h5>BNB enable fee: {values.bnbFee}</h5>
                <h5>Token enable fee: {values.tokenFee}</h5>
                <h5>Staking burn fee percent: {values.burnFee}%</h5>
                <h5>Unstake fee percent: {values.unstakeFee}%</h5>
              </MDBox>
            </Card>
            <Card>
              <MDBox pt={4} mb={2} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      onChange={handleChange}
                      value={state.addReward}
                      label="Add reward in contract (Amount)"
                      name="addReward"
                      onBlur={formikProps.handleBlur("description")}
                      error={
                        formikProps.errors.description && formikProps.touched.description
                          ? true
                          : false
                      }
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton onClick={addRewardFunc} variant="gradient" color="info" fullWidth>
                      Add reward
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>

            <Card>
              <MDBox pt={4} mb={2} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      onChange={handleChange}
                      value={state.bnbFee}
                      label="Set bnb fee to enable (Amount)"
                      name="bnbFee"
                      onBlur={formikProps.handleBlur("bnbFee")}
                      error={
                        formikProps.errors.description && formikProps.touched.description
                          ? true
                          : false
                      }
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton onClick={setBnbFee} variant="gradient" color="info" fullWidth>
                      Set BNB fee
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>

            <Card>
              <MDBox pt={4} mb={2} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      onChange={handleChange}
                      value={state.tokenFee}
                      label="Set token fee to enable (Amount)"
                      name="tokenFee"
                      onBlur={formikProps.handleBlur("tokenFee")}
                      error={
                        formikProps.errors.description && formikProps.touched.description
                          ? true
                          : false
                      }
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton onClick={setTokenFee} variant="gradient" color="info" fullWidth>
                      Set Token fee
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>

            <Card>
              <MDBox pt={4} mb={2} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      onChange={handleChange}
                      value={state.burnFee}
                      label="Set burn to stake (percentage)"
                      name="burnFee"
                      onBlur={formikProps.handleBlur("burnFee")}
                      error={
                        formikProps.errors.description && formikProps.touched.description
                          ? true
                          : false
                      }
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton onClick={setburnFee} variant="gradient" color="info" fullWidth>
                      Set Burn fee
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>

            <Card>
              <MDBox pt={4} mb={2} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      onChange={handleChange}
                      value={state.minLimit}
                      label="Set Minimum token to stake (Amount)"
                      name="minLimit"
                      onBlur={formikProps.handleBlur("minLimit")}
                      error={
                        formikProps.errors.description && formikProps.touched.description
                          ? true
                          : false
                      }
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton onClick={setMinAmount} variant="gradient" color="info" fullWidth>
                      Set Min limit
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </>
        )}
      </Formik>
      {/* </CoverLayout> */}
    </DashboardLayout>
  );
}

export default Cover;
