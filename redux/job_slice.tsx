import { createSlice } from '@reduxjs/toolkit'

interface Jobs {
    id: number,
    title: string,
    description: string,
    company: string,
    salary: number,
    postedAt: string,
    [key: string]: any; // For any additional property in the incoming object
}

interface JobState {
    jobs: Jobs[];
    selectedJob: Jobs
}

const initialState: JobState = {
    jobs: [],
    selectedJob: {
        id: 0,
        title: '',
        description: '',
        company: '',
        salary: 0,
        postedAt: ''
    }
}

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload
        },

        appendJobs: (state, action) => {
            const temp = Math.max(...state.jobs.map(j => j.id))
            action.payload.id = temp + 1

            console.log(action.payload)
            state.jobs.push(action.payload)
        },

        updateJob: (state, action) => {
            const { id, updatedJob } = action.payload;
            const index = state.jobs.findIndex(job => job.id === id);

            // If the job with the specified id is found, update it
            if (index !== -1) {
                state.jobs[index] = { ...state.jobs[index], ...updatedJob };
              }
        },

        resetState: () => initialState
    }
})

export const {
    setJobs,
    appendJobs,
    updateJob,
    resetState
} = jobSlice.actions;

const jobReducer = jobSlice.reducer;
export default jobReducer;