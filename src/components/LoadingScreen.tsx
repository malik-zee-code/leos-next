"use client"

import { Logo } from "./Logo"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <div className="h-full w-full relative">
        <div className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 sm:w-1/2 md:w-[45%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%]">
          <div className="bd-preloader-content text-center flex flex-col items-center">
            <div className="relative w-[100px] h-[100px]">
              <div className="bd-preloader-circle absolute inset-0">
                <svg
              width="190"
              height="190"
              viewBox="0 0 380 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 h-full w-full [animation:spin_2s_linear_infinite] text-[var(--color-primary)]"
            >
              <circle
                cx="190"
                cy="190"
                r="180"
                stroke="#F5F5F5"
                    strokeWidth="6"
                strokeLinecap="round"
              />
                  <circle
                cx="190"
                cy="190"
                r="180"
                    stroke="currentColor"
                    strokeWidth="12"
                strokeLinecap="round"
                    className="[stroke-dasharray:320_811] [stroke-dashoffset:0]"
              />
            </svg>
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <Logo size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


