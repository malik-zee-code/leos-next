import Image from "next/image"

type LogoProps = {
  size?: number
  className?: string
}

export function Logo({ size = 128, className = "" }: LogoProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/logo/logo.png"
        alt="leos Logo"
        width={size}
        height={size}
        unoptimized
        className=""
      />
    </div>
  )
}
