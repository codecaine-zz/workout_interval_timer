# Workout Interval Timer Application

## Overview

The Workout Interval Timer is a web-based application wrapped in a desktop interface using Python and pywebview. It helps users manage their workouts by providing a customizable timer for exercises, sets, and rest periods.

## Features

- **Add Custom Workouts**: Specify exercise name, reps, sets, interval, and rest time.
- **Workout List Management**: View added workouts and clear the list as needed.
- **Interactive Timer**: Start, pause, and resume your workout session.
- **Progress Tracking**: Displays current exercise, set, and workout state (exercise or rest).
- **Completion Alerts**: Visual and auditory notifications when workouts are completed.
- **Text-to-Speech**: Voice announcements for transitions between exercises and rest periods.
- **Responsive Design**: Adapts to different screen sizes for optimal viewing.

## Prerequisites

- Python 3.6 or higher
- pywebview library

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/codecaine-zz/workout_interval_timer
   cd workout-interval-timer
   ```

2. Install the required Python library:
   ```
   pip install pywebview
   ```

## Project Structure

```
workout-interval-timer/
│
├── main.py
├── workout_timer.html
├── workout_timer.js
├── workout_timer.css
└── README.md
```

## Implementation Details

### HTML (workout_timer.html)

The HTML file provides the structure for the user interface, including input fields for workout details, buttons for control, and display areas for the timer and current workout information.

### JavaScript (workout_timer.js)

The JavaScript file contains the core functionality of the application, including:
- Workout management (adding, clearing)
- Timer logic
- State management
- Display updates
- Text-to-speech functionality

### CSS (workout_timer.css)

The CSS file styles the application, ensuring a clean, responsive, and user-friendly interface.

### Python (main.py)

The Python script uses pywebview to create a desktop application window that loads the HTML file:

```python
import webview

def start_app():
    webview.create_window('Workout Interval Timer', 'workout_timer.html', width=800, height=600)
    webview.start()

if __name__ == '__main__':
    start_app()
```

## Running the Application

To launch the Workout Interval Timer:

```bash
python main.py
```

## Usage

1. **Adding a Workout**:
   - Fill in the exercise details (name, reps, sets, interval, rest time).
   - Click "Add Workout" to add it to the list.

2. **Starting the Timer**:
   - After adding workouts, click "Start" to begin the timer.

3. **During the Workout**:
   - The timer will count down for each exercise and rest period.
   - The current exercise, set, and state will be displayed.
   - Voice announcements will guide you through transitions.

4. **Pausing and Resuming**:
   - Click "Pause" to pause the timer at any time.
   - Click "Start" again to resume.

5. **Clearing Workouts**:
   - Click "Clear Workouts" to remove all workouts from the list.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- pywebview library for enabling the desktop wrapper.
- Bootstrap for providing the CSS framework.

---

For more information or to report issues, please visit the [GitHub repository](https://github.com/codecaine-zz/workout_interval_timer).