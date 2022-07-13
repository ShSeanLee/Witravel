import axios from "axios";
import React from "react";
import styled from "styled-components";

const Account = styled.div`
  position: relative;
  display: flex;
  padding-top: 30px;
`;
const Name = styled.div`
  position: relative;
  padding: 4px 50px;
  font-size: 12px;
  font-weight: 700;
  font-family: "paybooc-Light", sans-serif;
`;
const Bank = styled.div`
  position: relative;
  padding: 4px 50px;
  font-size: 12px;
  font-weight: 700;
  font-family: "paybooc-Light", sans-serif;
`;
const Num = styled.div`
  position: relative;
  padding: 4px 50px;
  font-size: 12px;
  font-weight: 700;
  font-family: "paybooc-Light", sans-serif;
`;

const Withdrawbutton = styled.div`
  position: relative;
  padding: 4px 50px;
  color: #f80d38;
  border: none;
  font-size: 15px;
  display: inline-block;
  font-family: "paybooc-Light", sans-serif;
  text-decoration: none;
  font-weight: 900;
  transition: 0.25s;
`;
const AccountBtn = styled.div`
  position: relative;
  background-color: #100db1;
  color: #ffffff;
  font-size: 12px;
  border: none;
  display: inline-block;
  padding: 5px 30px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
`;

const Example = () => {
  const genTransId = () => {
    let countnum = Math.floor(Math.random() * 1000000000) + 1;
    let transId = process.env.REACT_APP_TRANCE_ID + countnum; //이용기관번호
    console.log(transId);
    return transId;
  };

  const onClickHandle = () => {
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
    <Account>
      <Name>김여행</Name>
      <Bank>국민은행</Bank>
      <Num>120220124488941109411084</Num>
      <Withdrawbutton onClick={onClickHandle}>송금하기</Withdrawbutton>
      <AccountBtn>대표계좌</AccountBtn>
    </Account>
  );
};

export default Example;
