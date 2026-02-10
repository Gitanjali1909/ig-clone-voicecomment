export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  
  const mockReels = [
    { id: '1', videoUrl: 'https://videos.pexels.com/video-files/3373028/3373028-sd_640_360_25fps.mp4', username: 'creator1', avatar: 'https://i.pravatar.cc/40?img=1', likes: 234, comments: 12 },
    { id: '2', videoUrl: 'https://videos.pexels.com/video-files/3387410/3387410-sd_640_360_25fps.mp4', username: 'creator2', avatar: 'https://i.pravatar.cc/40?img=2', likes: 567, comments: 34 },
    { id: '3', videoUrl: 'https://videos.pexels.com/video-files/3428136/3428136-sd_640_360_25fps.mp4', username: 'creator3', avatar: 'https://i.pravatar.cc/40?img=3', likes: 890, comments: 56 },
  ]

  return Response.json({ reels: mockReels, page, hasMore: true })
}
