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
import Checkbox from "@mui/material/Checkbox";

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
import server from '../../../apis/server'
import { toast } from 'react-toastify';



function Cover() {

  const navigate = useNavigate();
  let validationSchema = yup.object({ 
    username: yup.string().required('This field is required.'),
    email: yup.string().email('Invalid email').required('This field is required.'),
    password: yup.string().required('This field is required.'),
   });
   const handleSignup=async(values,resetForm)=>{
     console.log(values)
    try{
    const {data}=await server.post(
      "users/createAccount",
      {
        "name":values?.username,
        "email":values?.email,
        "password":values?.password,
        "role":"admin"
    }
      ,
      { 
          headers: {
            "Content-Type": "application/json",
       },
        } 
  )
  if(data)
  {
    console.log(data)
    if(data?.success)
    {
      console.log('cc')
      navigate(`/authentication/sign-in`);
      // toast.success("Signup Successfull")
    }
    else
    {
      toast.error(data?.error)
    }
  }
  }
  catch(error)
  {
    toast.error(error)
  }
  }
  

  return (
    <CoverLayout image={bgImage}>


<Formik
        
        initialValues={{  email: "",password:"",username:"" }}
        enableReinitialize
        // validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSignup(values, resetForm);
        }} 
        > 
     {(formikProps) => (
      <Card>
        <MDBox
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
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name"
              
              value={formikProps.values.username}
                onChange={formikProps.handleChange("username")}
                onBlur={formikProps.handleBlur("usename")}
                error={
                  formikProps.errors.username && formikProps.touched.username
                    ? true
                    : false
                }
              
              variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email"
              value={formikProps.values.email}
              onChange={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
              error={
                formikProps.errors.email && formikProps.touched.email
                  ? true
                  : false
              }
              
              variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password"
              value={formikProps.values.password}
              onChange={formikProps.handleChange("password")}
              onBlur={formikProps.handleBlur("password")}
              error={
                formikProps.errors.password && formikProps.touched.password
                  ? true
                  : false
              }
              variant="standard" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton 
              
              onClick={formikProps?.handleSubmit}
              variant="gradient" color="info" fullWidth>
                sign i
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
       )}
       </Formik>
    </CoverLayout>
  );
}

export default Cover;
