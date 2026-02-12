# Specification

## Summary
**Goal:** Let users preview a per-scenario custom YouTube link from the current (unsaved) input before saving it.

**Planned changes:**
- Add a clearly labeled “Preview” control next to the existing “Save” control in each scenario’s expanded “Custom YouTube Video” configuration area.
- On “Preview”, open the existing ScenarioVideoModal using the current input value (even if unsaved) and resolve/play the video using the same validation and embed-resolution logic as standard scenario playback.
- If the input is empty or invalid, prevent opening the modal and show an English validation message using the existing validation error UI pattern.
- Ensure previewing does not persist changes (no localStorage writes) and does not affect what the scenario’s main Play button uses until “Save” is clicked.
- Maintain existing modal focus behavior so closing the preview returns keyboard focus to the element that opened it.

**User-visible outcome:** In the Test Scenarios panel, users can click “Preview” to watch the currently entered custom YouTube video for a scenario before saving, with validation feedback shown when the input is missing or invalid.
