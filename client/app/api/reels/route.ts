export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')

  const baseReels = [
    {
      videoUrl:
        'https://videos.pexels.com/video-files/3373028/3373028-sd_640_360_25fps.mp4',
    },
    {
      videoUrl:
        'https://videos.pexels.com/video-files/3387410/3387410-sd_640_360_25fps.mp4',
    },
    {
      videoUrl:
        'https://videos.pexels.com/video-files/3428136/3428136-sd_640_360_25fps.mp4',
    },
  ]

  const reels = baseReels.map((reel, index) => {
    const id = `${page}-${index}`

    return {
      id,
      videoUrl: reel.videoUrl,
      username: `creator${page}${index}`,
      avatar: `https://i.pravatar.cc/40?u=${id}`,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
    }
  })

  return Response.json({
    reels,
    page,
    hasMore: page < 10, // simulate 10 pages max
  })
}
