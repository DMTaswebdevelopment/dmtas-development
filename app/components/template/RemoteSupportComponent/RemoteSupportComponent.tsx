import Image from "next/image";
import Link from "next/link";
import React from "react";

const RemoteSupportComponent = () => {
  interface remoteSupports {
    id: number;
    img: string;
    description: string;
    link: string;
  }

  const remoteSupports: remoteSupports[] = [
    {
      id: 1,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1758233714/Support_Icon_5_gnw6kz.svg",
      description: "Anydesk Windows",
      link: "https://my.anydesk.com/v2/api/v2/custom-clients/downloads/public/GXE11QO5MZG4/AnyDeskClient.exe",
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1758233714/Support_Icon_6_lilajt.svg",
      description: "Anydesk Mac",
      link: "https://my.anydesk.com/v2/api/v2/custom-clients/downloads/public/O0DZCFYVVCPG/DMTas_RemoteSupport_MAC.dmg",
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/dmz8tsndt/image/upload/v1758233714/Support_Icon_7_d6qziu.svg",
      description: "Teamviewer",
      link: "https://get.teamviewer.com/6mc544d",
    },
  ];
  return (
    <div className="w-full flex flex-wrap py-16 gap-5 lg:gap-10 justify-center items-center">
      {remoteSupports.map((support) => (
        <div
          key={support.id}
          className="flex flex-col items-center justify-center space-y-5 "
        >
          <Link
            href={support.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer h-20 lg:h-40 xl:h-52 w-auto hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={support.img}
              alt={support.description}
              width={100}
              height={100}
              className="h-full w-full object-contain"
            />
          </Link>
          <span className="text-sm lg:text-base font-montserrat_bold">
            {support.description}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RemoteSupportComponent;
