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
import { Link ,useNavigate} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import  {useCallback} from 'react'

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
import server from '../../apis/server'
import { toast } from 'react-toastify';
import {useDropzone} from 'react-dropzone'
import Select from 'react-select'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]



function Cover() {

  const onDrop = useCallback(acceptedFiles => {
    // setFile(acceptedFiles[0])
  }, [])
 
  const navigate = useNavigate();
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop,multiple:false});
  
  let validationSchema = yup.object({ 
    username: yup.string().required('This field is required.'),
    email: yup.string().email('Invalid email').required('This field is required.'),
    password: yup.string().required('This field is required.'),
   });
   const handleSignup=async(values,resetForm)=>{
     console.log(values)
    try{
     }
  catch(error)
  {
    toast.error(error)
  }
  }
  

  return (


    <DashboardLayout>
    <DashboardNavbar />
    {/* <CoverLayout image={bgImage}> */}
    <MDBox mb={2} />

<Formik
        
        initialValues={{  name: "",
        description: "",
        amount: 1, }}
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
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">

          <label for="file-input">
            
            <div style={{cursor:"pointer"}} {...getRootProps({className: 'dropzone'})}>
              <img
                src={choose}
                loading="lazy"
                width="284"
                sizes="(max-width: 479px) 74vw, 284px"
                id="NFTimage"
                className="image-18"
              />
                            </div>
                            
             
                              
            </label>
          
            <MDBox mb={2}>
              <MDInput type="text" label="Title"
              
              value={formikProps.values.name}
                onChange={formikProps.handleChange("name")}
                onBlur={formikProps.handleBlur("name")}
                error={
                  formikProps.errors.name && formikProps.touched.name
                    ? true
                    : false
                }
              
              variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput  label="Description"
              value={formikProps.values.description}
              onChange={formikProps.handleChange("description")}
              onBlur={formikProps.handleBlur("description")}
              error={
                formikProps.errors.description && formikProps.touched.description
                  ? true
                  : false
              }
              
              variant="standard" fullWidth />
            </MDBox>
            <Select options={options} />
            <MDBox mb={2}>
              
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="number" label="Amount for sale"
              value={formikProps.values.amount}
              onChange={formikProps.handleChange("amount")}
              onBlur={formikProps.handleBlur("amount")}
              error={
                formikProps.errors.amount && formikProps.touched.amount
                  ? true
                  : false
              }
              variant="standard" fullWidth />
            </MDBox>
            
            <MDBox mt={4} mb={1}>
              <MDButton 
              
              onClick={formikProps?.handleSubmit}
              variant="gradient" color="info" fullWidth>
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
