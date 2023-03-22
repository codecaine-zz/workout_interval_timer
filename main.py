import webview


def start_app():
    webview.create_window('Workout Interval Timer', 'workout_timer.html', width=800, height=600)
    webview.start()


if __name__ == '__main__':
    start_app()

