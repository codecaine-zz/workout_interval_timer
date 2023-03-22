# Python Webview Workout Timer Application

This application uses the `pywebview` library to create a web-based interface for managing workouts and tracking progress. The app allows you to add exercises, specify the number of sets and reps, and set the interval and rest times between sets.

## Prerequisites

- Python 3.6 or higher
- pywebview library: Install with `pip install pywebview`

## Features

- Add workouts with specified exercise name, number of reps, sets, interval, and rest time
- Display the list of added workouts
- Clear all workouts from the list
- Start the workout timer, which progresses through the workout list
- Pause the workout timer at any time
- Display the current exercise, set, and state (workout or rest)
- Completion message displayed after all workouts are completed
- Text-to-speech announcements for workout and rest periods

## Implementation

1. Save the provided JavaScript code in a separate HTML file (e.g., `workout_timer.html`).
2. Use the `pywebview` library to create a window and load the HTML file.
3. Run the provided Python script to launch the application.

Here's the Python script to launch the application using `pywebview`:

```python
import webview

def start_app():
    webview.create_window('Workout Interval Timer', 'workout_timer.html', width=800, height=600)
    webview.start()

if __name__ == '__main__':
    start_app()
```


## To run the application
```bash
python main.py
```