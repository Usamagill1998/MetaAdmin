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
const NftAbi = require("../../abis/abi.json");
// var provider = process.env.REACT_APP_HTTP_NODE;
// var web3Provider = new Web3.providers.HttpProvider(provider);
// var web3 = new Web3(web3Provider);
var web3 = new Web3();
const contractAddress = process.env.REACT_APP_CONTRACTADDRESS;
const contractAbi = NftAbi.abi;
const nftoptions = [
  {
    label: "Staking",
    value: "Staking",
  },
];
function Cover() {
  const [category, setOptions] = useState([]);

  useEffect(async () => {
    const { data } = await server.get(
      "users/getAllCategories",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data) {
      if (data?.error) {
        // toast.error(data?.error)
      } else {
        let nft = data?.data;
        const data2 = nft?.map(({ _id, name }) => ({ label: name, value: _id }));
        console.log("dataaaaa", data2);
        setOptions(data2);
      }
    }
  }, []);

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
  const [selectedCategorey, setSelectedCategorey] = useState(null);

  const [file, setFile] = useState(null);
  const [state, setState] = useState({
    name: "",
    description: "",
    amount: 1,
    author: "",
    isConfirmed: false,
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
    formdata.append("status", 1);
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
        console.log("response: ", response.data);
        mint(state.amount, response.data.ipfs_url,response.data.data._id);
        // setNftImage(response?.data?.artDetail?.file)
        // setArtworkId(response?.data?.artDetail?._id)
        // setDisabled(false)
      });
  };

  const mint = (amount, url,artId) => {
    wallet.connect();
    console.log(contractAbi);
    console.log(contractAddress);
    web3.setProvider(wallet.ethereum);
    const dv = new web3.eth.Contract(contractAbi, contractAddress);
    dv.methods
      .mint(wallet?.account, 2, amount, url)
      .send({ from: wallet?.account, value: "100000000000000" }, async function (result) {
        console.log(result);
      })
      .on("transactionHash", async function (hash) {
        // toast.success("Transaction submitted. please wait for the network to confirm");
        ///users/InsertMintHash
        await server
          .post(
            "/users/InsertMintHash",
            {
              artId,
              hash,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((result) => {
            // props?.loader == true ? props?.setloader(false) : props?.setloader(true);
            console.log(result);
          });
      })
      .then((r) => {
        // toast.success("Nft minted successfully");
        // props?.loader1 == false ? props?.setloader1(true) : props?.setloader1(false);
        console.log(r);
      })
      .catch((e) => {
        // toast.error(e?.message);
        console.log(e);
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
        initialValues={{ name: "", description: "", amount: 1 }}
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
                <label for="file-input">
                  <div style={{ cursor: "pointer" }} {...getRootProps({ className: "dropzone" })}>
                    <img
                      src={file ? URL.createObjectURL(file) : choose}
                      loading="lazy"
                      width="284"
                      sizes="(max-width: 479px) 74vw, 284px"
                      id="NFTimage"
                      className="image-18"
                    />
                  </div>
                </label>

                <MDBox mb={2}>
                  <MDInput
                    onChange={handleChange}
                    value={state?.name}
                    type="text"
                    label="Title"
                    name="name"
                    onBlur={formikProps.handleBlur("name")}
                    error={formikProps.errors.name && formikProps.touched.name ? true : false}
                    variant="standard"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    onChange={handleChange}
                    label="Description"
                    name="description"
                    value={state?.description}
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

                <label>Category: </label>

                <Select
                  options={category}
                  defaultValue={selectedCategorey}
                  onChange={(val)=> setSelectedCategorey(val)}
                />

                <label> NFT Category: </label>

                <Select
                  options={nftoptions}
                  defaultValue={selectedOption}
                  onChange={(val)=> setSelectedOption(val)}
                />

                <MDBox mt={4} mb={1}>
                  <MDButton
                  
                    onClick={() => {
                      handleMint();
                    }}
                    variant="gradient"
                    color="info"
                    fullWidth
                    disabled ={!selectedOption && !selectedCategorey && !file && !state?.name}
                  >
                    Mint
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
