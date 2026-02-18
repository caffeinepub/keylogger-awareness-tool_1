# Production Smoke Check - Version 25

## Overview
This document provides a comprehensive manual testing checklist for verifying the Keylogger Awareness Tool after deployment to production. All tests should be performed in the live production environment.

## Pre-Check Requirements
- [ ] Production URL is accessible
- [ ] Browser console is open (check for errors)
- [ ] Test in both desktop and mobile viewports

## 1. Page Load & Rendering

### Dashboard (/)
- [ ] Page loads without errors
- [ ] Header displays with logo and navigation
- [ ] Footer displays with attribution link to caffeine.ai
- [ ] Background decoration is visible but doesn't block interactions
- [ ] All sections render: Hero, Counters, Timeline, Simulation modules, Test Scenarios

### Awareness Page (/awareness)
- [ ] Navigate to `/awareness` using header navigation
- [ ] Page loads with educational content
- [ ] Quiz component is visible and interactive
- [ ] Can navigate back to Dashboard

## 2. Help & Onboarding Flow

### Onboarding Overlay
- [ ] First-time visit shows onboarding overlay (or after clearing localStorage)
- [ ] Overlay container present: `[data-testid="onboarding-overlay"]`
- [ ] Close button works: `[data-testid="onboarding-close"]`
- [ ] Previous button works: `[data-testid="onboarding-previous"]`
- [ ] Next button works: `[data-testid="onboarding-next"]`
- [ ] Finish button works: `[data-testid="onboarding-finish"]`
- [ ] All 6 steps display correctly
- [ ] Overlay doesn't reappear after dismissal

### Help Tooltips
- [ ] Info icons (?) display throughout the interface
- [ ] Hovering/focusing shows tooltip with helpful text
- [ ] Tooltips are readable and properly positioned

## 3. Reset Functionality
- [ ] Locate and click "Reset All" or similar reset button
- [ ] Confirm dialog appears
- [ ] Accepting reset clears all simulation state
- [ ] Counters return to zero
- [ ] Demo input clears
- [ ] Onboarding can be triggered again

## 4. Test Scenarios

### Scenarios Panel
- [ ] Test scenarios panel visible: `[data-testid="test-scenarios-panel"]`
- [ ] Multiple scenario cards render: `[data-testid^="scenario-card-"]`
- [ ] Each card shows scenario name, description, and "Take Test" button

### Scenario Interaction
- [ ] Click "Take Test" button: `[data-testid^="take-test-"]`
- [ ] Scenario quiz modal opens: `[data-testid="scenario-quiz-modal"]`
- [ ] Quiz displays questions one at a time
- [ ] Answer selection works
- [ ] Immediate feedback shows after answering
- [ ] Score calculation displays at end
- [ ] Modal close button works: `[data-testid="scenario-quiz-close"]`

### Video Demonstrations (if configured)
- [ ] If custom YouTube links are set, video modal opens
- [ ] Video plays automatically
- [ ] Modal can be closed with Escape key or close button
- [ ] Error handling works for invalid/missing videos

## 5. Awareness Page Deep Dive

### Page Structure
- [ ] Awareness page root present: `[data-testid="awareness-page"]`
- [ ] Educational content sections render
- [ ] Infographic images load correctly
- [ ] Text is readable and properly formatted

### Quiz Component
- [ ] Quiz starts when "Take Quiz" is clicked
- [ ] 5 questions display sequentially
- [ ] Radio buttons for answers work
- [ ] Submit button enables after selection
- [ ] Correct/incorrect feedback shows immediately
- [ ] Explanations display after each answer
- [ ] Final score and recap display at end
- [ ] "Retry Quiz" button works
- [ ] Closing message with educational tone appears

## 6. Navigation & Routing

### Header Navigation
- [ ] Dashboard button navigates to `/`
- [ ] Awareness button navigates to `/awareness`
- [ ] Active route is visually indicated
- [ ] Mobile menu toggle works (on mobile viewport)
- [ ] Mobile menu items navigate correctly

### Browser Navigation
- [ ] Browser back button works
- [ ] Browser forward button works
- [ ] Direct URL entry works for both routes
- [ ] No 404 or blank screens

## 7. Footer Attribution

### Footer Content
- [ ] Footer displays at bottom of page
- [ ] Current year displays dynamically (2026)
- [ ] "Built with ♥ using caffeine.ai" text present
- [ ] caffeine.ai link includes UTM parameters
- [ ] UTM format: `?utm_source=Caffeine-footer&utm_medium=referral&utm_content=<hostname>`
- [ ] Link opens in new tab
- [ ] Link has `rel="noopener noreferrer"`

## 8. Simulation Features (Dashboard)

### Keylogger Module
- [ ] Textarea accepts input
- [ ] Keystroke counter increments
- [ ] Simulation warning is visible
- [ ] Help tooltip explains simulation nature

### Attacker Dashboard
- [ ] Toggle switch shows/hides attacker view
- [ ] Captured keystrokes display in attacker panel
- [ ] Transmission animation plays (visual only)
- [ ] Help tooltip explains demo-only nature

### AI Risk Detector
- [ ] Risk percentage displays
- [ ] Progress bar updates based on input
- [ ] Color coding reflects risk level
- [ ] Help tooltip explains risk calculation

### Antivirus Scanner
- [ ] Scan button triggers scan animation
- [ ] Quarantine button works when threat detected
- [ ] Remove button works after quarantine
- [ ] Help tooltip explains illustrative actions

### Auto-Blocking Alert
- [ ] Alert appears when high-risk behavior detected
- [ ] Help tooltip explains simulation safety feature
- [ ] Alert can be dismissed

### Attack Timeline
- [ ] 5 stages display in sequence
- [ ] Active stage is visually highlighted
- [ ] Stages progress based on simulation state
- [ ] Hover effects work on stages

## 9. Accessibility

### Keyboard Navigation
- [ ] Tab key navigates through interactive elements
- [ ] Focus indicators are visible
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals/overlays

### Screen Reader
- [ ] ARIA labels present on interactive elements
- [ ] Semantic HTML structure (header, main, footer, nav)
- [ ] Alt text on images (or empty alt for decorative)

## 10. Performance & Errors

### Console Check
- [ ] No JavaScript errors in console
- [ ] No 404 errors for assets
- [ ] No CORS errors
- [ ] No React warnings

### Loading States
- [ ] Buttons show loading indicators during operations
- [ ] No infinite loading states
- [ ] Error messages display when operations fail

### Visual Check
- [ ] No layout shifts during load
- [ ] Images load correctly
- [ ] Fonts render properly
- [ ] Colors and contrast are appropriate

## 11. Cross-Browser Testing (if time permits)
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers (Chrome, Safari)

## Sign-Off

**Tester Name:** _________________  
**Date:** _________________  
**Version:** 25  
**Environment:** Production  
**Result:** ☐ Pass ☐ Fail (with notes)

**Notes:**
_______________________________________
_______________________________________
_______________________________________
