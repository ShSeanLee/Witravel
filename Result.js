import axios from "axios";
import React, { useState } from "react";
import TopBar from '../components/common/TopBar';

const Result = ({ bankName, fintechUseNo, tofintechno }) => {

    const [amount, setamount] = useState("");
    const accessToken = localStorage.getItem("accessToken");

    const genTransId = () => {
        let countnum = Math.floor(Math.random() * 1000000000) + 1;
        let transId = "M202201241U" + countnum; 
        return transId;
    };

    const data = {
        // 출금 이체 정보 담아오기
        bank_tran_id: genTransId(),
        cntr_account_type: "N",
        cntr_account_num: "01051025459",
        dps_print_content: "쇼핑몰환불",
        fintech_use_num: fintechUseNo,
        wd_print_content: "오픈뱅킹출금",
        tran_amt: amount,
        tran_dtime: "20220712145100",
        req_client_name: "김현정",
        req_client_fintech_use_num: "120220124188941109184382",
        req_client_num: "KIM",
        transfer_purpose: "ST",
        recv_client_name: "김현정",
        recv_client_bank_code: "097",
        recv_client_account_num: "01051025459",
    };
    const option = {
    method: "POST",
    url: "/v2.0/transfer/withdraw/fin_num",
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    data: data,
    };
    axios(option).then(({ data }) => {
        console.log(data);
        if (data.rsp_code === "A0002") {
            alert("출금 하시겠습니까?");
        };
    });
    
    return(
        <div>
        <TopBar title={"출금 중"}/>
        
        </div>
    );
};

export default result;