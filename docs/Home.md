---
date created: 2024-04-19 09:52
date updated: 2024-04-19 09:52
tags:
  - orga/home
---

![Header Autonomes Fahren](ObsidianHeaderAutonomousDriving.png)
```dataviewjs 
dv.span("**File Creations**")
const calendarData = {
    colors: {
        blue:        ["#8cb9ff", "#69a3ff", "#428bff", "#1872ff", "#0058e2"],
        green:       ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"],
        red:         ["#ff9e82", "#ff7b55", "#ff4d1a", "#e73400", "#bd2a00"],
        orange:      ["#ffa244", "#fd7f00", "#dd6f00", "#bf6000", "#9b4e00"],
        pink:        ["#ff96cb", "#ff70b8", "#ff3a9d", "#ee0077", "#c30062"],
        orangeToRed: ["#ffdf04", "#ffbe04", "#ff9a03", "#ff6d02", "#ff2c01"]
    },
    showCurrentDayBorder: true, // (optional) defaults to true
    defaultEntryIntensity: 4,   // (optional) defaults to 4
    intensityScaleStart: 10,    // (optional) defaults to lowest value passed to entries.intensity
    intensityScaleEnd: 100,     // (optional) defaults to highest value passed to entries.intensity
    entries: [],                // (required) populated in the DataviewJS loop below
}

for (let page of dv.pages()) {
	let date = new Date(page.file.ctime);
	let str = date.toISOString().split('T')[0];
    calendarData.entries.push({
        date: str,     // (required) Format YYYY-MM-DD
        intensity: 1,           // (required) the data you want to track, will map color intensities automatically
    })
}

renderHeatmapCalendar(this.container, calendarData)
```

# Überthema

> **Rechtslage autonomen Fahrens in Deutschland und der EU**: Analysieren und Beurteilen Sie die Chancen und Risiken des autonomen Fahrens in Deutschland und der EU unter politischen und gesellschaftlichen Aspekten

## [Themenfindung](Themenfindung.md)
```dataview
LIST
FROM #theme-finding
WHERE hidden != "true"
SORT file.ctime DESC
```

# Quellen
![](Quellen)

