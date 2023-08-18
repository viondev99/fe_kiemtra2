import React, { FC, Suspense, useCallback, useState } from "react";
import classes from "./tableHome.module.scss";
import cx from "classnames";
import { DataTableHome, ListColTableHome } from "@/models/home";
import Image from "next/image";
import iconEye from "../../../assets/icons/view.svg";
import iconEdit from "../../../assets/icons/edit.svg";
import iconDelete from "../../../assets/icons/delete.svg";

const DeleteModal = React.lazy(() => import("../../modals/ModalDelete.tsx"));
const ViewModal = React.lazy(() => import("../../modals/ModalView"));
const EditModal = React.lazy(() => import("../../modals/ModalEdit"));

const rowLabel: ListColTableHome[] = [
  {
    id: "index",
    name: "No.",
  },
  {
    id: "channel_name",
    name: "Channel Name",
  },
  {
    id: "description",
    name: "Description",
  },
  {
    id: "sub",
    name: "Subscriber Count",
  },
  {
    id: "url",
    name: "URL",
  },
  {
    id: "action",
    name: "Action",
  },
];

interface Props {
  data?: any;
}

const TableHome: FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState({
    open: false,
    id: "",
    modal: "",
  });

  const handleClose = useCallback(() => {
    setShowModal({ ...showModal, open: false });
  }, [showModal]);

  const handleOpenModal = useCallback(
    (item: string, modal: string) => {
      setShowModal({ ...showModal, open: true, id: item, modal: modal });
    },
    [showModal]
  );

  const listProduct = data?.listProduct?.data;

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    {rowLabel.map((it) => (
                      <th
                        key={it.id}
                        scope="col"
                        className={`px-6 py-4 ${
                          it.id === "action" && classes.action
                        }`}
                      >
                        {it.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listProduct?.map((it: any, index: number) => (
                    <tr
                      key={it.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td
                        className={`whitespace-nowrap px-6 py-4 font-medium ${classes.rowIndex}`}
                      >
                        {index + 1}
                      </td>
                      <td className={`whitespace-nowrap px-6 py-4 ${classes.rowName}`}>
                        {it.ChannelName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {it.Description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {it.SubscriberCount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{it.URL}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex justify-center items-center">
                          <button
                            className="mr-5"
                            onClick={() => handleOpenModal(it.id, "view")}
                          >
                            <Image src={iconEye} alt="view" />
                          </button>
                          <button
                            className="mr-5"
                            onClick={() => handleOpenModal(it.id, "edit")}
                          >
                            <Image src={iconEdit} alt="edit" />
                          </button>
                          <button
                            onClick={() => handleOpenModal(it.id, "delete")}
                          >
                            <Image src={iconDelete} alt="delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal.modal === "delete" && showModal.open && (
        <Suspense fallback={null}>
          <DeleteModal
            isOpen={showModal.open}
            onClose={handleClose}
            id={showModal.id}
          />
        </Suspense>
      )}
      {showModal.modal === "view" && showModal.open && (
        <Suspense fallback={null}>
          <ViewModal
            isOpen={showModal.open}
            onClose={handleClose}
            id={showModal.id}
          />
        </Suspense>
      )}
      {showModal.modal === "edit" && showModal.open && (
        <Suspense fallback={null}>
          <EditModal
            isOpen={showModal.open}
            onClose={handleClose}
            id={showModal.id}
          />
        </Suspense>
      )}
    </>
  );
};

export default TableHome;
