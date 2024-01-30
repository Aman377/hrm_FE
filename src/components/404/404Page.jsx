
import React from "react";

const Page404 = () => {
  return (
    <center>
      <section className="py-[40px] px-[0px] bg-white font-serif">
        <div>
          <div>
            <div>
              <div className=" text-center">
                <div className=" bg-center  bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] h-[400px] bg-no-repeat">
                  <h1 className="text-center text-[80px]">404</h1>
                </div>

                <div className="mt-[-50px]">
                  <h3 className="text-[20px]">Look like you're lost !</h3>

                  <p className="text-[16px]">the page you are looking for not avaible!</p>

                  <a
                    href="/admin/dashboard"
                    className="text-white py-[10px] px-[20px] bg-[#39ac31] my-[20px] mx-0 inline-block"
                  >
                    Go to Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </center>
  );
};

export default Page404;
