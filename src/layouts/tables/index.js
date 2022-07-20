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
import React,{useState,useEffect} from 'react'
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import web3 from 'web3'


// Beta Magic React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Beta Magic React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Space, Table, Tag } from 'antd';
import server from '../../apis/server'

import 'antd/dist/antd.css';
// import './index.css';


function Tables() {
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();





  const [user,setUser] = useState([])
  const [update,setUpdate] = useState(false)

  useEffect(async() => {
    
      const {data} = await server.get(
        "users/getAllUser",
       
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

          let nft = data?.data
           console.log('nft',nft)
          setUser(nft)
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

    
  }, []);
   


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
 
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>

              <Table columns={columns} dataSource={user} />
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
         
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
