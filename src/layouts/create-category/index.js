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
import React, { useState } from "react";
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
const NftAbi = require("../../abis/abi.json");
// var provider = process.env.REACT_APP_HTTP_NODE;
// var web3Provider = new Web3.providers.HttpProvider(provider);
// var web3 = new Web3(web3Provider);
var web3 = new Web3();
const contractAddress = process.env.REACT_APP_CONTRACTADDRESS;
const contractAbi = NftAbi.abi;
const options = [
  { value: "staking", label: "Staking" },
  { value: "renting", label: "Renting" },
];

function Cover() {
  let validationSchema = yup.object({
    username: yup.string().required("This field is required."),
    email: yup.string().email("Invalid email").required("This field is required."),
    password: yup.string().required("This field is required."),
  });
  const handleSignup = async (values, resetForm) => {
    console.log(values);
    try {
    } catch (error) {
      // toast.error(error);
    }
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const [file, setFile] = useState(null);
  const [state, setState] = useState({
    name: "",
  
  });
  const wallet = useWallet();
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleMint = async () => {
    const User1 = JSON.parse(localStorage.getItem("User"));
    console.log(User1?._id);
    const userID = User1?._id;
    if (!userID) return;
    let formdata = new FormData();
    formdata.append("userId", userID);
    formdata.append("file", file);
    formdata.append("title", state?.name);
    formdata.append("description", state?.description);
    // formdata.append("price", state?.price);
    formdata.append("amount_for_sale", state?.amount);
    formdata.append("status", 0);
    formdata.append("nft_type", selectedOption?.value);
    server
      .post("users/getIpfs", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFile("");
        setState({
          name: "",
          description: "",
          amount: 0,
          author: "",
          isConfirmed: false,
        });
        // toast.success("Artwork submitted successfully.");
        console.log("response: ", response.data.ipfs_url);
        mint(state.amount, response.data.ipfs_url);
        // setNftImage(response?.data?.artDetail?.file)
        // setArtworkId(response?.data?.artDetail?._id)
        // setDisabled(false)
      });
  };

 
  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <CoverLayout image={bgImage}> */}
      <MDBox mb={2} />

      <Formik
        initialValues={{ name: "" }}
        enableReinitialize
        // validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSignup(values, resetForm);
        }}
      >
        {(formikProps) => (
          <Card>
            {/* <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create NFT
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Special Nft
          </MDTypography>
        </MDBox> */}
            <MDBox pt={4} mb={2} pb={3} px={3}>
              <MDBox component="form" role="form">
              
              <MDBox mb={2}>
                  <MDInput
                    onChange={handleChange}
                    label="name"
                    name="name"
                    value={state?.name}
                    onBlur={formikProps.handleBlur("name")}
                    error={
                      formikProps.errors.name && formikProps.touched.name
                        ? true
                        : false
                    }
                    variant="standard"
                    fullWidth
                  />
                </MDBox>
              
                <MDBox mt={4} mb={1}>
                  <MDButton
                    onClick={() => {
                      handleMint();
                    }}
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    Create
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        )}
      </Formik>
      {/* </CoverLayout> */}
    </DashboardLayout>
  );
                  }

export default Cover;
