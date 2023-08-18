import React, { FC, useMemo, useCallback, useState } from "react";
import classes from "./modalCreateNew.module.scss";
import Modal from "@/coreUI/Modal";

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

const listOptionInput: ListOptionInput[] = [
  {
    id: "input1",
    name: "item1",
    plh: "enter the item1",
    title: "Title1",
  },
  {
    id: "input2",
    name: "item2",
    plh: "enter the item3",
    title: "Title2",
  },
  {
    id: "input3",
    name: "item3",
    plh: "enter the item3",
    title: "Title3",
  },
  {
    id: "input4",
    name: "item4",
    plh: "enter the item4",
    title: "Title4",
  },
];

const ModalCreateNew: FC<Props> = ({ onClose }) => {
  const [data, setData] = useState({
    item1: "",
    item2: "",
    item3: "",
    item4: "",
  });

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

  const handleSubmit = useCallback(() => {
    onClose();
  }, [onClose]);

  const contentModal = useMemo(() => {
    return (
      <div className="p-5 pb-10">
        <div className="grid grid-rows-2 grid-flow-col gap-10">
          {listOptionInput.map((it) => (
            <div key={it.id}>
              {it.title}
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={it.name}
                placeholder={it.plh}
                onChange={handleOnchange}
              />
            </div>
          ))}
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
