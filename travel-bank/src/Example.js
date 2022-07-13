import axios from "axios";
import React, { useState } from "react";

const Example = () => {
  const genTransId = () => {
    let countnum = Math.floor(Math.random() * 1000000000) + 1;
    let transId = process.env.REACT_APP_TRANCE_ID + countnum; //이용기과번호 본인것 입력
    console.log(transId);
    return transId;
  };

  const onClickHandle = () => {
    //출금 이체 발생시키기
    //data params json
    const accessToken = localStorage.getItem("accessToken");

    const data = {
      bank_tran_id: genTransId(),
      cntr_account_type: "N",
      cntr_account_num: "100000000001",
      dps_print_content: "졸업여행",
      fintech_use_num: "120220124488941109411084",
      wd_print_content: "졸업여행",
      tran_amt: "250000",
      tran_dtime: "20220712145100",
      req_client_name: "김여행",
      req_client_fintech_use_num: "120220124488941109411084",
      req_client_num: "HONGGILDONG1234",
      transfer_purpose: "ST",
      recv_client_name: "김여행",
      recv_client_bank_code: "097",
      recv_client_account_num: "100000000001",
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
      if (data.rsp_code === "A0000") {
        deposit();
      }
    });
  };
  const deposit = () => {
    const sendData = {
      cntr_account_type: "N",
      cntr_account_num: "200000000001",
      wd_pass_phrase: "NONE",
      wd_print_content: "졸업여행",
      name_check_option: "off",
      tran_dtime: "20220712101921",
      req_cnt: "1",
      req_list: [
        {
          tran_no: "1",
          bank_tran_id: genTransId(),
          fintech_use_num: "120220124488941109411084",
          print_content: "졸업여행",
          tran_amt: "250000",
          req_client_name: "김여행",
          req_client_fintech_use_num: "120220124488941109411084",
          req_client_num: "HONGGILDONG1234",
          transfer_purpose: "TR",
        },
      ],
    };
    const option = {
      method: "POST",
      url: "/v2.0/transfer/deposit/fin_num",
      headers: {
        Authorization: `bearer` + process.env.REACT_APP_TOKEN,
      },
      data: sendData,
    };

    axios(option).then(({ data }) => {
      console.log(data);
      if (data.rsp_code === "A0000") {
        alert("입금이 완료되었습니다");
      }
    });
  };

  return (
    <div>
      <div>
        <button onClick={onClickHandle}>송금하기</button>
      </div>
    </div>
  );
};

export default Example;
