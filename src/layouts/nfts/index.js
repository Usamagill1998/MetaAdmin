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

// @mui material components
import React ,{useEffect,useState} from 'react'
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Tabs } from 'antd';


// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";               
import InstagramIcon from "@mui/icons-material/Instagram";

// Beta Magic React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Beta Magic React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import server from '../../apis/server'


// Overview page components
import Header from "layouts/nfts/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Button } from '@mui/material';
const { TabPane } = Tabs;



function Overview() {

  const [nft,setNfts] = useState([])
  const [update,setUpdate] = useState(false)

  useEffect(() => {
    
      getData(0)
    
  }, [update]);

  const getData = async(status)=>{
    const {data} = await server.post(
      "users/getNfts",
     
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
        toast.error(data?.error)
      }
      else
      {

        let nft = data?.data
      const filteredNft =  nft?.filter((x)=>x?.status==status)
        setNfts(filteredNft)
      let userObj = data?.data
      // localStorage.setItem('User', JSON.stringify(userObj));
      // console.log(userObj)
      // navigate("/dashboard")
      // toast.success("Login Successfull")
    // const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    // const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    // console.log(userType)
      }
    }


  }
   
  const onChange = (key) => {

    getData(key)
  };
  
  
  console.log('nft',nft)


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        
      <Tabs defaultActiveKey="0" onChange={onChange}>
    <TabPane tab="Awaiting Approval" key="0">
    <MDBox p={2}>
          <Grid container spacing={6}>
      



         


            {
              nft?.map((x)=>{
                return (
                  <Grid item xs={12} md={6} xl={3}>
                  <DefaultProjectCard
                    image={`http://localhost:8000/api/users/nft_image/${x?.file}`}
                    label={x?.title}
                    // title={x?.title}
                    description={x?.description}
                    
                   
                  />
                 
                 {
                 x?.status== 0 &&(
                  <Button
                  
                  onClick={async()=>{

                    const {data} = await server.post(
                      "users/approveNfts",
                        {
                          "nftId":  x?._id
                      
                      },
                     
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
                        toast.error(data?.error)
                      }
                      else
                      {
              
                        let nft = data?.data
                         console.log('nft',nft)
                        // setNfts(nft)
                        setUpdate(!update)
                      let userObj = data?.data
                      // localStorage.setItem('User', JSON.stringify(userObj));
                      // console.log(userObj)
                      // navigate("/dashboard")
                      // toast.success("Login Successfull")
                    // const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
                    // const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
                    // console.log(userType)
                      }
                    }
                  }}
                  >Approve NFT</Button>
                 )
              }
                </Grid>

                
                )
              })
            }
           
          
          </Grid>
        </MDBox>
    </TabPane>
    
    <TabPane tab="Minted" key="3">
    <MDBox p={2}>
          <Grid container spacing={6}>
      



         


            {
              nft?.map((x)=>{
                return (
                  <Grid item xs={12} md={6} xl={3}>
                  <DefaultProjectCard
                    image={`http://localhost:8000/api/users/nft_image/${x?.file}`}
                    label={x?.title}
                    // title={x?.title}
                    description={x?.description}
                    
                   
                  />
                 
                 {
                 x?.status== 0 &&(
                  <Button
                  
                  onClick={async()=>{

                    const {data} = await server.post(
                      "users/approveNfts",
                        {
                          "nftId":  x?._id
                      
                      },
                     
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
                        toast.error(data?.error)
                      }
                      else
                      {
              
                        let nft = data?.data
                         console.log('nft',nft)
                        // setNfts(nft)
                        setUpdate(!update)
                      let userObj = data?.data
                      // localStorage.setItem('User', JSON.stringify(userObj));
                      // console.log(userObj)
                      // navigate("/dashboard")
                      // toast.success("Login Successfull")
                    // const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
                    // const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
                    // console.log(userType)
                      }
                    }
                  }}
                  >Approve NFT</Button>
                 )
              }
                </Grid>

                
                )
              })
            }
           
          
          </Grid>
        </MDBox>
    </TabPane>
    <TabPane tab="Approved" key="1">
    <MDBox p={2}>
          <Grid container spacing={6}>
      



         


            {
              nft?.map((x)=>{
                return (
                  <Grid item xs={12} md={6} xl={3}>
                  <DefaultProjectCard
                    image={`http://localhost:8000/api/users/nft_image/${x?.file}`}
                    label={x?.title}
                    // title={x?.title}
                    description={x?.description}
                    
                   
                  />
                 
                 {
                 x?.status== 0 &&(
                  <Button
                  
                  onClick={async()=>{

                    const {data} = await server.post(
                      "users/approveNfts",
                        {
                          "nftId":  x?._id
                      
                      },
                     
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
                        toast.error(data?.error)
                      }
                      else
                      {
              
                        let nft = data?.data
                         console.log('nft',nft)
                        // setNfts(nft)
                        setUpdate(!update)
                      let userObj = data?.data
                      // localStorage.setItem('User', JSON.stringify(userObj));
                      // console.log(userObj)
                      // navigate("/dashboard")
                      // toast.success("Login Successfull")
                    // const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
                    // const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
                    // console.log(userType)
                      }
                    }
                  }}
                  >Approve NFT</Button>
                 )
              }
                </Grid>

                
                )
              })
            }
           
          
          </Grid>
        </MDBox>
    </TabPane>



  </Tabs>
        
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
