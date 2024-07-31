// DOM elements
const elements = {
    restInput: document.getElementById('rest'),
    intervalInput: document.getElementById('interval'),
    setsInput: document.getElementById('sets'),
    exerciseNameInput: document.getElementById('exercise-name'),
    repsInput: document.getElementById('reps'),
    addWorkoutBtn: document.getElementById('add-workout'),
    workoutList: document.getElementById('workout-list'),
    timerDisplay: document.getElementById('timer-display'),
    startBtn: document.getElementById('start'),
    pauseBtn: document.getElementById('pause'),
    clearWorkoutsBtn: document.getElementById('clear-workouts'),
    currentExerciseDisplay: document.getElementById('current-exercise'),
    currentSetDisplay: document.getElementById('current-set'),
    completionMessage: document.getElementById('completion-message'),
    noWorkoutsWarning: document.getElementById('no-workouts-warning'),
    workoutStateDisplay: document.getElementById('workout-state'),
};

// Constants
const WORKOUT_STATES = {
    WORKOUT: 'Workout',
    REST: 'Rest',
    COMPLETED: 'All workouts completed.',
};

// App state
let state = {
    workouts: [],
    currentWorkoutIndex: 0,
    currentSet: 1,
    isRestPeriod: false,
    timer: null,
    currentTime: 0,
    isPaused: false
};

// Event listeners
elements.addWorkoutBtn.addEventListener('click', addWorkout);
elements.clearWorkoutsBtn.addEventListener('click', clearWorkouts);
elements.startBtn.addEventListener('click', startTimer);
elements.pauseBtn.addEventListener('click', pauseTimer);

function addWorkout() {
    const workout = {
        exerciseName: elements.exerciseNameInput.value.trim(),
        reps: parseInt(elements.repsInput.value),
        sets: parseInt(elements.setsInput.value),
        interval: parseInt(elements.intervalInput.value),
        rest: parseInt(elements.restInput.value),
    };

    if (isValidWorkout(workout)) {
        state.workouts.push(workout);
        displayWorkout(workout);
        elements.exerciseNameInput.value = '';
    }
}

function isValidWorkout(workout) {
    return workout.exerciseName && workout.reps && workout.sets && workout.interval && workout.rest;
}

function displayWorkout(workout) {
    const li = document.createElement('li');
    li.textContent = `${workout.exerciseName} (${workout.reps} reps) x ${workout.sets} sets - ${workout.interval}s interval - ${workout.rest}s rest`;
    li.dataset.completed = 'false';
    elements.workoutList.appendChild(li);
}

function resetDisplay() {
    clearInterval(state.timer);
    elements.timerDisplay.textContent = '00:00';
    elements.completionMessage.classList.add('d-none');
    elements.currentSetDisplay.textContent = '';
    elements.currentExerciseDisplay.textContent = '';
    elements.workoutStateDisplay.textContent = '';
    elements.startBtn.disabled = false;
    elements.pauseBtn.disabled = true;
}

function clearWorkouts() {
    elements.workoutList.innerHTML = '';
    state.workouts = [];
    state.currentWorkoutIndex = 0;
    state.currentSet = 1;
    resetDisplay();
}

function startTimer() {
    if (state.workouts.length > 0) {
        if (state.isPaused) {
            resumeTimer();
        } else {
            initializeNewWorkout();
        }
        elements.startBtn.disabled = true;
        elements.pauseBtn.disabled = false;
        elements.completionMessage.classList.add('d-none');
        elements.noWorkoutsWarning.classList.add('d-none');
        state.timer = setInterval(timerTick, 1000);
    } else {
        elements.noWorkoutsWarning.classList.remove('d-none');
    }
}

function initializeNewWorkout() {
    state.currentWorkoutIndex = 0;
    state.currentSet = 1;
    state.isRestPeriod = false;
    const currentWorkout = state.workouts[state.currentWorkoutIndex];
    state.currentTime = currentWorkout.interval;
    updateWorkoutState(WORKOUT_STATES.WORKOUT);
}

function resumeTimer() {
    updateWorkoutState(state.isRestPeriod ? WORKOUT_STATES.REST : WORKOUT_STATES.WORKOUT);
}

function pauseTimer() {
    elements.startBtn.disabled = false;
    elements.pauseBtn.disabled = true;
    clearInterval(state.timer);
    state.isPaused = true;
}

function updateWorkoutState(newState) {
    elements.workoutStateDisplay.textContent = newState;
    speak(newState);
}

function timerTick() {
    state.currentTime--;
    if (state.currentTime < 0) {
        nextStep();
    } else {
        updateDisplay();
    }
}

function nextStep() {
    state.isRestPeriod = !state.isRestPeriod;
    const currentWorkout = state.workouts[state.currentWorkoutIndex];

    if (state.isRestPeriod) {
        handleRestPeriod(currentWorkout);
    } else {
        handleWorkoutPeriod(currentWorkout);
    }

    updateDisplay();
}

function handleRestPeriod(currentWorkout) {
    updateWorkoutState(WORKOUT_STATES.REST);

    if (state.currentSet < currentWorkout.sets) {
        state.currentSet++;
    } else {
        moveToNextWorkout();
    }
    state.currentTime = currentWorkout.rest;
}

function handleWorkoutPeriod(currentWorkout) {
    updateWorkoutState(WORKOUT_STATES.WORKOUT);
    state.currentTime = currentWorkout.interval;
}

function moveToNextWorkout() {
    state.currentSet = 1;
    const currentExercise = elements.workoutList.children[state.currentWorkoutIndex];
    currentExercise.classList.add('completed');
    currentExercise.dataset.completed = 'true';

    state.currentWorkoutIndex++;

    if (state.currentWorkoutIndex >= state.workouts.length) {
        completeWorkout();
    }
}

function completeWorkout() {
    resetDisplay();
    elements.completionMessage.classList.remove('d-none');
    speak(WORKOUT_STATES.COMPLETED);
}

function updateDisplay() {
    const currentWorkout = state.workouts[state.currentWorkoutIndex];
    elements.timerDisplay.textContent = formatTime(state.currentTime);
    elements.currentSetDisplay.textContent = `Current Set: ${state.currentSet}`;
    elements.currentExerciseDisplay.textContent = `Current Exercise: ${currentWorkout.exerciseName}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}