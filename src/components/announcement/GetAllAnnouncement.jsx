import { Card, List, Input, Button, Drawer } from "antd";
import React, { useState } from 'react';
import {
  announcementApi,
  useGetAnnouncementsQuery,
} from "../../redux/rtk/features/announcement/announcementApi";
import CardCustom from "../CommonUi/CardCustom";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddAnnouncement from "./AddAnnouncement";
import BtnEditSvg from "../UI/Button/btnEditSvg";


const TitleComponent = ({ item }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (

    <div className='flex justify-between'>
      <h2 className='text-xl txt-color-2'>{item.title}</h2>
      <div className='flex justify-end'>
        <div>
          {/* <div onClick={showDrawer}>
            <BtnEditSvg size={36} />
          </div> */}
          <Drawer
            title={item.title ? `Update Announcement` : `Create Announcements`}
            onClose={onCloseDrawer}
            visible={isDrawerVisible}
            placement="right"
            width={450}
          >
            {/* <CreateDrawer permission="create-announcement" width={30}> */}
            <AddAnnouncement id={item.id} title={item.title} description={item.description} />

            {/* </CreateDrawer> */}
          </Drawer>
        </div>
        <div onClick={showDrawer}>
          <BtnEditSvg size={37} />
        </div>
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
  const [searchQuery, setSearchQuery] = useState('');
  const filteredList = list ? list.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
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
      <div>
        <Input className=" border-black w-1/2"
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className='border-t mt-2 mb-2'>
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
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 12,
            }}
            dataSource={filteredList ? filteredList : []}
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
