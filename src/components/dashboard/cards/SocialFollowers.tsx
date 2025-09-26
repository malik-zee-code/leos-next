const items = [
  { icon: "/dashboard/facebook.svg", label: "26,472", sub: "Likes" },
  { icon: "/dashboard/twitter.svg", label: "45,332", sub: "Followers" },
  { icon: "/dashboard/insta.svg", label: "6,472", sub: "Friends" },
  { icon: "/dashboard/link.svg", label: "26,472", sub: "Followers" },
  { icon: "/dashboard/youtube.svg", label: "5,332", sub: "Subscriber" },
  { icon: "/dashboard/tiktok.svg", label: "6,472", sub: "Followers" },
  { icon: "/dashboard/webiste.svg", label: "5,332", sub: "Visits" },
  { icon: "/dashboard/google.svg", label: "6,472", sub: "Reviews" },
]

export default function SocialFollowers() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((i, index) => (
        <div key={index} className="rounded-md border border-gray-200 bg-white p-3 text-center">
          <img src={i.icon} alt="" className="h-6 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-900">{i.label}</h3>
          <p className="text-xs text-gray-600 mb-1">{i.sub}</p>
          <p className="text-[10px] text-gray-500">Yesterday 100 | MTD 100</p>
        </div>
      ))}
    </div>
  )
}


