import { List } from "antd";
import { useGetAnnouncementsQuery } from "../../../redux/rtk/features/announcement/announcementApi";
import AnnounceIconSVG from "../../Icons/announceIconSVG";

const AnnouncementBar = () => {
  const { data: list, isLoading: loading } = useGetAnnouncementsQuery();

  return (
    <div>
      <List
        loading={loading}
        itemLayout='horizontal'
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<AnnounceIconSVG />}
              title={<p className='text-base font-medium ml-4'>{item.title}</p>}
              description={
                <div className='flex items-center'>
                  <p className='text-sm text-gray-500 ml-4'>
                    {item.description}
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
export default AnnouncementBar;
