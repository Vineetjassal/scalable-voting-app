import { Icons } from "@/components/Icon";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TopicCreator from "@/components/TopicCreator";
import { SiteFooter } from "@/components/site-footer";
import { redis } from "@/lib/redis";
import { Star } from "lucide-react";
import peerlist from "../../public/peerlist.svg";
import badgeweek from "../../public/badge-week.svg";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { Github } from "@/components/Github";
import Announcement from "@/components/Announcement";
import Banner from "@/components/Banner";
import Companies from "@/components/Companies";
import TechnologyDisplay from "@/components/TechnologyDisplay";
import homepage from "../../public/homepage.png";
import logo from "../../public/svalogo.png";


export default async function Home() {
  const servedRequests = await redis.get("served-requests");

  return (
    <>
    {/* <Announcement /> */}
    <section className="min-h-screen bg-grid-zinc-50">
      <MaxWidthWrapper className="relative pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-30 lg:pb-36">
        <div className="hidden lg:block absolute inset-0 top-8">
          {/* circle */}
        </div>
        {/* <div className="flex justify-center mt-[-30px] md:mt-0">
          <Image src={badgeweek} alt={""} width={150} height={150}/>
        </div> */}
        <div className="hidden md:flex justify-center md:mb-6">
        <Image src={peerlist} alt={""} />
        </div>
        <Github />
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center flex flex-col items-center">
            <h1 className="relative leading-snug w-fit tracking-tight text-balance mt-16 font-bold text-gray-900 text-[45px] md:text-7xl">
              What do you{" "}
              <span className="">
                th
                <span className="relative ">
                  i
                  <span className="absolute inset-x-0 -top-[18px] md:-top-[20px] -translate-x-3">
                    <Icons.brain className="h-7 w-7 md:h-8 md:w-8" />
                  </span>
                </span>
                nk{" "}
              </span>
              about...
            </h1>
            <TopicCreator />

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center sm:items-start gap-5">
              <div className="flex flex-col gap-1 justify-between items-center sm:items-start">
                <div className="flex gap-0.5 md:ml-6">
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                </div>
                <p>
                  <span className="font-semibold">
                    {Math.ceil(Number(servedRequests))}{" "}
                  </span>{" "}
                  served requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <TechnologyDisplay />
      <div className="hidden md:block">
      <div className="flex justify-center mb-[120px]">
      <Image src={homepage} alt={""} className="rounded-2xl shadow-black shadow-2xl" width={1100} height={1100}/>
      </div>
      </div>
      <Companies />
      <Banner />
      <section className="py-6 px-3 md:px-80 md:py-0">
      <div className="mt-[60px] md:mt-[150px] border-2 p-10 border-black rounded-2xl ">
        <div className="flex justify-center">
        <Image src={logo} alt={""} width={60}/>
        </div>
        <div className="text-center">
          <h1 className="text-5xl mt-6 font-bold">Scalable Voting App</h1>
          <p className="text-lg mt-3">An Open Source Real-time Voting App: Share Opinions in a Single Word.</p>
        </div>
        <div className="text-lg mt-6 flex justify-center">
        <a href="https://www.linkedin.com/in/vineetjassal" target="_blank" className="mr-5 flex hover:underline">LinkedIn <GoArrowUpRight className="mt-1"/></a>
        <a href="https://www.twitter.com/vineetjassal" target="_blank" className="mr-5 hidden md:flex hover:underline">Twitter <GoArrowUpRight className="mt-1"/></a>
        <a href="https://www.github.com/vineetjassal" target="_blank" className="mr-5 flex hover:underline">Github <GoArrowUpRight className="mt-1"/></a>
        <a href="https://peerlist.io/vineetjassal" target="_blank" className="flex hover:underline">Peerlist <GoArrowUpRight className="mt-1"/></a>
      </div>
      </div>
      

      </section>
      
      <SiteFooter />
    </section>
    </>
  );
}
