import Image from "next/image";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex-1 min-h-screen w-full overflow-hidden bg-black">
      <Image
        src="/images/rig_bg.svg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex min-h-screen w-full justify-center px-4 py-10 lg:px-8 lg:py-0">
        <div className="grid w-full max-w-6xl items-stretch justify-center gap-10 lg:gap-40 lg:grid-cols-[536px_640px]">
          <div className="hidden items-end lg:flex">
            <div className="pointer-events-none relative h-[804px] w-full">
              <Image
                src="/images/rig_worker.svg"
                alt=""
                fill
                className="object-contain object-left-bottom"
                priority
              />
            </div>
          </div>

          <div className="flex items-center justify-center lg:py-10">
            <div className="w-full  rounded-[10px] bg-white px-8 py-10 shadow-[0_18px_55px_rgba(0,0,0,0.35)] sm:px-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
