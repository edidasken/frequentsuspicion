# FrequentSuspicion

The official lyric site for **Carry It Forward: From Wreckage to Redemption**.

This is a static site intended for GitHub Pages. It contains the 16-song lyric collection, organized into the album's four-act narrative arc.

## Publish with GitHub Pages

In the repository settings, open **Pages**, select **Deploy from a branch**, then choose the `main` branch and `/ (root)` folder.

## Analytics

Google Analytics 4 uses measurement ID `G-CHECHVWGVV` on the home and about pages. Album interactions emit these custom events:

- `song_view`, `song_start`, `song_pause`, `song_progress`, and `song_complete`
- `movement_start`
- `outbound_link_click`

Song events include `song_title`, `song_number`, `song_slug`, `video_id`, `movement_number`, `movement_name`, and `selection_method`. Register the parameters you want to use in reports as event-scoped custom dimensions in GA4 Admin → Data display → Custom definitions. `song_progress` also includes `percent_complete`; `song_pause` includes `elapsed_seconds`.
