import { supabase } from '@/lib/supabaseClient';
import { getVideos as getAllVideos } from './videoService'; // Renamed to avoid conflict

export const getLikedVideos = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('likes')
    .select('video_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching liked video IDs:', error);
    return [];
  }
  const likedVideoIds = data.map(like => like.video_id);
  if (likedVideoIds.length === 0) return [];

  return getAllVideos({ videoIds: likedVideoIds });
};

export const getHistoryVideos = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('video_history')
    .select('videos!inner(*, category:categories(id, name), profile:profiles(id, username, name, avatar_url))')
    .eq('user_id', userId)
    .order('watched_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching history videos:', error);
    return [];
  }
  return data.map(item => ({
    ...(item.videos),
     channel: item.videos.profile ? { 
      id: item.videos.profile.id,
      name: item.videos.profile.name || item.videos.profile.username,
      avatar: item.videos.profile.avatar_url,
      subscribers: item.videos.profile.subscribers_count || 0,
    } : { name: 'Unknown Channel', avatar: '' },
    category: item.videos.category?.name,
    views: item.videos.views_count,
    likes: item.videos.likes_count,
    uploadedAt: item.videos.published_at ? new Date(item.videos.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
    duration: item.videos.duration_seconds ? `${Math.floor(item.videos.duration_seconds / 60)}:${String(item.videos.duration_seconds % 60).padStart(2, '0')}` : 'N/A',
  }));
};

export const addVideoToHistory = async (userId, videoId) => {
  if (!userId || !videoId) return;
  const { error } = await supabase
    .from('video_history')
    .upsert({ user_id: userId, video_id: videoId, watched_at: new Date().toISOString() }, { onConflict: 'user_id, video_id' });

  if (error) {
    console.error('Error adding video to history:', error);
  }
};

export const getSavedVideos = async (userId) => {
   if (!userId) return [];
  const { data, error } = await supabase
    .from('saved_videos')
    .select('videos!inner(*, category:categories(id, name), profile:profiles(id, username, name, avatar_url))')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching saved videos:', error);
    return [];
  }
  return data.map(item => ({
    ...(item.videos),
     channel: item.videos.profile ? { 
      id: item.videos.profile.id,
      name: item.videos.profile.name || item.videos.profile.username,
      avatar: item.videos.profile.avatar_url,
      subscribers: item.videos.profile.subscribers_count || 0,
    } : { name: 'Unknown Channel', avatar: '' },
    category: item.videos.category?.name,
    views: item.videos.views_count,
    likes: item.videos.likes_count,
    uploadedAt: item.videos.published_at ? new Date(item.videos.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
    duration: item.videos.duration_seconds ? `${Math.floor(item.videos.duration_seconds / 60)}:${String(item.videos.duration_seconds % 60).padStart(2, '0')}` : 'N/A',
  }));
};