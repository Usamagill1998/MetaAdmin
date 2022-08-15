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
import { Formik } from "formik";
import * as yup from "yup";
import server from "../../apis/server";
// import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useWallet } from "use-wallet";
import Web3 from "web3";
const poolAbi = require("../../abis/pool.json");
// var provider = process.env.REACT_APP_HTTP_NODE;
// var web3Provider = new Web3.providers.HttpProvider(provider);
// var web3 = new Web3(web3Provider);
var web3 = new Web3();
const poolAddress = process.env.REACT_APP_POOLADDRESS;
const contractAbi = poolAbi.abi;

function Cover() {
  const [state, setState] = useState({
    rewardPrcnt: "",
  });

  useEffect(async () => {}, []);

  const wallet = useWallet();

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };
  const setRewardPrcnt = () => {
    wallet.connect();
    web3.setProvider(wallet.ethereum);
    const pool = new web3.eth.Contract(contractAbi, poolAddress);
    pool.methods
      .setRewardPercent(state.rewardPrcnt)
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
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      onChange={handleChange}
                      value={state.rewardPrcnt}
                      label="Set reward (percent)"
                      name="rewardPrcnt"
                      onBlur={formikProps.handleBlur("rewardPrcnt")}
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
                    <MDButton onClick={setRewardPrcnt} variant="gradient" color="info" fullWidth>
                      Set reward locked
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
