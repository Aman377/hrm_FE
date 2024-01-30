import { List } from "antd";
import dayjs from "dayjs";
import { useGetPublicHolidaysQuery } from "../../../redux/rtk/features/publicHoliday/publicHolidayApi";

const PublicHolidayBar = () => {
  const { data: list, isLoading: loading } = useGetPublicHolidaysQuery({query: 'all'});

  return (
    <div>
      <List
        loading={loading}
        itemLayout='horizontal'
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <div
                  style={{ height: "65px", width: "60px" }}
                  className='border-4 border-indigo-500/75 text-center'
                >
                  <p className='text-xl font-medium txt-color-2'>
                    {dayjs(item.date).format("DD")}
                  </p>
                  <p className='text-base font-medium txt-color-secondary '>
                    {dayjs(item.date).format("MMM")}
                  </p>
                </div>
              }
              title={<p className='text-base font-medium ml-4'>{item.name}</p>}
              description={
                <div className='flex items-center'>
                  <p className='text-sm text-gray-500 ml-4'>
                    {dayjs(item.date).format("DD/MM/YYYY")}
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default PublicHolidayBar;
