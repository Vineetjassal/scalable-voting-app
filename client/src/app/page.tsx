import { Icons } from "@/components/Icon";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TopicCreator from "@/components/TopicCreator";
import { SiteFooter } from "@/components/site-footer";
import { redis } from "@/lib/redis";
import { Star } from "lucide-react";
import peerlist from "../../public/peerlist.svg";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { Github } from "@/components/Github";


export default async function Home() {
  const servedRequests = await redis.get("served-requests");

  return (
    <>
    <section className="min-h-screen bg-grid-zinc-50">
      <MaxWidthWrapper className="relative pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-30 lg:pb-36">
        <div className="hidden lg:block absolute inset-0 top-8">
          {/* circle */}
        </div>
        <div className="flex justify-center mb-6">
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
      <SiteFooter />
    </section>
    </>
  );
}
