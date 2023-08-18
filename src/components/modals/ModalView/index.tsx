import React, { FC, useMemo, useCallback, useState, useEffect } from "react";
import classes from "./modalView.module.scss";
import Modal from "@/coreUI/Modal";
import { useProductCtx } from "@/hooks/useProduct";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  id?: string;
}

const ModalView: FC<Props> = ({ onClose, id }) => {
  const [state, _setState] = useState({
    ChannelName: "",
    Description: "",
    SubscriberCount: "",
    URL: "",
  });

  // const setState = (data: any) => {
  //   _setState({
  //     ...state,
  //     ...data,
  //   });
  // };

  const productCtx = useProductCtx();

  useEffect(() => {
    productCtx?.getProductById(id);
  }, [id]);

  useEffect(() => {
    _setState(productCtx.selectedItem?.data);
  });

  // const handleOnChange = (name: string) => (e: any) => {
  //   setState({
  //     ...state,
  //     [name]: e.target.value,
  //   });
  // };

  const handleSubmit = useCallback(() => {
    onClose();
  }, [onClose]);

  const contentModal = useMemo(() => {
    return (
      <div className="p-5 pb-10">
        <div className="grid grid-rows-2 grid-flow-col gap-10">
          <div>
            Channel Name
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"address"}
              placeholder={"enter the item1"}
              value={state?.ChannelName}
              // onChange={handleOnChange("address")}
              disabled={true}
            />
          </div>
          <div>
            Description
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"name"}
              placeholder={"enter the item1"}
              value={state?.Description}
              // onChange={handleOnChange("name")}
              disabled={true}
            />
          </div>
          <div>
            Subscriber Count
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"salary"}
              placeholder={"enter the item1"}
              value={state?.SubscriberCount}
              // onChange={handleOnChange("salary")}
              disabled={true}
            />
          </div>
          <div>
            URL
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"salary"}
              placeholder={"enter the item1"}
              value={state?.URL}
              // onChange={handleOnChange("salary")}
              disabled={true}
            />
          </div>
        </div>
      </div>
    );
  }, [state]);

  return (
    <>
      <Modal
        onClose={onClose}
        content={contentModal}
        title={`View Detail of ${state?.ChannelName}`}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ModalView;
