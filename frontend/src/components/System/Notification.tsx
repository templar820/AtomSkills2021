import ModalBox from "@/components/System/ModalBox";
import React from "react";

const Notification: React.FC<{title: string, show: boolean, close: () => void}> = ({title, show, close}) => {

  return (
    <ModalBox
      title={title}
      show={show}
      closeDialog={() => close()}
    >
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" style={{width: '100%'}} onClick={() => {
          close();
        }}>
          ОК
        </button>
      </div>
    </ModalBox>
  )
};

export default Notification;