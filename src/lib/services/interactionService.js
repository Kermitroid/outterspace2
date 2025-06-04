import { supabase } from '@/lib/supabaseClient';

export const isVideoLiked = async (userId, videoId) => {
  if (!userId || !videoId) return false;
  const { error, count } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('video_id', videoId);
  
  if (error) {
    console.error("Error checking if video is liked:", error);
    return false;
  }
  return count > 0;
};

export const toggleLikeVideo = async (userId, videoId) => {
  if (!userId || !videoId) throw new Error("User or Video ID missing for like toggle");

  const liked = await isVideoLiked(userId, videoId);

  if (liked) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('video_id', videoId);
    if (error) {
      console.error("Error unliking video:", error);
      throw error;
    }
    return false; 
  } else {
    const { error } = await supabase
      .from('likes')
      .insert({ user_id: userId, video_id: videoId });
    if (error) {
      console.error("Error liking video:", error);
      throw error;
    }
    return true; 
  }
};

export const isVideoSaved = async (userId, videoId) => {
  if (!userId || !videoId) return false;
  const { error, count } = await supabase
    .from('saved_videos')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('video_id', videoId);
  
  if (error) {
    console.error("Error checking if video is saved:", error);
    return false;
  }
  return count > 0;
};

export const toggleSaveVideo = async (userId, videoId) => {
  if (!userId || !videoId) throw new Error("User or Video ID missing for save toggle");

  const saved = await isVideoSaved(userId, videoId);

  if (saved) {
    const { error } = await supabase
      .from('saved_videos')
      .delete()
      .eq('user_id', userId)
      .eq('video_id', videoId);
    if (error) {
      console.error("Error unsaving video:", error);
      throw error;
    }
    return false; 
  } else {
    const { error } = await supabase
      .from('saved_videos')
      .insert({ user_id: userId, video_id: videoId, saved_at: new Date().toISOString() });
    if (error) {
      console.error("Error saving video:", error);
      throw error;
    }
    return true; 
  }
};