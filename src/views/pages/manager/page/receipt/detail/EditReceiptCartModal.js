import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { Box, Modal } from "@mui/material";
import SingleReceiverForm from "../component/SingleReceiverForm";
import { useDispatch, useSelector } from "react-redux";
import { productActions, receiptActions } from "../../../../../../actions";
import DataTableComponent from "../../../component/DataTableComponent";
import { numberUtils } from "../../../../../../utilities";

function EditReceiptCartModal({ receipt, open, handleClose }) {
  console.log({ receipt, open, handleClose });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "24px",
    bgcolor: "#fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const handleChangeQuantity = (productID, quantity) => {
    if (quantity < 1) return;
    const idx = cart.findIndex((item) => item.product._id == productID);
    if (idx < 0) return;
    const temp = [...cart];
    temp[idx].quantity = quantity;
    setCart(temp);
  };
  const handleDeleteItem = (id) => {
    console.log("delete imte click");

    setCart(cart.filter((item) => item.product._id != id));
    console.log(cart.filter((item) => item.product._id != id));
  };

  const handleAddItem = (id) => {
    console.log("Add imte click");
    const temp = [...cart];
    const product = rawData.find((item) => item._id == id);
    console.log({ temp });
    temp.push({ product, quantity: 1 });
    console.log({ temp });
    setCart(temp);
  };
  const [cart, setCart] = useState(receipt.cart);

  const cartItems = cart.map((item, index) => {
    const temp = {};
    temp.id = item.product._id;
    temp.stt = index + 1;
    temp.name = item.product.name;
    temp.sku = item.product.sku;
    temp.quantity = item.quantity;
    temp.price = item.product.price;
    temp.total = item.product.price * item.quantity;
    temp.avtURL = item.product.avtURL;
    return temp;
  });

  const columnDocs = [
    // {field: , headerName: , width: }
    { field: "stt", headerName: "STT", width: 50 },
    {
      field: "name",
      headerName: "T??n s???n ph???m",
      width: 300,
      flex: 1,
      renderCell: (params) => {
        const { avtURL, name, price } = params.row;
        return (
          <div className="product-info-cell display-flex">
            <img src={avtURL} height="50px" alt="" />
            <div
              style={{ marginLeft: "12px", textAlign: "left" }}
              className="price-wrapper"
            >
              <p
                style={{
                  fontFamily: "Montserrat",
                  whiteSpace: "break-spaces",
                  maxWidth: "350px",
                  fontSize: "1.4rem",
                }}
              >
                {name}
              </p>
            </div>
          </div>
        );
      },
    },
    { field: "sku", headerName: "M?? SKU", width: 150 },
    {
      field: "quantity",
      headerName: "S??? l?????ng",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="product-count">
            <div className="display-flex">
              {/* <button
                onClick={() =>
                  handleChangeQuantity(params.row.id, params.row.quantity - 1)
                }
              >
                -
              </button> */}
              <input
                type={"number"}
                value={params.row.quantity}
                onChange={(e) =>
                  handleChangeQuantity(params.row.id, e.target.value)
                }
              />
              {/* <button
                onClick={() =>
                  handleChangeQuantity(params.row.id, params.row.quantity + 1)
                }
              >
                +
              </button> */}
            </div>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "????n gi??",
      width: 150,
      valueFormatter: (params) => params.value.toLocaleString() + " VN??",
    },
    {
      field: "total",
      headerName: "Th??nh ti???n",
      minWidth: 150,
      renderCell: (params) => {
        const { price, quantity } = params.row;
        return (
          <div className=" display-flex">
            <p
              style={{
                fontFamily: "Montserrat",
                color: "red",
                fontWeight: "600",
                fontSize: "1.3rem",
              }}
            >
              {numberUtils.numberWithThousandSeperator(price * quantity || 0) +
                " VN??"}
            </p>
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "T??y ch???n",
      minWidth: 50,
      renderCell: (params) => {
        const { price, quantity } = params.row;
        return (
          <div className=" display-flex">
            <span
              onClick={() => handleDeleteItem(params.row.id)}
              className="icon-button"
            >
              <AiOutlineDelete size={18} />
            </span>
          </div>
        );
      },
    },
  ];

  const columnDocs2 = [
    // {field: , headerName: , width: }
    { field: "stt", headerName: "STT", width: 50 },
    { field: "sku", headerName: "M?? SKU", width: 150 },
    {
      field: "action",
      headerName: "S???n ph???m",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        const { avtURL, name, price } = params.row;
        return (
          <div className="product-info-cell display-flex">
            <img src={avtURL} height="50px" alt="" />
            <div
              style={{ marginLeft: "12px", textAlign: "left" }}
              className="price-wrapper"
            >
              <p
                style={{
                  whiteSpace: "break-spaces",
                  maxWidth: "350px",
                  fontSize: "1.4rem",
                }}
              >
                {name}
              </p>
              <p
                style={{ color: "red", fontWeight: "600", fontSize: "1.3rem" }}
              >
                {numberUtils.numberWithThousandSeperator(price || 0)}
              </p>
            </div>
          </div>
        );
      },
    },
    { field: "quantity", headerName: "S??? l?????ng", width: 150 },
    { field: "producer", headerName: "Nh?? s???n xu???t", width: 150 },
    { field: "experation", headerName: "H???n s??? d???ng", width: 150 },
    { field: "createdAt", headerName: "Ng??y nh???p", width: 150 },
    {
      field: "actions",
      headerName: "T??y ch???n Th??m/X??a",
      minWidth: 50,
      renderCell: (params) => {
        return (
          <div className=" display-flex">
            <span
              onClick={
                cart.some((item) => item.product._id == params.row.id)
                  ? () => handleDeleteItem(params.row.id)
                  : () => handleAddItem(params.row.id)
              }
              className="icon-button"
            >
              {cart.some((item) => item.product._id == params.row.id) ? (
                <AiOutlineDelete size={18} />
              ) : (
                <GrAddCircle size={18} />
              )}
            </span>
          </div>
        );
      },
    },
  ];

  const rawData = useSelector((state) => {
    console.log({ state });
    return state.productReducer.products;
  });
  console.log({ rawData });

  const rowDocs2 = rawData.map((item, index) => {
    item.id = item._id;
    item.stt = index + 1;
    return item;
  });

  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const onSubmit = () => {
    console.log(cart);
    const newReceipt = { ...receipt, cart };
    dispatch(receiptActions.update(newReceipt, handleClose));
  };

  var [filter, setFilter] = useState("");
  var changeFilter = (e) => {
    setFilter(e.target.value);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {step === 1 ? (
          <div className="step-1-modal">
            <div className="display-flex justify-content-between">
              <h1>Chi ti???t ????n h??ng</h1>
              <span
                onClick={() => {
                  setStep(2);
                  //   dispatch(productActions.getAll());
                }}
                className="lw-btn"
              >
                Th??m s???n ph???m
              </span>
            </div>
            <DataTableComponent
              rowHeight={100}
              columnDocs={columnDocs}
              rowDocs={cartItems || []}
              autoHeight={true}
              // filter={filter}
            />

            <div style={{ float: "right" }} className="">
              <button
                onClick={onSubmit}
                className="lw-btn"
                style={{ marginTop: 18, display: "inline-block" }}
              >
                L??u
              </button>
              <button
                className="lw-btn"
                onClick={handleClose}
                style={{
                  display: "inline-block",
                  marginLeft: "12px",
                  backgroundColor: "#a00",
                }}
                type="button"
              >
                H???y
              </button>
            </div>
          </div>
        ) : (
          <div className="step-2-modal">
            <div className="product-list-wrapper manager-container">
              <span onClick={() => setStep(1)} className="lw-btn">
                X??c nh???n ????n h??ng
              </span>
              <div className="list-manager-wapper">
                <div className="data-table-container">
                  <div className="table-header">
                    <div className="heading">
                      <div className="header">Danh s??ch s???n ph???m</div>
                    </div>
                    <div className="filter-container">
                      <p className="filter-label">Nh???p b???t k??? ????? t??m ki???m</p>
                      <input
                        className="filter-input"
                        type="text"
                        onChange={(e) => changeFilter(e)}
                      ></input>
                    </div>
                  </div>
                  <DataTableComponent
                    rowHeight={100}
                    columnDocs={columnDocs2}
                    rowDocs={rowDocs2}
                    filter={filter}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default EditReceiptCartModal;
