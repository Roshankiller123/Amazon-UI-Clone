import React from "react";
import Product from "./Product";

function Home() {
  return (
    <div className="flex justify-center max-w-[1450px] mx-auto px-2 sm:px-5 ">
      <div>
        <img
          src="https://sm.ign.com/ign_in/screenshot/default/prime-cover_fu3a.png"
          alt=""
          className="w-full z-0 mb-[-150px] h-[480px] sm:h-[400px] md:h-[480px] object-cover"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />

        {/* Row 1 */}
        <div className="flex flex-col sm:flex-row z-10 mb-6 gap-4 sm:gap-6 mr-4 ">
          <Product
            id={1}
            title="2025 AMD Laptop, 15.6inch Laptop Computer with AMD Ryzen 7 5700U(8C/16T, Up to 4.3GHz), 16GB RAM 512GB NVMe SSD Windows 11 Laptop, Radeon RX Vega 8 Graphics,WiFi 6"
            price={300.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/81jFW4cV7bL._AC_SX466_.jpg"
          />
          <Product
            id={2}
            title=" HP Pavilion 15.6 inch HD Touchscreen Anti-Glare Laptop, 16GB RAM, 1TB SSD Storage, Intel Core Processor up to 4.1GHz, Up to 11 Hours Long Battery Life, Type-C, HDMI, Windows 11 Home, Silver"
            price={289.0}
            rating={4}
            image="https://m.media-amazon.com/images/I/71aTEZOda0L.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col sm:flex-row z-10 mb-6 gap-4 sm:gap-6 mr-4">
          <Product
            id={3}
            title="PHILIPS 24 inch Frameless Full HD (1920 x 1080) 100Hz Monitor, VESA, HDMI x1, VGA Port x1, Eye Care, 4 Year Advance Replacement Warranty, 241V8LB"
            price={78.0}
            rating={3}
            image="https://m.media-amazon.com/images/I/71oilmGrVuL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          />
          <Product
            id={4}
            title="Gaming Chair, 400 lbs Adult Chair, High Back Computer Chair with Footrest and Linked Armrests, Office Video Game Chair with Lumbar Support (Black)"
            price={179.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71ask4HinsL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          />
          <Product
            id={5}
            title="Razer Basilisk V3 Customizable Ergonomic Gaming Mouse: Fastest Gaming Mouse Switch - Chroma RGB Lighting - 26K DPI Optical Sensor Classic Black"
            price={40.0}
            rating={5}
            image="https://m.media-amazon.com/images/I/61AcT0ZuO3L.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          />
        </div>

        {/* Row 3 */}
        <div className="flex flex-col sm:flex-row z-10 gap-4 sm:gap-6 mr-4">
          <Product
            id={6}
            title="Mouse Pad Gaming Mousepad 31.5 x 11.8in Large Mouse Pad for Keyboard and Mouse with Anti-Slip Rubber Base, Keyboard Pad XL Mouse Mat for Home and Office（Black with White Topographic Line）"
            price={11.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71S-YxDsh6L.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          />
          <Product
            id={7}
            title="MSI Codex Z2 Gaming Desktop: AMD R7-8700F, GeForce RTX 5070, 32GB DDR5, 2TB m.2 NVMe SSD, USB Type-C, VR-Ready, Windows 11 Home : A8NVP-436US"
            price={1700.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71Z1Bk+8Z4L._AC_SX466_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
