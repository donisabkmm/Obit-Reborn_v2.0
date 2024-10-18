// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import axios from "axios";
import {API_BASE_URL} from "@/configs/config.jsx";

const getAllData_admin = async ()=>{
    await axios({
        method: "get",
        url: API_BASE_URL+"/api/admin",

    })
}

const getAllData_user = async ()=>{

}

export default {getAllData_admin,getAllData_user}
