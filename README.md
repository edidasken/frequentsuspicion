# FrequentSuspicion

The official interactive lyric site for the complete four-album FrequentSuspicion journey.

This static GitHub Pages site contains 46 songs across **The War Came Home**, **The Reckoning**, **The Restoration**, and **Carry It Forward**. Published videos and lyrics appear inside the album console; unfinished chapters use intentional placeholders until their official material is ready.

## Publish with GitHub Pages

In the repository settings, open **Pages**, select **Deploy from a branch**, then choose the `main` branch and `/ (root)` folder.

## Analytics

Google Analytics 4 uses measurement ID `G-CHECHVWGVV` on the home and about pages. Album interactions emit these custom events:

- `song_view`, `song_start`, `song_pause`, `song_progress`, and `song_complete`
- `listening_<song_slug>` when playback begins, making the exact song visible by event name in Realtime
- `movement_start`
- `outbound_link_click`

Song events include `album_title`, `album_slug`, `song_title`, `song_number`, `song_slug`, `video_id`, `movement_number`, `movement_name`, and `selection_method`. Album choices also emit `album_select`. Register the parameters you want to use in reports as event-scoped custom dimensions in GA4 Admin → Data display → Custom definitions. `song_progress` also includes `percent_complete`; `song_pause` includes `elapsed_seconds`.
