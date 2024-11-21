import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { deleteProduct } from "../redux/productsReducer";
import AddProductForm from "./AddProductForm";
import Button from "./Button";
import EditProductForm from "./EditProductForm";
import Tooltip from "./Tooltip";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSanPham, setIdSanPham] = useState();

  // Định nghĩa các cột
  const columns = [
    {
      label: "Tên",
      field: "name",
      render: (val, row) => (
        <div style={{ fontWeight: val === "Tổng số" ? "bold" : undefined }}>
          {val}
        </div>
      ),
    },
    {
      label: "Giá",
      field: "price",
      render: (val, row) => (
        <div style={{ fontWeight: row.name === "Tổng số" ? "bold" : undefined }}>
          {val}
        </div>
      ),
    },
    {
      label: "Thao tác",
      width: 130,
      render: (val, row) => {
        // Kiểm tra nếu là dòng "Tổng số" thì không hiển thị nút
        if (row.name === "Tổng số") {
          return null;
        }
        return (
          <>
            <Button
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setIdSanPham(row.id);
              }}
              size="small"
              className="primary"
            >
              Chỉnh sửa
            </Button>

            <Tooltip
              content={"Sau khi xóa, dữ liệu sẽ không thể khôi phục lại được"}
              position="left"
            >
              <Button
                onClick={() => dispatch(deleteProduct(row.id))}
                style={{ marginLeft: 8 }}
                size="small"
                className="danger"
              >
                Xóa
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  // Tính tổng giá trị sản phẩm
  const sumTable = useMemo(() => {
    return products.reduce((pre, cur) => pre + cur.price, 0);
  }, [products]);

  return (
    <div>
      {/* Modal để thêm/sửa sản phẩm */}
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditProductForm
            idSanPham={idSanPham}
            setVisibleForm={setVisibleForm}
          />
        ) : (
          <AddProductForm setVisibleForm={setVisibleForm} />
        )}
      </Modal>

      <h1>Bảng Thông Tin</h1>

      {/* Nút Thêm Hàng Hóa */}
      <Button
        style={{ marginBottom: 8 }}
        size="medium"
        onClick={() => {
          setVisibleForm(true);
          setIsEdit(false);
        }}
      >
        Thêm Hàng Hóa
      </Button>

      {/* Hiển thị bảng */}
      <Table
        columns={columns}
        data={[...products, { name: "Tổng số", price: sumTable }]}
      ></Table>
    </div>
  );
};

export default ProductList;