import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
    isSomethingNew: boolean,
    notifications: UserNotification[]
}

const initialState: NotificationState = {
    isSomethingNew: false,
    notifications: []
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setIsSomethingNew: (state, action) => {
            state.isSomethingNew = action.payload;
        },
        setInitialNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action) => {
            const newNotification = action.payload as UserNotification;
            state.notifications.unshift(newNotification);
        }
    }
});

export const { setIsSomethingNew, setInitialNotifications, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;