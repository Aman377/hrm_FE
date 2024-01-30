import React from "react";
import { Link } from "react-router-dom";

export default function QuickLinks({ sideNavOpenKeysHandler }) {
  const QuickLinksContainer = ({ link, icon, bg, linkName }) => {
    return (
      <Link to={link}>
        <div className="text-center">
          <div
            style={{ backgroundColor: bg }}
            className="w-[6rem] p-[16px] flex flex-col items-center gap-[10px] rounded-[3px] bg-var(--quick-links-bg) text-var(--text)"
          >
            {icon}
          </div>
          <span className="text-[0.8rem] mt-[0.8rem] inline-block text-var(--text)">{linkName}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="pt-[16px] pb-0 md:pb-[32px]">
      <p className="text-[16px] text-var(--text)">Quick Links</p>

      <div className="flex flex-wrap items-center justify-center gap-[15px] md:gap-[20px]">
        <QuickLinksContainer
          link="/admin/product"
          bg="#009EFF40"
          linkName="PRODUCT"
          icon={
            <i
              style={{ color: "#009EFF" }}
              className="bi bi-box-fill text-[1.5rem] font-bold"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/supplier"
          bg="#25316D40"
          linkName="PURCHASE"
          icon={
            <i
              style={{ color: "#25316D" }}
              className="bi bi-bag-fill text-[1.5rem] font-bold"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/customer"
          bg="#FD841F40"
          linkName="SALE"
          icon={
            <i
              style={{ color: "#FD841F" }}
              className="bi bi-receipt text-[1.5rem] font-bold"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/account"
          bg="#3E6D9C40"
          linkName="ACCOUNTS"
          icon={
            <i
              style={{ color: "#3E6D9C" }}
              className="bi bi-wallet-fill text-[1.5rem] font-bold"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/account/trial-balance"
          bg="#8CB8ED40"
          linkName="REPORT"
          icon={
            <i
              style={{ color: "#8CB8ED" }}
              className="bi bi-flag-fill text-[1.5rem] font-bold"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/hr/staffs"
          bg="#E14D2A40"
          linkName="HR"
          icon={
            <i
              style={{ color: "#E14D2A" }}
              className="bi bi-person-circle text-[1.5rem] font-bold"
            ></i>
          }
        />

        <QuickLinksContainer
          link="/admin/invoice-setting"
          bg="#3F3B6C40"
          linkName="SETTINGS"
          icon={
            <i
              style={{ color: "#3F3B6C" }}
              className="bi bi-gear-fill text-[1.5rem] font-bold"
            ></i>
          }
        />
      </div>
    </div>
  );
}
