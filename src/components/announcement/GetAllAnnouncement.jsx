import { Card, List } from "antd";
import {
  announcementApi,
  useGetAnnouncementsQuery,
} from "../../redux/rtk/features/announcement/announcementApi";
import CardCustom from "../CommonUi/CardCustom";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddAnnouncement from "./AddAnnouncement";

const TitleComponent = ({ item }) => {
  return (
    <div className='flex justify-between'>
      <h2 className='text-xl txt-color-2'>{item.title}</h2>
      <div className='flex justify-end'>
        <CommonDelete
          permission={"delete-announcement"}
          deleteThunk={announcementApi.endpoints.deleteAnnouncement.initiate}
          id={item.id}
          spin={true}
        />
      </div>
    </div>
  );
};

const GetAllAnnouncement = () => {
  const { isLoading, data: list } = useGetAnnouncementsQuery();

  return (
    <CardCustom
      title={"Announcements"}
      extra={
        <>
          <CreateDrawer
            permission={"create-announcement"}
            title={"Create Announcements"}
            width={30}
          >
            <AddAnnouncement />
          </CreateDrawer>
        </>
      }
    >
      <div className='border-t mb-2'>
        <UserPrivateComponent permission={"readAll-announcement"}>
          <List
            className='m-4'
            loading={isLoading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={list ? list : []}
            renderItem={(item) => (
              <List.Item className='new-card'>
                <Card title={<TitleComponent item={item} />}>
                  {item.description}
                </Card>
              </List.Item>
            )}
          />
        </UserPrivateComponent>
      </div>
    </CardCustom>
  );
};
export default GetAllAnnouncement;
