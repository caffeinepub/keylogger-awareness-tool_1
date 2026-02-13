# Specification

## Summary
**Goal:** Add a practical, real-world “Run Scenario” workflow by introducing a new keylogger-awareness test scenario with integrated playback, learning content, and quiz support.

**Planned changes:**
- Add a new “public/shared computer login” style scenario entry to the existing Test Scenarios panel, including name, short description, and expected outcome.
- Wire the new scenario’s “Run Scenario” button to the existing runScenario flow so the preset scenario text is automatically played into the simulation input.
- Add learning content for the new scenario via the existing scenario content mapping so it renders in the collapsible learning-content section.
- Add a quiz entry for the new scenario so “Take Test” opens the quiz modal without errors.
- Create educational, defensive, privacy-safe preset text for the new scenario (no real credentials) that still produces a non-trivial simulation result consistent with the scenario’s expected outcome label.

**User-visible outcome:** A new practical scenario appears in Test Scenarios; users can click “Run Scenario” to auto-play a realistic, privacy-safe shared-computer login scenario into the simulator, review related learning content, and take the associated quiz.
