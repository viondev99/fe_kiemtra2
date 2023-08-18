import React, { FC, useMemo, useCallback, useState } from "react";
import classes from "./modalCreateNew.module.scss";
import Modal from "@/coreUI/Modal";
import { useProductCtx } from "@/hooks/useProduct";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
}

type ListOptionInput = {
  id: string;
  name: string;
  plh: string;
  title: string;
};

const ModalCreateNew: FC<Props> = ({ onClose }) => {
  const [data, setData] = useState({
    ChannelName: "",
    Description: "",
    SubscriberCount: "",
    URL: "",
  });

  const productCtx = useProductCtx();

  const handleOnchange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const payload = {
      ChannelName: data?.ChannelName,
      Description: data?.Description,
      SubscriberCount: Number(data?.SubscriberCount),
      URL: data?.URL,
    };
    await productCtx?.createProduct(payload);
    productCtx?.getListProduct();
    onClose();
    toast("Created");
  }, [data, onClose, productCtx]);

  const contentModal = useMemo(() => {
    return (
      <div className="p-5 pb-10">
        <div className="grid grid-rows-2 grid-flow-col gap-10">
          <div>
            ChannelName
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"ChannelName"}
              placeholder={"enter channel name"}
              onChange={handleOnchange}
            />
          </div>
          <div>
            Description
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"Description"}
              placeholder={"enter description"}
              onChange={handleOnchange}
            />
          </div>
          <div>
            SubscriberCount
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"SubscriberCount"}
              placeholder={"enter sub number"}
              onChange={handleOnchange}
            />
          </div>
          <div>
            URL
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"URL"}
              placeholder={"enter url"}
              onChange={handleOnchange}
            />
          </div>
        </div>
      </div>
    );
  }, [handleOnchange]);

  return (
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
  );
};

export default ModalCreateNew;
