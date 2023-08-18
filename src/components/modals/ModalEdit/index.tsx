import React, { FC, useMemo, useCallback, useState, useEffect } from "react";
import classes from "./modalView.module.scss";
import Modal from "@/coreUI/Modal";
import { useProductCtx } from "@/hooks/useProduct";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  id?: string;
}

const ModalEdit: FC<Props> = ({ onClose, id }) => {
  const [state, _setState] = useState({
    ChannelName: "",
    Description: "",
    SubscriberCount: "",
    URL: "",
  });

  const setState = (data: any) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const productCtx = useProductCtx();

  useEffect(() => {
    productCtx?.getProductById(id);
  }, [id]);

  useEffect(() => {
    _setState(productCtx.selectedItem?.data);
  });

  const handleOnChange = (name: string) => (e: any) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const handleSubmit = useCallback(async () => {
    const payload = {
      ChannelName: state?.ChannelName,
      Description: state?.Description,
      SubscriberCount: state?.SubscriberCount,
      URL: state?.URL,
    };
    await productCtx?.updateProduct(id, payload);
    productCtx?.getListProduct();
    toast("Updated");
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
              name={"channel"}
              placeholder={"enter the item1"}
              value={state?.ChannelName}
              onChange={handleOnChange("channel")}
            />
          </div>
          <div>
            Description
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"description"}
              placeholder={"enter the item1"}
              value={state?.Description}
              onChange={handleOnChange("description")}
            />
          </div>
          <div>
            SubscriberCount
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"sub"}
              placeholder={"enter the item1"}
              value={state?.SubscriberCount}
              onChange={handleOnChange("sub")}
            />
          </div>
          <div>
            URL
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"url"}
              placeholder={"enter the item1"}
              value={state?.URL}
              onChange={handleOnChange("url")}
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
        title="Create New Item"
        onSubmit={handleSubmit}
        contentBottom={
          <button className={classes.submit} onClick={handleSubmit}>
            OK
          </button>
        }
      />
    </>
  );
};

export default ModalEdit;
