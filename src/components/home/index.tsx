import React, { FC, useState, Suspense, useCallback, useEffect } from "react";
import cx from "classnames";
import classes from "./home.module.scss";
import TableHome from "./tableHome";
import { useProductCtx } from "@/hooks/useProduct";

const CreateNewModal = React.lazy(() => import("../modals/ModalCreateNew.tsx"));

const HomePage: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const productCtx = useProductCtx()

  useEffect(() => {
    // call api be => data

    productCtx?.getListProduct()

    // view.viewitems(data)
    // delete

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className={cx("Container", classes.Wrapper)}>
      <div className={classes.projectName}>Project Name</div>
      <div className={classes.tableWrapper}>
        <div className={classes.headerTable}>
          <div className={classes.tableName}>Table Name</div>
          <div className={classes.createNew} onClick={() => setShowModal(true)}>
            Create New Item
          </div>
        </div>
        <TableHome data={productCtx}/>
      </div>
      {showModal && (
        <Suspense fallback={null}>
          <CreateNewModal
            isOpen={showModal}
            onClose={handleClose}
          />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
