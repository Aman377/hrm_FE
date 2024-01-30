import { PageHeader } from '@ant-design/pro-layout';
import React, { Fragment } from "react";

function PageTitle({ title, subtitle }) {
  return (
    <Fragment>
      <PageHeader
        className="border border-solid border-[#ebedf0] py-[16px] px-[24px]"
        onBack={() => window.history.back()}
        title={title}
        subTitle={subtitle}
      />
    </Fragment>
  );
}

export default PageTitle;
