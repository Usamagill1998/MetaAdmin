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

import { useState } from "react";

// react-router-dom components
import { Link,useNavigate} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Beta Magic React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Formik } from "formik"; 
import * as yup from "yup";
import server from '../../../apis/server'
// import { toast } from 'react-toastify';


function Basic() {
  const navigate = useNavigate();
  let validationSchema = yup.object({ 
    username: yup.string().required('This field is required.'),
    email: yup.string().email('Invalid email').required('This field is required.'),
    password: yup.string().required('This field is required.'),
   });
   const handleLogin=async(values,resetForm)=>{
    const {data} = await server.post(
      "users/login",
      {
   
        "email":values?.email,
        "password":values?.password
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
      if(data?.error)
      {
        // toast.error(data?.error)
      }
      else
      {
      let userObj = data?.data
      localStorage.setItem('User', JSON.stringify(userObj));
      console.log(userObj)
      navigate("/dashboard")
      // toast.success("Login Successfull")
    // const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    // const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    // console.log(userType)
      }
    }
  }


  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
   <Formik
        
        initialValues={{  email: "",password:""}}
        enableReinitialize
        // validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values, resetForm);
        }} 
        > 
     {(formikProps) => (
      <Card>
     
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
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
              fullWidth />
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
              fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" 
                            onClick={formikProps?.handleSubmit}

              
              fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
       )}
       </Formik>
    </BasicLayout>
  );
}

export default Basic;
