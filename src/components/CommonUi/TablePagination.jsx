import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
// import ReactSearchBox from "react-search-box";

const TablePagination = ({
  columns,
  list,
  total,
  searchBy,
  setPageConfig,
  loading,
  csvFileName,
  children,
  permission,
  pageConfig
}) => {
  const fetchData = (page, count) => {
    if (setPageConfig) {
      setPageConfig((prev) => {
        return { ...prev, page, count, search: searchText };
      });
    }
  };

  const handleSearch = (e) => {
    const updatedSearchText = e.target.value;
    setSearchText(updatedSearchText);
  };

  const [columnsToShow, setColumnsToShow] = useState(columns.filter(column => column.title !== "ID"));

  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setColumnsToShow(columns);
  }, []);
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData(pageConfig.page, pageConfig.count, searchText);
    }, 200);

    return () => clearTimeout(delay);
  }, [searchText, pageConfig]);
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const filteredList = list?.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'object' && value
        ? Object.values(value).some(
          (nestedValue) =>
            typeof nestedValue === 'string' &&
            nestedValue.toLowerCase().includes(searchText.toLowerCase())
        )
        : typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>

      <UserPrivateComponent permission={permission}>
        <div className='mt-2'>
          <div className='pb-3'>
            <div className='w-full dark:text-yellow-50 flex flex-col md:flex-row gap-2 items-center justify-between'>
              <div className='flex gap-2'>
                {
                  Array.isArray(list) && list.length > 0 &&
                  <div className='px-4 py-1 bg-black/80 text-white border rounded-md'>
                    <CSVLink
                      data={list ? list : ""}
                      className='text-white text-xs  md:text-base  py-1 px-0 rounded mr-2 '
                      filename={csvFileName}
                      disabled={!total}
                    >
                      Download CSV
                    </CSVLink>
                  </div>

                }
                <ColVisibilityDropdown
                  options={columns}
                  columns={columns}
                  columnsToShowHandler={columnsToShowHandler}
                />
              </div>

              <div className=''>
                {total >= 1 && (
                  <Pagination
                    total={total}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                    onChange={fetchData}
                    defaultPageSize={10}
                    defaultCurrent={1}
                    showSizeChanger={total > 10}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="m-4 w-[50%]">

          </div>

          <div className="m-2">
            <input
              type="text"
              placeholder={`${searchBy}`}
              value={searchText}
              onChange={handleSearch}
              className="form-control border border-stone-600 rounded w-[50%] py-2 px-4"
            />
          </div>

          <Table
            loading={loading}
            columns={columnsToShow}
            dataSource={filteredList?.map((item) => ({ ...item, key: item?.id }))}
            pagination={false}
            scroll={{ x: 1000, y: window.innerHeight - 0 }}
          />
        </div>
        {children && children}
      </UserPrivateComponent>
    </>
  );
};
export default TablePagination;
